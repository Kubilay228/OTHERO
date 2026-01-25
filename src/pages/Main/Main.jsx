import s from './Main.module.scss'
import ProfileNavigation from './../../widgets/ProfileNavigation/ProfileNavigation'
import Header from '../../widgets/Header/Header'
import LakeCenter from '../../widgets/LakeCenter/LakeCenter'
import Ship from '../../widgets/Ship'

const Main = () => {
    return (
        <div className={s.page}>
            <Header />

            <div className={s.layout}>
                <aside className={s.left}>
                    <ProfileNavigation />
                </aside>

                <main className={s.center}>
                    <LakeCenter />
                </main>

                <aside className={s.right}>
                    <Ship />
                </aside>
            </div>
        </div>
    )
}

export default Main