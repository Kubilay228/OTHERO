import { useState } from "react"

export const useLakeFilters = () => {
    const [selectedStatuses, setSelectedStatuses] = useState(["prep", "live"])
    const [selectedFill, setSelectedFill] = useState(["available"])
    const [selectedTags, setSelectedTags] = useState([])
    const [minAge, setMinAge] = useState(18)
    const [maxAge, setMaxAge] = useState(30)

    // Переключение статуса
    const toggleStatus = (value) => {
        setSelectedStatuses((prev) => {
            if (prev.includes(value)) {
                return prev.filter((status) => status !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    // Переключение заполненности
    const toggleFill = (value) => {
        setSelectedFill((prev) => {
            if (prev.includes(value)) {
                return prev.filter((status) => status !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    // Переключение тегов
    const toggleTag = (value) => {
        setSelectedTags((prev) => {
            if (prev.includes(value)) {
                return prev.filter((tag) => tag !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    // Проверка, выбран ли статус
    const isStatusOn = (value) => selectedStatuses.includes(value)
    const isFillOn = (value) => selectedFill.includes(value)
    const isTagOn = (value) => selectedTags.includes(value)

    return {
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
    }
}