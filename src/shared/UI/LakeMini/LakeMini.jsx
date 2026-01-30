import { useMemo } from "react"
import s from "./LakeMini.module.scss"

function fmtDate(v) {
    if (!v) return ""
    const d = new Date(v)
    return (
        d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }) +
        " · " +
        d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    )
}

export default function LakeMini({
    lake,
    joinedCount = 0,
    onOpen = () => { },
}) {
    // заглушка
    const L = lake ?? {
        name: "Озеро (загрузка)",
        status: "prep",
        city: "—",
        starts_at: null,
        description: "Короткое описание озера",
        tags: ["тег", "тег"],
        age_min: 20,
        age_max: 30,
        capacity: 30,
        organizer_rating: 4.8,
        participants_vibes: { like: 23, ok: 17, dislike: 2 },
    }

    const joined = Math.max(0, joinedCount)
    const cap = L.capacity ?? 0

    const percent = useMemo(
        () => Math.min(100, Math.round((joined / Math.max(1, cap)) * 100)),
        [joined, cap]
    )

    const age =
        L.age_min != null && L.age_max != null ? `${L.age_min}–${L.age_max}` : null

    const vibes = L.participants_vibes || { like: 0, ok: 0, dislike: 0 }

    return (
        <div className={`${s.card} ${s[L.status]}`}>
            {/* HEADER */}
            <div className={s.header}>
                <div className={s.title}>{L.name}</div>
                <div className={s.status}>{L.status}</div>
            </div>

            {/* META */}
            <div className={s.meta}>
                {L.city}
                {L.starts_at ? ` · ${fmtDate(L.starts_at)}` : ""}
            </div>

            {/* DESCRIPTION */}
            <div className={s.desc}>{L.description}</div>

            {/* TAGS (50%) + AGE (NOT TAG) */}
            <div className={s.tagsAgeRow}>
                <div className={s.tagsHalf}>
                    {(L.tags || []).slice(0, 2).map((t) => (
                        <span key={t} className={s.tag}>{t}</span>
                    ))}
                </div>

                {age ? <div className={s.agePlain}>Возраст: {age}</div> : <div />}
            </div>

            {/* BOTTOM */}
            <div className={s.bottom}>
                {/* PROGRESS WITH INFO */}
                <div className={s.fill}>
                    <div className={s.fillText}>
                        👥 {joined}/{cap} · {percent}%
                    </div>
                    <div className={s.bar}>
                        <div className={s.barFill} style={{ width: `${percent}%` }} />
                    </div>
                </div>

                {/* RATINGS ONE LINE */}
                <div className={s.ratings}>
                    ⭐{Number(L.organizer_rating).toFixed(1)} · 👥 👍{vibes.like} 😐{vibes.ok} 👎{vibes.dislike}
                </div>
            </div>

            {/* ACTION */}
            <button className={s.openBtn} onClick={onOpen}>
                Подробнее
            </button>
        </div>
    )
}
