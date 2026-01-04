import s from './Field.module.scss'

const Field = (props) => {
    const {
        label,
        className,
        inputClassName,
        id,
        value,
        name,
        type = 'text',
        onChange,
        error,
    } = props



    return (
        <div className={`${s.field} ${className} `}>
            {!error ? (
                <label htmlFor={id} className={s.label}>{label}</label>
            ) : (
                <label htmlFor={id} className={s.labelError}>{error}</label>
            )}
            <input
                className={`${s.input} ${inputClassName}`}
                type={type}
                id={id}
                value={value}
                name={name}
                placeholder={label}
                onChange={onChange}
            />
        </div>
    )
}

export default Field