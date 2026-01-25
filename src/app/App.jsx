import Auth from '../pages/Auth/Auth'
import User from '../shared/UI/User/User'
import Ship from '../widgets/Ship/Ship'
import './App.css'
import AuthProvider from './providers/auth/AuthProvider'
import { AppRouter } from './router/RouterApp'
import ProfileNavigation from './../widgets/ProfileNavigation/ProfileNavigation';

function App() {

  return (
    <>
      <AuthProvider>
        {/* <Ship /> */}
        <AppRouter />
        {/* <ProfileNavigation /> */}
      </AuthProvider>
      {/* <ProfileNavigation /> */}
    </>
  )
}

export default App
