import Field from '../../shared/Field/Field'
import InteractiveButton from '../../shared/InteractiveButton'
import Logo from '../../shared/Logo'
import s from './Header.module.scss'

const Header = () => {
    return (
        <header className={s.header}>
            <div
                className={s.container}
            >
                <Logo
                    className={s['header-logo']}
                />
                <Field
                    label='Seacrh'
                    className={s['header-field']}
                />
                <InteractiveButton
                    className={s['header-button']}
                    mode='big'
                    label='Logout'
                    icon='userdark'
                    iconPosition='after'
                />
            </div>
        </header>
    )
}

export default Header