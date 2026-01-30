import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../app/providers/auth/AuthProvider"
import { supabase } from "@/shared/api/supabaseClient"

export default function useLakePlan(lakeId) {
    const { user } = useContext(AuthContext)

    const [lakePlan, setLakePlan] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user?.id || !lakeId) return

        let cancelled = false

        const init = async () => {
            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from("lake_plan_items")
                .select("*")
                .eq("lake_id", lakeId)
                .order("sort_order", { ascending: true })
                .order("created_at", { ascending: true })
            if (cancelled) return

            if (error) {
                setError(error)
                setLakePlan(null)
            }

            setLakePlan(data)
            setLoading(false)
        }

        init()

        return () => {
            cancelled = true
        }
    }, [user?.id, lakeId])

    return { lakePlan }
}