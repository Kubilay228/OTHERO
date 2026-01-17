import { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../../../shared/API/supabaseClient";
import useLogIn from "../../../features/LogIn/useLogIn";

export const AuthContext = createContext({})

const AuthProvider = (props) => {
    const { children } = props

    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        let unsub;

        const init = async () => {
            setLoading(true);
            const { data } = await supabase.auth.getSession();
            const s = data?.session ?? null;
            setSession(s);
            setUser(s?.user ?? null);
            setLoading(false);
        };

        init();

        const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession ?? null);
            setUser(newSession?.user ?? null);
            setLoading(false);
        });

        unsub = () => sub?.subscription?.unsubscribe?.();

        return () => unsub();
    }, []);

    const value = useMemo(
        () => ({
            session,
            user,
            loading,
            login: async (email, password) => {
                const { error } = await supabase.auth.signInWithPassword({ email, password })
                if (error) throw error
            },
            logout: async () => {
                const { error } = await supabase.auth.signOut();
                if (error) throw error
            },
        }),
        [session, user, loading]
    )

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider