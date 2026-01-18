import User from '../../shared/UI/User/User'
import s from './Ship.module.scss'

const Ship = (props) => {
    const users = [
        {
            userName: '',
            userRole: '',
            userAvatar: '',
        },
        {
            userName: '',
            userRole: '',
            userAvatar: '',
        },
        {
            userName: '',
            userRole: '',
            userAvatar: '',
        },
    ]

    return (
        <div className={s.container}>
            <div className={s.descriptionBox}>
                Participans
            </div>
            <div className={s.usersBox}>
                {users.map((item) => {
                    const key = crypto.randomUUID()
                    return (
                        <User
                            key={key}
                            userName='Хуе Сос'
                            userRole='Хуесос'
                            userAvatar='avatar'
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Ship