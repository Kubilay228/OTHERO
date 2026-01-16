import clsx from 'clsx'
import s from './Logo.module.scss'
import othero from '@/assets/logo/othero32.svg' // путь проверь

const Logo = (props) => {
    const { className } = props

    return (
        <div className={clsx(s.logo, className)}>
            <img src={othero} alt="OTHERO" className={s.logoPng} />
            <div className={s.logoLabel}>OTHERO</div>
        </div>
    )
}

export default Logo