import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { startI18n, ScrollToTop } from './utils'
import { ThemeProvider } from '@mui/material'
import Routes from './routes'
import store from './utils/redux'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './styles'
import './global.css'
import { SnackbarNotification } from './components/molecules'

startI18n()

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as HTMLElement)

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
        <SnackbarNotification />
        <ScrollToTop />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
