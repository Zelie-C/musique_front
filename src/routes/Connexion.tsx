import React, { useCallback, useState } from "react"
import '../index.css'
import { useNavigate } from "react-router-dom";

const Connexion = () => {

    const navigate = useNavigate();
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

    

    const handleConnexionClick = useCallback(
        async () => {
            try {
                const response = await fetch('http://localhost:1337/api/auth/local', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "identifier": username,
                        "password": password
                    })
                });
                const data = await response.json()
                navigate("/home/" + username)
            } catch (error) {
                console.error('Erreur lors de la requête:', error);
                
            }
        }, [username, password])
   
    return (
        <>
            <div className="connexion-container">
                <div>
                    <h1>Connexion</h1>
                </div>
                <div className="container ">
                    <label htmlFor="username">Login</label>
                    <input type="text" name="username" onChange={handleUsernameChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handlePasswordChange}/>
                    <button onClick={handleConnexionClick}>Se connecter</button>
                </div>
            </div>
        </>
    )

}

export default Connexion;