import InteractiveButton from '../InteractiveButton'
import s from './ProfileNavigation.module.scss'

const ProfileNavigation = (props) => {
    const {
        profile,
        profileBackground,
        profileLabel,
        profileDescription,
    } = props

    const navigations = [
        {
            label: 'Home',
            icon: 'home',
        },
        {
            label: 'Profile',
            icon: 'user',
        },
        {
            label: 'Messages',
            icon: 'tg',
        },
        {
            label: 'Notifications',
            icon: 'notification',
        },
    ]
    return (
        <div className={s.container}>
            <div className={s.profileBox}>
                <div className={s.background} style={{
                    '--profile-bg': `url(/icons/${profileBackground}.jpg)`
                }}>
                    <img src={`/icons/${profile}.jpg`} className={s.profile} />
                </div>
                <div className={s.userInfo}>
                    <h1>{profileLabel}</h1>
                    <p>{profileDescription}</p>
                </div>
            </div>
            <nav className={s.navigationBox}>
                {navigations.map((navigation, index) => (
                    <InteractiveButton
                        key={index}
                        label={navigation.label}
                        icon={navigation.icon}
                        className={s['navigation-button']}
                    />
                ))}
            </nav>
        </div >
    )
}

export default ProfileNavigation