import Auth from '../pages/Auth/Auth'
import Field from '../shared/Field/Field'
import InteractiveButton from '../shared/InteractiveButton'
import ProfileNavigation from '../shared/ProfileNavigation/ProfileNavigation'
import Header from '../widgets/Header'
import './App.css'

function App() {

  return (
    <>
      <ProfileNavigation
        profile='avatar'
        profileLabel='Dick Pick'
        profileDescription='Huesos'
        profileBackground='background-profile'
      />
    </>
  )
}

export default App
