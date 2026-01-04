import s from './InteractiveButton'

const InteractiveButton = (props) => {
    const {
        mode,
        label,
        icon,
        iconPosition,
    } = props

    return (
        <button className={mode && (`s.button-${mode}`)}>
            {label && <div className={s.label}>{label}</div>}
            {icon && <img className ={iconPosition && (`s.icon-${iconPosition}`)} src={`@public/${icon}.svg`} />}
        </button>
    )
}

export default InteractiveButton