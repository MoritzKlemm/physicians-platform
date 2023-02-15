import {createTheme} from '@material-ui/core/styles'
import {red} from '@material-ui/core/colors'

// Create a theme instance.
const theme = createTheme({
   palette: {
      primary: {
         main: '#20639B'
      },
      secondary: {
         main: '#FFFFFF'
      },
      background: {
         default: '#E7E7E7'
      }
   },
   text: {
      main: '#3c3c3c'
   },
   typorgraphy: {
      fontFamily: 'Poppins'
   },
   breakpoints: {
      values: {
         xl: 1999,
         lg: 1200,
         md: 767,
         sm: 576,
         xs: 320
      }
   },
   spacing: 5
})

export default theme
