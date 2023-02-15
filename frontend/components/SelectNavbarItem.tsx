import {makeStyles} from '@material-ui/core/styles'
import React from 'react'
import {MenuItem, Select} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
   button: {
      display: 'block',
      marginTop: theme.spacing(2)
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120
   }
}))

export default function SelectNavbarItem(openChangeState) {
   const classes = useStyles()
   const [age, setAge] = React.useState<string | number>('')
   const [open, setOpen] = React.useState(false)

   const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
      setAge(event.target.value as number)
   }

   const handleClose = () => {
      setOpen(false)
   }

   const handleOpen = (openChangeState) => {
      setOpen(!openChangeState)
   }

   return (
      <div>
         <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
         >
            <MenuItem value="">
               <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
         </Select>
      </div>
   )
}
