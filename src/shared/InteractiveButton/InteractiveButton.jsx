import clsx from 'clsx'
import s from './InteractiveButton.module.scss'

const InteractiveButton = ({
    className,
    mode,
    iconPosition,
    label,
    icon,
}) => {
    return (
        <button className={clsx(s.button, className)} data-mode={mode} data-icon-position={iconPosition}>
            {icon && (
                <img
                    src={`/icons/${icon}.svg`}
                    alt=""
                    className={s.icon}
                />
            )}
            {label && <span className={s.label}>{label}</span>}
        </button>
    )
}

export default InteractiveButton