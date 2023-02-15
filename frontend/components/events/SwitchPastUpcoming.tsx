import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {useFilters} from '../../context/FilterProvider'

const useStyles = makeStyles(() => ({
   buttonGroup: {
      backgroundColor: 'white !important',
      height: '35px',
      borderRadius: 40,
      border: 'black',
      width: 180
   },
   button: {
      color: 'black !important',
      width: '100%',
      fontSize: 10,
      borderRadius: 40
   },
   selectedButton: {color: 'white !important', backgroundColor: '#20639B !important'}
}))

export const SwitchPastUpcoming = () => {
   const classes = useStyles()
   const [selected, setSelected] = React.useState('UPCOMING')

   const filterContext = useFilters()
   function switchSelection(e) {
      setSelected(e.target.innerText)
      filterContext.events.dispatchEvent({type: 'TIME_FILTER', payload: e.target.innerText})
   }

   return (
      <div className="ws-switch-past-upcoming-wrapper">
         <ToggleButtonGroup classes={{root: classes.buttonGroup}} exclusive className="">
            <ToggleButton
               classes={{root: classes.button, selected: classes.selectedButton}}
               value={'UPCOMING'}
               selected={selected === 'UPCOMING'}
               onClick={(e) => {
                  switchSelection(e)
               }}
            >
               UPCOMING
            </ToggleButton>
            <ToggleButton
               classes={{root: classes.button, selected: classes.selectedButton}}
               value={'PAST'}
               selected={selected === 'PAST'}
               onClick={(e) => {
                  switchSelection(e)
               }}
            >
               PAST
            </ToggleButton>
         </ToggleButtonGroup>
      </div>
   )
}
