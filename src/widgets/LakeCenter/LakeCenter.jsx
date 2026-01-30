import { useMemo, useState } from 'react'
import s from './LakeCenter.module.scss'
import Button from '../../shared/UI/Button/Button'
import useLakeMain from './../../entities/Lake/API/useLakeMain';
import useLakePlan from '../../entities/Lake/API/useLakePlan';
import useGroupProfiles from '../../entities/Lake/API/useGroupProfiles';

const LakeCenter = ({

    lak = {
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
    const {
        groupProfiles,
    } = useGroupProfiles()

    const { lake, error, loading } = useLakeMain('f37c7dc6-e0af-4c67-9a4e-65cd00082dd7')
    const { lakePlan } = useLakePlan('f37c7dc6-e0af-4c67-9a4e-65cd00082dd7')

    const [locOpen, setLocOpen] = useState(false)

    // безопасные значения (НЕ из lak)
    const capacity = lake?.capacity ?? 0
    const joined = groupProfiles.length ?? 0
    let status

    switch (lake?.status) {
        case 'prep':
            status = 'Подготовка'
            break;
        case 'live':
            status = 'Идет'
            break;
        case 'done':
            status = 'Завершено'
            break;
    }

    function formatLakeDate(value) {
        if (!value) return ''

        const d = new Date(value)

        const date = d.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })

        const time = d.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })

        return `${date} · ${time}`
    }

    const start = formatLakeDate(lake?.starts_at)

    const percent = useMemo(() => {
        return Math.min(100, Math.round((joined / Math.max(1, capacity)) * 100))
    }, [joined, capacity])

    const statusClass =
        status === 'Идет' ? s.statusLive : status === 'Завершено' ? s.statusDone : s.statusPrep

    const nowLine = useMemo(() => {
        const nowText = lake?.now_text ?? lake?.nowText // на всякий случай, у тебя в БД now_text
        if (nowText != null) return nowText
        if (status === 'Завершено') return 'Озеро закрыто. Архив доступен.'
        if (status === 'Идет') return 'Ивент активен. Следи за апдейтами организатора.'
        const left = Math.max(0, capacity - joined)
        return `Идёт набор, осталось ${left} мест`
    }, [lake?.now_text, lake?.nowText, status, capacity, joined])

    // ВОТ ТУТ можно ранние return — ПОСЛЕ хуков/useMemo
    if (loading) {
        return (
            <div className={s.container}>
                <div className={s.loading}>Загрузка…</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={s.container}>
                <div className={s.loading}>Ошибка загрузки</div>
            </div>
        )
    }

    if (!lake) {
        return (
            <div className={s.container}>
                <div className={s.loading}>Озеро недоступно</div>
            </div>
        )
    }

    return (
        <div className={s.container}>

            {/* Sticky header */}
            <div className={`${s.headerCard} ${statusClass}`}>
                <div className={s.headerTop}>
                    <div className={s.headLeft}>
                        <div className={s.nameRow}>
                            <div className={s.name}>{lake.name}</div>
                            <div className={s.statusChip}>{status}</div>
                        </div>
                        <div className={s.meta}>
                            {lake.city} · {start}
                        </div>
                    </div>

                    <div className={s.headBtns}>
                        <Button title="Карта" onClick={onOpenMap} className={s.btnGhost} />
                        <Button title="Подробнее" onClick={onDetails} className={s.btnGhost} />
                        {lake.status === 'done' ? (
                            <Button title="Архив" onClick={onOpenArchive} className={s.btnGhost} />
                        ) : null}
                        <Button title="Выйти" onClick={onLeave} className={s.btnDanger} />
                    </div>
                </div>

                <div className={s.progressWrap}>
                    <div className={s.progressTop}>
                        <span>Заполненность</span>
                        <span>
                            {joined}/{lake.capacity} · {percent}%
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
                        {(lakePlan || []).map((p, i) => (
                            <div key={i} className={s.timelineItem}>
                                <div className={s.time}>{p.time_label}</div>
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
                    <div className={s.pinned}>{lake.pinned_text}</div>
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
                                <div className={s.ratingValue}>{lak.organizerRating?.score ?? '—'}</div>
                                <div className={s.ratingMeta}>
                                    <div className={s.ratingSmall}>
                                        метка: {lak.organizerRating?.badge ?? 'нет'}
                                    </div>
                                    <div className={s.ratingSmall}>
                                        {lak.organizerRating?.votes ? `${lak.organizerRating.votes} голосов` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.ratingCard}>
                            <div className={s.ratingLabel}>Участники</div>
                            <div className={s.vibes}>
                                <div className={s.vibe}>👍 <b>{lak.participantVibes?.like ?? 0}</b></div>
                                <div className={s.vibe}>😐 <b>{lak.participantVibes?.ok ?? 0}</b></div>
                                <div className={s.vibe}>👎 <b>{lak.participantVibes?.dislike ?? 0}</b></div>
                            </div>
                        </div>
                    </div>

                    {(lak.ratingTags || []).length ? (
                        <div className={s.tags}>
                            {lak.ratingTags.slice(0, 5).map((t) => (
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
                            <div className={s.blockSub}>{lak.location?.short}</div>
                        </div>

                        <button className={s.linkBtn} onClick={() => setLocOpen((v) => !v)}>
                            {locOpen ? 'Свернуть' : 'Показать детали'}
                        </button>
                    </div>

                    {locOpen ? (
                        <div className={s.locationBody}>
                            <div className={s.locLine}><b>Адрес:</b> {lak.location?.address}</div>
                            <div className={s.locLine}><b>Сбор:</b> {lak.location?.meetup}</div>
                            <div className={s.locLine}><b>Парковка:</b> {lak.location?.parking}</div>

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
                                {lake.status === 'done'
                                    ? 'Архив доступен'
                                    : 'Появится после завершения/во время ивента'}
                            </div>
                        </div>
                        {lake.status === 'done' ? (
                            <button className={s.linkBtn} onClick={onOpenArchive}>Открыть архив</button>
                        ) : null}
                    </div>

                    <div className={s.mediaGrid}>
                        {(lak.mediaPreview || []).slice(0, 4).map((_, i) => (
                            <div key={i} className={s.mediaTile}>preview</div>
                        ))}
                    </div>

                    {lake.status === 'done' ? (
                        <div className={s.actionsRow}>
                            <Button title="Открыть архив" onClick={onOpenArchive} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default LakeCenter