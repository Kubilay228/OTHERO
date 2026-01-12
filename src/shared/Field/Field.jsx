import clsx from 'clsx';
import s from './Field.module.scss';

const Field = (props) => {
    const {
        label,
        error,
        id,
        className, // Это класс из Хедера (s['header-field'])
        ...rest    // Все остальные пропсы (onChange, value и т.д.)
    } = props;

    return (
        // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: className теперь здесь
        <div className={clsx(s.field, className)} data-error={!!error}>
            <label htmlFor={id} className={s.label}>
                {error}
            </label>

            <div className={s.inputWrapper}>
                <img
                    src='/icons/search.svg'
                    className={s.icon}
                    alt=""
                />
                <input
                    id={id}
                    className={s.input}
                    placeholder={label}
                    {...rest} 
                />
            </div>
        </div>
    );
};

export default Field;