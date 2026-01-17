import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/providers/auth/AuthProvider"; // путь поправь под себя

export default function useLogIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const log = (e) => setEmail(e.target.value);
    const pas = (e) => setPassword(e.target.value);

    const logIn = async (e) => {
        e.preventDefault();

        console.log("### LOG_IN_HANDLER_V2 FIRED ###");

        try {
            console.log("before login()");
            await login(email, password);
            console.log("after login() - success");

            navigate("/", { replace: true });
            console.log("after navigate()");
        } catch (err) {
            console.log("CATCH ENTERED");
            console.error("LOGIN ERROR:", err);
            alert(err?.message ?? String(err));
        }
    };

    return { email, password, log, pas, logIn };
}