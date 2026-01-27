import { useEffect, useState, useContext } from "react";
import { supabase } from "../../../shared/API/supabaseClient";
import { AuthContext } from "../../../app/providers/auth/AuthProvider";

export default function useGroupProfiles() {
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [groupProfiles, setGroupProfiles] = useState([])

    useEffect(() => {
        if (!(user?.id)) return
        const init = async () => {
            setLoading(true)

            const { data, error } = await supabase.rpc('get_my_group_members')

            if (error) {
                setError(error)
                setLoading(false)
                return
            }

            setGroupProfiles(data ?? [])
            setLoading(false)
        }
        init()
    }, [user])

    return {
        error,
        loading,
        groupProfiles,
    }
}