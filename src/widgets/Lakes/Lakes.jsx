import LakeMini from '../../shared/UI/LakeMini/LakeMini'
import s from './Lakes.module.scss'

const Lakes = () => {
    return (
        <div className={s.container}>
            <div className={s.yourlakebox}>
                <div className={s.lake}>Ваше озеро</div>
                <LakeMini />
            </div>
            <div className={s.lakes}>
                
            </div>
        </div>
    )
}

export default Lakes