import { useLakeFilters } from "../model/useLakesFilters"
import s from "./LakesFilters.module.scss"

export default function LakesFilters() {
    const {
        selectedStatuses,
        selectedFill,
        selectedTags,
        minAge,
        maxAge,
        toggleStatus,
        toggleFill,
        toggleTag,
        isStatusOn,
        isFillOn,
        isTagOn,
        setMinAge,
        setMaxAge,
    } = useLakeFilters()

    return (
        <aside className={s.card}>
            {/* HEADER */}
            <div className={s.head}>
                <div className={s.title}>Фильтры</div>
                <button className={s.linkBtn} onClick={() => {
                    // Сброс всех фильтров через хук
                }}>
                    Сбросить
                </button>
            </div>

            {/* STATUS */}
            <section className={s.section}>
                <div className={s.sectionTitle}>Статус</div>
                <div className={s.toggles}>
                    {["prep", "live", "done"].map((x) => (
                        <button
                            key={x}
                            type="button"
                            className={`${s.toggle} ${isStatusOn(x) ? s.active : ""}`}
                            aria-pressed={isStatusOn(x)}
                            onClick={() => toggleStatus(x)}
                        >
                            {x === "prep" ? "Подготовка" : x === "live" ? "Идёт" : "Завершено"}
                        </button>
                    ))}
                </div>
            </section>

            {/* FILL */}
            <section className={s.section}>
                <div className={s.sectionTitle}>Заполненность</div>
                <div className={s.toggles}>
                    {["available", "almostFull", "full"].map((x) => (
                        <button
                            key={x}
                            type="button"
                            className={`${s.toggle} ${isFillOn(x) ? s.active : ""}`}
                            aria-pressed={isFillOn(x)}
                            onClick={() => toggleFill(x)}
                        >
                            {x === "available" ? "Есть места" : x === "almostFull" ? "Почти фулл" : "Фулл"}
                        </button>
                    ))}
                </div>
            </section>

            {/* AGE */}
            <section className={s.section}>
                <div className={s.sectionTitle}>Возраст</div>
                <div className={s.ageRange}>
                    <input
                        type="number"
                        value={minAge}
                        onChange={(e) => setMinAge(Number(e.target.value))}
                        min="0"
                        max={maxAge}
                        className={s.input}
                    />
                    <input
                        type="number"
                        value={maxAge}
                        onChange={(e) => setMaxAge(Number(e.target.value))}
                        min={minAge}
                        className={s.input}
                    />
                </div>
            </section>

            {/* TAGS */}
            <section className={s.section}>
                <div className={s.sectionTitle}>Теги</div>
                <div className={s.toggles}>
                    {["отличная компания", "безопасно", "чисто", "музыка", "тихо", "спорт"].map((t) => (
                        <button
                            key={t}
                            type="button"
                            className={`${s.toggle} ${isTagOn(t) ? s.active : ""}`}
                            aria-pressed={isTagOn(t)}
                            onClick={() => toggleTag(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </section>

            {/* APPLY */}
            <button className={s.applyBtn}>
                Применить
            </button>
        </aside>
    )
}