import s from './Form.module.scss'
import Field from '../Field/Field'
import Button from './../Button/Button';

const Form = (props) => {
    const {
        className,
    } = props

    return (
        <form
            className={`${className} ${s.form}`}
            action=""
        >
            <Field
                className={s.fieldContainer}
                inputClassName={`${s.inputOverride} `}
                id='login'
                name='login'
                label='Введите логин'
            />
            <Field
                className={s.fieldContainer}
                inputClassName={`${s.inputOverride}`}
                id='password'
                name='password'
                label='Введите пароль'
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