import { useMemo, useState } from 'react'
import s from './LakeCenter.module.scss'
import Button from '../../shared/UI/Button/Button'

const LakeCenter = ({
    lake = {
        name: 'Озеро Сапфир',
        status: 'Подготовка', // Подготовка | Идет | Завершено
        city: 'Amsterdam',
        dateLabel: '31 января · 20:00',
        joined: 46,
        capacity: 120,

        nowText: 'Идёт набор, осталось 74 места',

        plan: [
            { time: '19:30', title: 'Сбор', text: 'Встречаемся в точке сбора.' },
            { time: '20:00', title: 'Старт', text: 'Начинаем. Следим за апдейтами орга.' },
            { time: '23:00', title: 'Финиш', text: 'Заканчиваем и оставляем чисто.' },
        ],

        pinned:
            'Сбор у входа в парк. Берите тёплую одежду и воду. Не мусорим, уважаем людей и место.',

        organizerRating: { score: 4.8, badge: 'хороший организатор', votes: 128 },
        participantVibes: { like: 23, ok: 17, dislike: 2 },
        ratingTags: ['отличная компания', 'безопасно', 'чисто'],

        location: {
            short: 'Парк у озера, вход со стороны парковки',
            address: 'Park entrance, Amsterdam',
            meetup: 'Сбор у входа в парк',
            parking: 'Парковка возле входа',
        },

        mediaPreview: [{}, {}, {}, {}], // заглушка, потом заменишь на реальные
    },

    onDetails = () => { },
    onLeave = () => { },
    onOpenMap = () => { },
    onOpenArchive = () => { },
}) => {
    const [locOpen, setLocOpen] = useState(false)

    const percent = useMemo(() => {
        return Math.min(100, Math.round((lake.joined / Math.max(1, lake.capacity)) * 100))
    }, [lake.joined, lake.capacity])

    const statusClass =
        lake.status === 'Идет' ? s.statusLive : lake.status === 'Завершено' ? s.statusDone : s.statusPrep

    const nowLine = useMemo(() => {
        if (lake?.nowText != null) return lake.nowText
        if (lake.status === 'Завершено') return 'Озеро закрыто. Архив доступен.'
        if (lake.status === 'Идет') return 'Ивент активен. Следи за апдейтами организатора.'
        const left = Math.max(0, lake.capacity - lake.joined)
        return `Идёт набор, осталось ${left} мест`
    }, [lake.nowText, lake.status, lake.capacity, lake.joined])

    return (
        <div className={s.container}>
            <div className={s.scroll}>
                {/* Sticky header */}
                <div className={`${s.headerCard} ${statusClass}`}>
                    <div className={s.headerTop}>
                        <div className={s.headLeft}>
                            <div className={s.nameRow}>
                                <div className={s.name}>{lake.name}</div>
                                <div className={s.statusChip}>{lake.status}</div>
                            </div>
                            <div className={s.meta}>
                                {lake.city} · {lake.dateLabel}
                            </div>
                        </div>

                        <div className={s.headBtns}>
                            <Button title="Карта" onClick={onOpenMap} className={s.btnGhost} />
                            <Button title="Подробнее" onClick={onDetails} className={s.btnGhost} />
                            {lake.status === 'Завершено' ? (
                                <Button title="Архив" onClick={onOpenArchive} className={s.btnGhost} />
                            ) : null}
                            <Button title="Выйти" onClick={onLeave} className={s.btnDanger} />
                        </div>
                    </div>

                    <div className={s.progressWrap}>
                        <div className={s.progressTop}>
                            <span>Заполненность</span>
                            <span>
                                {lake.joined}/{lake.capacity} · {percent}%
                            </span>
                        </div>
                        <div className={s.progressBar}>
                            <div className={s.progressFill} style={{ width: `${percent}%` }} />
                        </div>
                    </div>
                </div>

                {/* Blocks */}
                <div className={s.blocks}>
                    {/* Now */}
                    <div className={s.block}>
                        <div className={s.blockTitle}>Что сейчас</div>
                        <div className={s.nowText}>{nowLine}</div>
                    </div>

                    {/* Plan (short) */}
                    <div className={s.block}>
                        <div className={s.blockTitle}>План</div>
                        <div className={s.timeline}>
                            {(lake.plan || []).slice(0, 4).map((p, i) => (
                                <div key={i} className={s.timelineItem}>
                                    <div className={s.time}>{p.time}</div>
                                    <div className={s.tBody}>
                                        <div className={s.tTitle}>{p.title}</div>
                                        {p.text ? <div className={s.tText}>{p.text}</div> : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pinned */}
                    <div className={s.block}>
                        <div className={s.blockTitle}>Закреп от организатора</div>
                        <div className={s.pinned}>{lake.pinned}</div>
                    </div>

                    {/* Ratings (summary) */}
                    <div className={s.block}>
                        <div className={s.blockHeaderRow}>
                            <div>
                                <div className={s.blockTitle}>Оценки</div>
                                <div className={s.blockSub}>Короткая сводка (без простыни)</div>
                            </div>
                        </div>

                        <div className={s.ratingsGrid}>
                            <div className={s.ratingCard}>
                                <div className={s.ratingLabel}>Организатор</div>
                                <div className={s.ratingRow}>
                                    <div className={s.ratingValue}>{lake.organizerRating?.score ?? '—'}</div>
                                    <div className={s.ratingMeta}>
                                        <div className={s.ratingSmall}>
                                            метка: {lake.organizerRating?.badge ?? 'нет'}
                                        </div>
                                        <div className={s.ratingSmall}>
                                            {lake.organizerRating?.votes ? `${lake.organizerRating.votes} голосов` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.ratingCard}>
                                <div className={s.ratingLabel}>Участники</div>
                                <div className={s.vibes}>
                                    <div className={s.vibe}>👍 <b>{lake.participantVibes?.like ?? 0}</b></div>
                                    <div className={s.vibe}>😐 <b>{lake.participantVibes?.ok ?? 0}</b></div>
                                    <div className={s.vibe}>👎 <b>{lake.participantVibes?.dislike ?? 0}</b></div>
                                </div>
                            </div>
                        </div>

                        {(lake.ratingTags || []).length ? (
                            <div className={s.tags}>
                                {lake.ratingTags.slice(0, 5).map((t) => (
                                    <div key={t} className={s.tag}>
                                        {t}
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <div className={s.actionsRow}>
                            <Button title="Оценить" onClick={onDetails} className={s.btnGhost} />
                        </div>
                    </div>

                    {/* Location (collapsible) */}
                    <div className={s.block}>
                        <div className={s.blockHeaderRow}>
                            <div>
                                <div className={s.blockTitle}>Локация</div>
                                <div className={s.blockSub}>{lake.location?.short}</div>
                            </div>

                            <button className={s.linkBtn} onClick={() => setLocOpen((v) => !v)}>
                                {locOpen ? 'Свернуть' : 'Показать детали'}
                            </button>
                        </div>

                        {locOpen ? (
                            <div className={s.locationBody}>
                                <div className={s.locLine}><b>Адрес:</b> {lake.location?.address}</div>
                                <div className={s.locLine}><b>Сбор:</b> {lake.location?.meetup}</div>
                                <div className={s.locLine}><b>Парковка:</b> {lake.location?.parking}</div>

                                <div className={s.actionsRow}>
                                    <Button title="Построить маршрут" onClick={onOpenMap} />
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Media/Archive teaser */}
                    <div className={s.block}>
                        <div className={s.blockHeaderRow}>
                            <div>
                                <div className={s.blockTitle}>Медиа</div>
                                <div className={s.blockSub}>
                                    {lake.status === 'Завершено'
                                        ? 'Архив доступен'
                                        : 'Появится после завершения/во время ивента'}
                                </div>
                            </div>
                            {lake.status === 'Завершено' ? (
                                <button className={s.linkBtn} onClick={onOpenArchive}>Открыть архив</button>
                            ) : null}
                        </div>

                        <div className={s.mediaGrid}>
                            {(lake.mediaPreview || []).slice(0, 4).map((_, i) => (
                                <div key={i} className={s.mediaTile}>preview</div>
                            ))}
                        </div>

                        {lake.status === 'Завершено' ? (
                            <div className={s.actionsRow}>
                                <Button title="Открыть архив" onClick={onOpenArchive} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LakeCenter