import { Provider  } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store';
import { Provider as ReduxProvider } from 'react-redux'
import './index.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ReduxProvider store={store}>
          <App />
      </ReduxProvider>
    </Provider>
  </StrictMode>
)
