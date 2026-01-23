import { useContext } from 'react'
import Form from '../../shared/UI/Form'
import Logo from '../../shared/UI/Logo'
import { AuthContext } from "../../app/providers/auth/AuthProvider";
import s from './Auth.module.scss'

const Auth = () => {
    return (
        <div className={s.container}>
            <header className={s.header}>
                <Logo />
            </header>
            <Form/>
        </div>
    )
}

export default Auth