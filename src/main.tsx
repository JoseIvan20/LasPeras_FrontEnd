import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './router'
import { Provider } from 'react-redux'
import { store } from './utils/store'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
