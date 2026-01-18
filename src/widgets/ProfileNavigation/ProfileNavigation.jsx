import { useContext } from "react";
import useUserCard from "../../shared/API/useUserCard";
import InteractiveButton from "../../shared/UI/InteractiveButton";
import s from "./ProfileNavigation.module.scss";
import { AuthContext } from "../../app/providers/auth/AuthProvider";

const ProfileNavigation = () => {
    const { user } = useContext(AuthContext);

    const navigations = [
        { label: "Home", icon: "home" },
        { label: "Profile", icon: "user" },
        { label: "Messages", icon: "tg" },
        { label: "Notifications", icon: "notification" },
    ];

    const {
        userLabel,
        userDescription,
        userAvatar,
        userBackground,
        loading,
        error,
    } = useUserCard(user?.id);

    return (
        <div className={s.container}>
            <div className={s.profileBox}>
                {!user ? (
                    <div className={s.userInfo}>
                        <h1>Гость</h1>
                        <p>Войдите, чтобы увидеть профиль</p>
                    </div>
                ) : loading ? (
                    <div className={s.userInfo}>
                        <h1>Загрузка...</h1>
                        <p>Подтягиваем данные профиля</p>
                    </div>
                ) : error ? (
                    <div className={s.userInfo}>
                        <h1>Ошибка</h1>
                        <p>Не удалось загрузить профиль</p>
                    </div>
                ) : (
                    <>
                        <div
                            className={s.background}
                            style={{
                                "--profile-bg": userBackground
                                    ? `url(/icons/${userBackground}.jpg)`
                                    : "none",
                            }}
                        >
                            {userAvatar ? (
                                <img src={`/icons/${userAvatar}.jpg`} className={s.profile} />
                            ) : null}
                        </div>

                        <div className={s.userInfo}>
                            <h1>{userLabel}</h1>
                            <p>{userDescription}</p>
                        </div>
                    </>
                )}
            </div>

            <nav className={s.navigationBox}>
                {navigations.map((navigation, index) => (
                    <InteractiveButton
                        key={index}
                        label={navigation.label}
                        icon={navigation.icon}
                        className={s["navigation-button"]}
                    />
                ))}
            </nav>
        </div>
    );
};

export default ProfileNavigation;