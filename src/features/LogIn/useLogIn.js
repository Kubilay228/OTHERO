import { useContext, useState } from "react";
const {
    login
} = useContext(AuthContext)
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)

const log = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
}

const pas = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
}

const logIn = () => {
    e.preventDefault()
    login(email, password)
}

export default { log, pas, logIn }