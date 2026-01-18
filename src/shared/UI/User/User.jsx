import s from './User.module.scss'

const User = (props) => {
    const {
        userName,
        userRole,
        userAvatar,
    } = props

    return (
        <div className={s.container}>
            <img className={s.userAvatar} src={`/icons/${userAvatar}.jpg`} />
            <div className={s.userBox}>
                <p className={s.userName}>{userName}</p>
                <p className={s.userRole}>{userRole}</p>
            </div>
            <button className={s.icon} style={{
                backgroundImage: "url('/icons/plus.svg')",
            }}/>
        </div>
    )
}

export default User