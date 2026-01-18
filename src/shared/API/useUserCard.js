import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function useUserCard(id) {
    const [userLabel, setUserLabel] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [userBackground, setUserBackground] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        let ignore = false;

        const init = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("profiles")
                .select("display_name,bio,avatar_url,background_url")
                .eq("id", id)
                .maybeSingle();

            if (ignore) return;

            if (error) {
                setError(error);
                setLoading(false);
                return;
            }

            if (!data) {
                // не найдено — не ошибка
                setUserLabel("");
                setUserDescription("");
                setUserAvatar("");
                setUserBackground("");
                setLoading(false);
                return;
            }

            setUserLabel(data.display_name ?? "");
            setUserDescription(data.bio ?? "");
            setUserAvatar(data.avatar_url ?? "");
            setUserBackground(data.background_url ?? "");
            setLoading(false);
        };

        init();

        return () => {
            ignore = true;
        };
    }, [id]);

    return {
        userLabel,
        userDescription,
        userAvatar,
        userBackground,
        loading,
        error,
    };
}