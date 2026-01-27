import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../app/providers/auth/AuthProvider"
import { supabase } from "@/shared/api/supabaseClient"

export default function useLakeMain(lakeId) {
    const { user } = useContext(AuthContext)

    const [lake, setLake] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user?.id || !lakeId) return

        let cancelled = false

        const init = async () => {
            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from("lakes")
                .select("*")
                .eq("id", lakeId)
                .maybeSingle()

            if (cancelled) return

            if (error) {
                setError(error)
                setLake(null)
            }

            setLake(data)
            setLoading(false)
        }

        init()

        return () => {
            cancelled = true
        }
    }, [user?.id, lakeId])

    return { lake, error, loading }
}