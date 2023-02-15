import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles({
   ulPrimary: {
      marginRight: 10,
      '& .MuiPaginationItem-root': {
         color: 'white',
         fontSize: 14,
         backgroundColor: 'rgba(32,99,155,0.73)',
         '&:hover': {
            backgroundColor: '#ffffff',
            color: 'black'
         }
      },
      '& .Mui-selected': {
         backgroundColor: '#ffffff',
         color: 'black',
         '&:hover': {
            backgroundColor: '#ffffff'
         }
      }
   },
   ulSecondary: {
      marginRight: 10,
      '& .MuiPaginationItem-root': {
         color: 'white',
         fontSize: 14,
         backgroundColor: '#20639b61',
         '&:hover': {
            backgroundColor: '#20639B'
         }
      },
      '& .Mui-selected': {
         backgroundColor: '#20639B',
         color: 'white',
         '&:hover': {
            backgroundColor: '#20639B'
         }
      }
   }
})

export const PaginationControlled = ({totalPages, pageUpdate, color}) => {
   const classes = useStyles()
   const [page, setPage] = React.useState(1)
   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      event.preventDefault()
      console.log(value)
      console.log(page)
      pageUpdate(value)
      setPage(value)
   }

   console.log(totalPages)
   return (
      <div>
         <Pagination
            classes={color == 'primary' ? {ul: classes.ulPrimary} : {ul: classes.ulSecondary}}
            count={totalPages} // total number of pages
            color={color}
            hideNextButton={true}
            hidePrevButton={true}
            size={'large'}
            page={page}
            onChange={handleChange}
         />
      </div>
   )
}
