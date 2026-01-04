import Form from '../../shared/Form'
import Logo from '../../shared/Logo'
import s from './Auth.module.scss'

const Auth = () => {
    return (
        <div className={s.container}>
            <header className={s.header}>
                <Logo />
            </header>
            <Form />
        </div>
    )
}

export default Auth