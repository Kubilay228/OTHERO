import { Routes, Route, Navigate, Outlet } from "react-router-dom"

import Auth from "../../pages/Auth/Auth"
import { useContext } from 'react'
import { AuthContext } from "../providers/auth/AuthProvider"

// Заглушки страниц (можешь заменить на свои)
const HomePage = () => <div>HOME (protected)</div>
const NotesPage = () => <div>NOTES (protected)</div>
const Zero = () => <div>404 / NO ROUTE</div>



function RequireAuth({ user, loading }) {
    if (loading) return <div>Проверяем сессию...</div>
    if (!user) return <Navigate to="/auth" replace />
    return <Outlet />
}

function GuestOnly({ user, loading }) {
    if (loading) return <div>Проверяем сессию...</div>
    if (user) return <Navigate to="/" replace />
    return <Outlet />
}

export function AppRouter() {

    const {
        user,
        loading,
    } = useContext(AuthContext)

    

    return (
        <Routes>
            {/* Только для гостей */}
            <Route element={<GuestOnly user={user} loading={loading} />}>
                <Route path="/auth" element={<Auth />} />
            </Route>

            {/* Только для залогиненных */}
            <Route element={<RequireAuth user={user} loading={loading} />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes" element={<NotesPage />} />
            </Route>

            {/* На всё остальное */}
            <Route path="*" element={<Zero />} />
        </Routes>
    )
}