import useGroupProfiles from '../../shared/API/useGroupProfiles'
import User from '../../shared/UI/User/User'
import s from './Ship.module.scss'

const Ship = (props) => {
    const {
        error,
        loading,
        groupProfiles,
    } = useGroupProfiles()

    return (
        <div className={s.container}>
            <div className={s.descriptionBox}>
                Participans
            </div>
            <div className={s.usersBox}>
                {groupProfiles.map((item) => {
                    const key = crypto.randomUUID()
                    const {
                        display_name: userName,
                        bio: userRole,
                        avatar_url: userAvatar,
                    } = item.profile
                    console.log(item.profile)
                    return (
                        <User
                            key={key}
                            userName={userName}
                            userRole={userRole}
                            userAvatar={userAvatar}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Ship