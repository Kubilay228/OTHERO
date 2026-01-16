import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";

function RequireAuth() {
    const { user, loading } = useAuth();
    if (loading) return <div>Проверяем сессию...</div>;
    if (!user) return <Navigate to="/auth" replace />;
    return <Outlet />;
}

function GuestOnly() {
    const { user, loading } = useAuth();
    if (loading) return <div>Проверяем сессию...</div>;
    if (user) return <Navigate to="/" replace />;
    return <Outlet />;
}

const Zero = () => {
    return (
        <div>ПОБЕДИЛДО</div>
    )
}

export function AppRouter() {
    return (
        <Routes>
            {/* Только для гостей */}
            <Route element={<GuestOnly />}>
                <Route path="/auth" element={<Auth />} />
            </Route>

            {/* Только для залогиненных */}
            <Route element={<RequireAuth />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes" element={<NotesPage />} />
            </Route>

            {/* На всё остальное */}
            <Route path="*" element={<Zero />} />
        </Routes>
    );
}