import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f1f2f8'
    },
    primary: {
      main: '#111236'
    },
    secondary: {
      main: '#8f90a0'
    },
    success: {
      main: '#00a698'
    },
    error: {
      main: '#d1435b'
    },
    text: {
      primary: '#73cec6',
      secondary: '#a59bc8'
    }
  },
  spacing: factor => `${0.25 * factor}rem`
})

export default theme