import { useContext } from 'react'
import Form from '../../shared/UI/Form'
import Logo from '../../shared/UILogo'
import s from './Auth.module.scss'

const {
    logIn
} = useContext(AuthContext)

const Auth = () => {
    return (
        <div className={s.container}>
            <header className={s.header}>
                <Logo />
            </header>
            <Form
                onSubmit={logIn}
            />
        </div>
    )
}

export default Auth