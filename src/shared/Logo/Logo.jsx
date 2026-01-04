import s from './Logo.module.scss'
import othero from '@/assets/logo/othero32.svg' // путь проверь

const Logo = () => {
    return (
        <div className={s.logo}>
            <img src={othero} alt="OTHERO" className={s.logoPng}/>
            <div className={s.logoLabel}>OTHERO</div>
        </div>
    )
}

export default Logo