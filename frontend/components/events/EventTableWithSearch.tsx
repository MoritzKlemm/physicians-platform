import {SwitchPastUpcoming} from './SwitchPastUpcoming'
import React, {useEffect, useState} from 'react'
import {isEmpty} from 'lodash'
import Skeleton from '@material-ui/lab/Skeleton'
import {PaginationControlled} from '../SearchComponent/Pagination'
import {EventType} from './Events.types'
import {SearchBar} from '../SearchComponent/SearchBar'
import {EventItem} from '../home/EventItem'
import {makeStyles} from '@material-ui/core/styles'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useFilters} from '../../context/FilterProvider'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'

interface EventTableWithSearch {
   events: Array<EventType>
   error: any
   isLoading: any
   content: string
}

const useStyles = makeStyles(() => ({
   buttonGroup: {
      backgroundColor: 'white !important',
      height: '35px',
      borderRadius: 40
   },
   button: {
      // color: 'black !important',
      width: '100%',
      fontSize: 10,
      borderRadius: 40
   },
   selectedButton: {color: 'white !important', backgroundColor: '#20639B !important'}
}))
export const EventTableWithSearch: React.FC<EventTableWithSearch> = ({
   events,
   error,
   isLoading,
   content
}) => {
   const [selectedValue, setSelectedValue] = React.useState('a')

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value)
   }
   const updateNewsletterOnPageChange = (pageChange) => {
      setCurrentPage(pageChange)
   }
   const [selected, setSelected] = React.useState('UPCOMING')

   const calcTotalPages = (data) => {
      return Number(data.length / pageSize) === data.length / pageSize &&
         (data.length / pageSize) % 1 !== 0
         ? Math.floor(data.length / pageSize + 1)
         : data.length / pageSize
   }
   const classes = useStyles()
   const [preFilteredEvents, setPreFilteredEvents] = useState(events)
   const [pageSize, setPageSize] = useState(4)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)
   const [eventSwitcher, setEventSwitcher] = useState('UPCOMING')
   const [typeSwitcher, setTypeSwitcher] = useState('ALL')
   const filterContext = useFilters()
   const [timeBasedFilter, setTimeBasedFilter] = useState([])
   useEffect(() => {
      setTimeBasedFilter(
         events
            .filter((item) => {
               if (eventSwitcher == 'UPCOMING') {
                  return new Date(`${item.beginEvent}`) > new Date()
               } else {
                  return new Date(`${item.beginEvent}`) < new Date()
               }
            })
            .filter((item) => {
               item.eventType.toLowerCase().includes(typeSwitcher.toLowerCase())
            })
      )
   }, [eventSwitcher, typeSwitcher])

   // give different paddings depending wheter event items sit left or right in the row
   function paddingSetter(index) {
      return index % 2 === 1
         ? {padding: '0px 0px 10px 5px', width: '100%', height: '100%'}
         : {padding: '0px 5px 10px 0px', width: '100%', height: '100%'}
   }

   // if > 4 events exist the pagination shouldnt change the height of the results box
   function searchResultsHeightSetter(pages) {
      return pages > 1 ? {height: '60vh'} : {height: '100%'}
   }

   useEffect(() => {
      const currentFilters = preFilteredEvents
         .filter((item) => {
            if (filterContext.events.eventFilter.time == 'UPCOMING') {
               return new Date(`${item.beginEvent}`) > new Date()
            } else {
               return new Date(`${item.beginEvent}`) < new Date()
            }
         })
         .filter((item) => {
            if (filterContext.events.eventFilter.searchFilter == 'ALL') return true
            return item.eventType
               .toLowerCase()
               .includes(filterContext.events.eventFilter.searchFilter.toLowerCase())
         })
         .sort(function (a, b) {
            // @ts-ignore
            return new Date(a.beginEvent) - new Date(b.beginEvent)
         })
      setTotalPages(calcTotalPages(currentFilters))
      setTimeBasedFilter(currentFilters)
   }, [preFilteredEvents, filterContext.events.eventFilter])

   if (isLoading) return <Skeleton variant={'rect'}>Data elements are loading</Skeleton>
   return (
      <div className="gen-wrapper-events events-ongoing-upcoming-background">
         <h1 className="gen-subheading-first" style={{color: 'black'}}>
            EVENTS
         </h1>
         <div className="nls-outer-box">
            <p className="gen-subheading-subtext-grey">
               <Markdown>{content}</Markdown>
            </p>
         </div>
         <div className="row ws-pagination justify-content-center">
            <PaginationControlled
               color={'secondary'}
               totalPages={totalPages}
               pageUpdate={updateNewsletterOnPageChange}
            />
            <SwitchPastUpcoming />
         </div>
         <SearchBar
            searchType="EVENTS"
            updateResults={setTimeBasedFilter}
            data={preFilteredEvents}
         />
         <div className="ws-outer-box">
            <Container fluid>
               <Row
                  className="ws-search-results-wrapper"
                  style={searchResultsHeightSetter(totalPages)}
               >
                  {!isEmpty(timeBasedFilter) ? (
                     timeBasedFilter
                        .slice(pageSize * currentPage - pageSize, pageSize * currentPage)
                        .map((item, index) => (
                           <Col sm={6} key={index} className="p-0" style={{maxHeight: '50%'}}>
                              <div
                                 style={paddingSetter(index)}
                                 className="ws-search-result-item-wrapper"
                              >
                                 <EventItem event={item} key={item.id} />
                              </div>
                           </Col>
                        ))
                  ) : (
                     <Row className="ws-no-events-found-row">
                        <h4 className="ws-no-events-found-content">
                           Sorry, we couldn't find any events. <br /> If you want to publish an
                           event, please fill out the event form below or{' '}
                           <Link href={`/about`}>contact a panel member</Link>.
                        </h4>
                     </Row>
                  )}
               </Row>
            </Container>
         </div>
      </div>
   )
}
