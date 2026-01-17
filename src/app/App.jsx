import Auth from '../pages/Auth/Auth'
import './App.css'
import AuthProvider from './providers/Auth/AuthProvider'
import { AppRouter } from './router/RouterApp'

function App() {

  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}

export default App
