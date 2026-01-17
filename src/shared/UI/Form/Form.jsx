import s from './Form.module.scss'
import Field from '../Field/Field'
import Button from '../Button'
import useLogIn from "../../../features/LogIn/useLogIn";


const Form = (props) => {
    const {
        className,
        onSubmit,
    } = props

    const { email, password, log, pas, logIn } = useLogIn()

    return (
        <form
            className={`${className} ${s.form}`}
            action=""
            onSubmit={logIn}
        >
            <Field
                className={s.fieldContainer}
                inputClassName={`${s.inputOverride} `}
                id='login'
                name='login'
                label='Введите логин'
                onChange={log}
                value={email}
            />
            <Field
                className={s.fieldContainer}
                inputClassName={`${s.inputOverride}`}
                id='password'
                name='password'
                label='Введите пароль'
                onChange={pas}
                value={password}
            />
            <Button
                className={s.submitButton}
                title='Войти'
            />
        </form>
    )
}

export default Form