import {Newsletter} from '../newsletters/Newsletters.types'
import {EventType} from '../events/Events.types'
import {PanelMemberType} from '../about/About.types'

function clean(array) {
   return array.map((obj) => {
      for (let propName in obj) {
         if (obj[propName] === null || obj[propName] === undefined) {
            obj[propName] = ''
         }
      }
      return obj
   })
}
export const searchFilter = (
   currentSearchString: string,
   type: 'NEWSLETTERS' | 'EVENTS' | 'PANELMEMBERS',
   selectedFilter: string,
   data: Array<Newsletter> | Array<EventType> | Array<PanelMemberType>
): {} | Array<Newsletter> | Array<EventType> => {
   clean(data)
   let result = [] as Array<Newsletter | EventType | PanelMemberType>

   const searchAllNewsletters = (data: Array<Newsletter>) => {
      let allNotUnique = [] as Array<Newsletter>
      allNotUnique = allNotUnique
         .concat(searchNewsletterNumber(data))
         .concat(searchNewsletterYear(data))
         .concat(searchNewsletterAuthor(data))
         .concat(searchNewsletterTitle(data))
      const result = [] as Array<Newsletter>
      const map = new Map()
      for (const item of allNotUnique) {
         if (!map.has(item.id)) {
            map.set(item.id, true) // set any value to Map
            result.push(item)
         }
      }
      return result
   }
   const searchEventsAll = (data: Array<EventType>) => {
      let allNotUnique = [] as Array<EventType>
      allNotUnique = allNotUnique
         .concat(searchEventLocation(data))
         .concat(searchEventEventType(data))
         .concat(searchEventInstitution(data))
         .concat(searchEventTitle(data))
      const result = [] as Array<EventType>
      const map = new Map()
      for (const item of allNotUnique) {
         if (!map.has(item.id)) {
            map.set(item.id, true) // set any value to Map
            result.push(item)
         }
      }
      return result
   }

   const searchPanelMemberAll = (data: Array<PanelMemberType>) => {
      let allNotUnique = [] as Array<PanelMemberType>
      allNotUnique = allNotUnique
         .concat(searchPanelMemberName(data))
         .concat(searchPanelMemberCountry(data))
         .concat(searchPanelMemberInstitution(data))
      const result = [] as Array<PanelMemberType>
      const map = new Map()
      for (const item of allNotUnique) {
         if (!map.has(item.id)) {
            map.set(item.id, true) // set any value to Map
            result.push(item)
         }
      }
      return result
   }

   // newsletter search --------------------------------------
   const searchNewsletterNumber = (data: Array<Newsletter>) =>
      data.filter((item: Newsletter) => item.number.toString().includes(currentSearchString))

   const searchNewsletterYear = (data: Array<Newsletter>) =>
      data.filter((item) =>
         new Date(item.date).getFullYear().toString().includes(currentSearchString)
      )
   const searchNewsletterAuthor = (data: Array<Newsletter>) =>
      data.filter(
         (item) =>
            item.issueEditor?.toLowerCase().includes(currentSearchString.toLowerCase()) ||
            item.chiefEditor?.toLowerCase().includes(currentSearchString.toLowerCase())
      )
   const searchNewsletterTitle = (data: Array<Newsletter>) =>
      data.filter((item) => item.title.toLowerCase().includes(currentSearchString.toLowerCase()))

   const searchEventTitle = (data: Array<EventType>) =>
      data.filter((item) => item.title.toLowerCase().includes(currentSearchString.toLowerCase()))

   // events search --------------------------------------
   const searchEventLocation = (data: Array<EventType>) =>
      data.filter((item) => item.location.toLowerCase().includes(currentSearchString.toLowerCase()))
   const searchEventEventType = (data: Array<EventType>) =>
      data.filter((item) =>
         item.eventType.toLowerCase().includes(currentSearchString.toLowerCase())
      )
   const searchEventInstitution = (data: Array<EventType>) =>
      data.filter((item) => item.title.toLowerCase().includes(currentSearchString.toLowerCase()))

   // panel members search --------------------------------------
   const searchPanelMemberName = (data: Array<PanelMemberType>) =>
      data.filter((item) =>
         item.firstName.toLowerCase().includes(currentSearchString.toLowerCase())
      )
   const searchPanelMemberCountry = (data: Array<PanelMemberType>) =>
      data.filter((item) =>
         item.Institution.country.toLowerCase().includes(currentSearchString.toLowerCase())
      )
   const searchPanelMemberInstitution = (data: Array<PanelMemberType>) =>
      data.filter((item) =>
         item.Institution.name.toLowerCase().includes(currentSearchString.toLowerCase())
      )

   if (type == 'NEWSLETTERS') {
      switch (selectedFilter) {
         case 'ALL':
            result = searchAllNewsletters(data as Array<Newsletter>)
            break
         case 'NUMBER':
            result = searchNewsletterNumber(data as Array<Newsletter>)
            break
         case 'AUTHOR':
            result = searchNewsletterAuthor(data as Array<Newsletter>)
            break
         case 'TITLE':
            result = searchNewsletterTitle(data as Array<Newsletter>)
            break
         case 'YEAR':
            result = searchNewsletterYear(data as Array<Newsletter>)
            break
      }
      return result
   } else if (type == 'EVENTS') {
      result = searchEventsAll(data as Array<EventType>)
      return result

      // switch (selectedFilter) {
      //    case 'ALL':
      //       result = searchEventsAll(data as Array<EventType>)
      //       break
      //    case 'LOCATION':
      //       result = searchEventLocation(data as Array<EventType>)
      //       break
      //    case 'EVENTTYPE':
      //       result = searchEventEventType(data as Array<EventType>)
      //       break
      //    case 'TITLE':
      //       result = searchEventTitle(data as Array<EventType>)
      //       break
      //    case 'INSTITUTION':
      //       result = searchEventInstitution(data as Array<EventType>)
      //       break
      // }
   } else if (type == 'PANELMEMBERS') {
      switch (selectedFilter) {
         case 'ALL':
            result = searchPanelMemberAll(data as Array<PanelMemberType>)
            break
         case 'NAME':
            result = searchPanelMemberName(data as Array<PanelMemberType>)
            break
         case 'COUNTRY':
            result = searchPanelMemberCountry(data as Array<PanelMemberType>)
            break
         case 'INSTITUTION':
            result = searchPanelMemberInstitution(data as Array<PanelMemberType>)
            break
      }
      return result
   }
}
