import s from './Form.module.scss'
import Field from '../Field/Field'
import Button from './../Button/Button';

const Form = (props) => {
    const {
        className,
        onSubmit,
    } = props

    const { log, pas } = useContext(AuthContext)

    return (
        <form
            className={`${className} ${s.form}`}
            action=""
            onSubmit={onSubmit}
        >
            <Field
                className={s.fieldContainer}
                inputClassName={`${s.inputOverride} `}
                id='login'
                name='login'
                label='Введите логин'
                onChange={log}
            />
            <Field
                className={s.fieldContainer}
                inputClassName={`${s.inputOverride}`}
                id='password'
                name='password'
                label='Введите пароль'
                onChange={pas}
            />
            <Button
                className={s.submitButton}
                title='Войти'
            // onClick={userF}
            />
        </form>
    )
}

export default Form