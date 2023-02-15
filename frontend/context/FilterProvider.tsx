import React, {useEffect} from 'react'
import {useRouter} from 'next/router'

const FilterContext = React.createContext<InitFilterState>({
   events: {eventFilter: {time: 'UPCOMING', searchFilter: 'ALL'}, dispatchEvent: null},
   newsletters: {newsletterFilter: {searchFilter: 'ALL'}, dispatchNewsletter: null},
   panelMembers: {panelMemberFilter: {searchFilter: 'ALL'}, dispatchPanelMember: null}
})

interface InitFilterState {
   events: {eventFilter: {time: string; searchFilter: string}; dispatchEvent: any}
   panelMembers: {panelMemberFilter: any; dispatchPanelMember: any}
   newsletters: {newsletterFilter: any; dispatchNewsletter: any}
}
function eventFilterReducer(state, action) {
   switch (action.type) {
      case 'TIME_FILTER': {
         return {...state, time: action.payload}
      }
      case 'SEARCH_FILTER': {
         return {...state, searchFilter: action.payload}
      }
   }
}
function newsletterFilterReducer(state, action) {
   switch (action.type) {
      case 'SEARCH_FILTER': {
         return {searchFilter: action.payload}
      }
   }
}
function panelMemberFilterReducer(state, action) {
   switch (action.type) {
      case 'SEARCH_FILTER': {
         return {searchFilter: action.payload}
      }
   }
}

const FilterProvider = (props) => {
   const router = useRouter()
   const [eventFilter, dispatchEvent] = React.useReducer(eventFilterReducer, {
      time: 'UPCOMING',
      searchFilter: 'ALL'
   })
   const [panelMemberFilter, dispatchPanelMember] = React.useReducer(panelMemberFilterReducer, {
      searchFilter: 'ALL'
   })
   const [newsletterFilter, dispatchNewsletter] = React.useReducer(newsletterFilterReducer, {
      searchFilter: 'ALL'
   })
   const events = {eventFilter, dispatchEvent}
   const newsletters = {newsletterFilter, dispatchNewsletter}
   const panelMembers = {panelMemberFilter, dispatchPanelMember}

   useEffect(() => {}, [eventFilter])
   return (
      <FilterContext.Provider
         value={{
            events,
            newsletters,
            panelMembers
         }}
         {...props}
      />
   )
}
const useFilters = () => React.useContext(FilterContext)
export {FilterProvider, useFilters}
