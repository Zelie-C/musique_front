import React, { useCallback, useState } from "react"

const Connexion = () => {

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleUsernameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
        }, []
    )

    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
        }, []
    ) 

    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={handleUsernameChange}/>
                <label htmlFor="password"></label>
                <input type="password" name="password" onChange={handlePasswordChange}/>
            </div>
        </>
    )

}

export default Connexion;