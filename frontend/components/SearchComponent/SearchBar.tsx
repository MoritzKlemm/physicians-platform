import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {searchFilter} from './SearchFunction'
import {Newsletter} from '../newsletters/Newsletters.types'
import {EventType} from '../events/Events.types'
import {PanelMemberType} from '../about/About.types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useFilters} from '../../context/FilterProvider'

const useStyles = makeStyles((Theme) => ({
   rootTextField: {
      paddingRight: Theme.spacing(1),
      backgroundColor: 'transparent',
      [Theme.breakpoints.down(Theme.breakpoints.values.md)]: {
         paddingRight: 0
      }
   },
   textField: {
      fontSize: '15px',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      height: '35px',
      backgroundColor: 'white'
   },
   buttonGroup: {
      height: '35px',
      backgroundColor: 'white',
      width: '100%',
      [Theme.breakpoints.down(Theme.breakpoints.values.md)]: {
         marginTop: Theme.spacing(1)
      }
   },
   button: {
      padding: 0,
      color: '#20639b !important',
      width: '100%',
      fontSize: 10,
      '&:hover': {
         backgroundColor: 'white'
      }
   },
   selectedButton: {color: 'white !important', backgroundColor: '#20639B !important'}
}))

const ALL = {key: 'ALL', label: 'any keyword', filterTag: 'ALL'}
const INSTITUTION = {key: 'INSTITUTION', label: 'a institution', filterTag: 'INSTITUTION'}
const NUMBER = {key: 'NUMBER', label: 'a number', filterTag: 'NUMBER'}
const TITLE = {key: 'TITLE', label: 'a title', filterTag: 'TITLE'}
const AUTHOR = {key: 'AUTHOR', label: 'a author', filterTag: 'AUTHOR'}
const YEAR = {key: 'YEAR', label: 'a year', filterTag: 'YEAR'}
const LOCATION = {key: 'LOCATION', label: 'a location', filterTag: 'LOCATION'}
const EVENTTYPE = {key: 'EVENTTYPE', label: 'a type of event', filterTag: 'EVENTTYPE'}
const NAME = {key: 'NAME', label: 'a first name', filterTag: 'NAME'}
const COUNTRY = {key: 'COUNTRY', label: 'a country', filterTag: 'COUNTRY'}

const ALL_EVENTS = {key: 'ALL', label: 'any keyword', filterTag: 'ALL EVENTS'}
const OTHER_EVENTS = {key: 'OTHERS', label: 'any keyword', filterTag: 'OTHER BEAM DYNAMICS EVENTS'}
const ICFA_EVENTS = {key: 'ICFA', label: 'any keyword', filterTag: 'ICFA EVENTS'}
export type FilterOptionsNewsletter =
   | typeof ALL
   | typeof NUMBER
   | typeof TITLE
   | typeof AUTHOR
   | typeof YEAR
export type FilterOptionsEvent = typeof ALL | typeof LOCATION | typeof TITLE | typeof EVENTTYPE
export type FilterOptionsPanelMember =
   | typeof ALL
   | typeof NAME
   | typeof COUNTRY
   | typeof INSTITUTION

interface SearchBarType {
   searchType: 'NEWSLETTERS' | 'EVENTS' | 'PANELMEMBERS'
   updateResults: any
   data: Array<Newsletter> | Array<EventType> | Array<PanelMemberType>
}

type FilterType = {
   key: string
   label: string
   filterTag: string
}
const initial_EVENT = {
   key: 'ALL',
   label: 'any keyword in an event',
   filterTag: 'all'
}
const initial_NEWSLETTER = {
   key: 'ALL',
   label: 'any keyword in a newsletter',
   filterTag: 'all'
}
const initial_MEMBER = {
   key: 'ALL',
   label: 'any keyword',
   filterTag: 'all'
}

export const SearchBar: React.FC<SearchBarType> = ({searchType, updateResults, data}) => {
   const filterOptionsNewsletter: Array<FilterType> = [ALL, NUMBER, TITLE, AUTHOR, YEAR]
   const filterOptionsEvent: Array<FilterType> = [ALL_EVENTS, ICFA_EVENTS, OTHER_EVENTS]
   const filterOptionsPanelMember: Array<FilterType> = [ALL, NAME, COUNTRY, INSTITUTION]
   const filterContext = useFilters()

   const classes = useStyles()
   const preSentence = 'search for '
   const [selectedFilter, setSelectedFilter] = useState<FilterType>(
      searchType == 'NEWSLETTERS'
         ? initial_NEWSLETTER
         : searchType == 'EVENTS'
         ? initial_EVENT
         : initial_MEMBER
   )

   const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
      console.log(newAlignment)
      if (newAlignment !== null) {
         filterContext.events.dispatchEvent({type: 'SEARCH_FILTER', payload: newAlignment})
      }
   }
   return (
      <div className="sb-wrapper">
         <form
            className="sb-form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
         >
            <Container fluid>
               <Row className="d-flex align-items-center sb-row">
                  <Col md={6}>
                     <TextField
                        classes={{root: classes.rootTextField}}
                        InputProps={{classes: {root: classes.textField}}}
                        onChange={(event) => {
                           updateResults(
                              searchFilter(event.target.value, searchType, selectedFilter.key, data)
                           )
                        }}
                        id="outlined-basic"
                        placeholder={preSentence + selectedFilter.label}
                        variant="outlined"
                        fullWidth
                        size={'medium'}
                     />
                  </Col>
                  <Col md={6}>
                     <ToggleButtonGroup
                        classes={{root: classes.buttonGroup}}
                        aria-label="text primary button group"
                        value={selectedFilter.key}
                        exclusive
                        onChange={handleAlignment}
                     >
                        {(searchType == 'NEWSLETTERS'
                           ? filterOptionsNewsletter
                           : searchType == 'EVENTS'
                           ? filterOptionsEvent
                           : filterOptionsPanelMember
                        ).map((filterItem, index) => (
                           <ToggleButton
                              className="col"
                              value={filterItem.key}
                              classes={{root: classes.button, selected: classes.selectedButton}}
                              onClick={() => {
                                 if (
                                    filterItem.key !== filterContext.events.eventFilter.searchFilter
                                 ) {
                                    filterContext.events.dispatchEvent({
                                       type: 'SEARCH_FILTER',
                                       payload: filterItem
                                    })
                                    setSelectedFilter(filterItem)
                                 }
                              }}
                              key={index}
                           >
                              {filterItem.filterTag}
                           </ToggleButton>
                        ))}
                     </ToggleButtonGroup>
                  </Col>
               </Row>
            </Container>
         </form>
      </div>
   )
}
