import s from "./Button.module.scss";

const Button = (props) => {
    const {
        title,
        subtitle,
        className = '',
        onClick,
        disabled,
    } = props

    if (subtitle) {
        return (
            <div className={s.container}>
                <button onClick={onClick} disabled={disabled} className={`${s.button} ${className}`}>
                    {title}
                </button>
                <div className={s.sub}>{subtitle}</div>
            </div>
        );
    }

    return (
        <button
            className={`${s.button} ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;
