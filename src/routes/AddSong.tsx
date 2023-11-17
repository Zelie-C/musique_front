import React, { useCallback, useEffect, useState } from "react"

const AddSong = () => {

    const [artist, setArtist] = useState([])
    const [selectedArtist, setSelectedArtist] = useState<number>(0)
    const [song, setSong] = useState("")
    const [color, setColor] = useState("")
    const [date, setDate] = useState<Date>()
    const [link, setLink] = useState("")
    const [favorite, setFavorite] = useState<boolean>(false)
    
    useEffect(
        () => {
            const allPerformerRequest = async () => {
                try {
                    const response = await fetch('http://localhost:1337/api/interpretes?populate=nom')
                    const data = await response.json()
                    const dataArtist = data.data.map(
                        (artist: any) => ({...artist.attributes}) 
                    )
                    setArtist(dataArtist);
                } catch(error) {
                    console.log('Erreur', error)
                }
            }
            allPerformerRequest();
        }, [])

    const handleArtistChange = useCallback(
        (e: React.ChangeEvent<HTMLOptionElement>) => {
            setSelectedArtist(parseInt(e.target.value))
        }, [])

    const handleSongChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSong(e.target.value)
        }, [])

    const handleColorChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setColor(e.target.value)
        }, [])

    const handleDateChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newDate = new Date(e.target.value)
            setDate(newDate)
    }, [])

    const handleLinkChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setLink(e.target.value)
        }, [])

    const handleFavoriteChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFavorite(e.target.checked)
        }, [])
    
    const handleAddSongClick = async () => {
        try {
            const response = await fetch('http://localhost:1337/api/musiques', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "data": {
                        "title": {song},
                        "link": {link},
                        "interpretes": [selectedArtist],
                        "favorite": {favorite},
                        "release": {date},
                        "color": {color}
                    }
                })
            });
            const data = await response.json()
        } catch(error) {
            console.log('Erreur', error)
        }
    }
    
    return (
        <>
            <div className="add-container">
                <h1>Ajouter une chanson</h1>
                <div className="add-form">
                    <label htmlFor="performer"></label>
                    <select name="performer">
                        <option value="default">Selectionner un ou une interprète</option>
                        {artist.map(
                            (artist: any) => (
                                <option value={artist.id} onChange={handleArtistChange}>{artist.nom}</option>
                            ))}
                    </select>
                    <label htmlFor="chanson">Nom de la chanson</label>
                    <input type="text" name="chanson" onChange={handleSongChange}/>
                    <label htmlFor="color"></label>
                    <input type="color" name="color" onChange={handleColorChange}/>
                    <label htmlFor="date"></label>
                    <input type="date" name="date" onChange={handleDateChange}/>
                    <label htmlFor="link">Lien de la chanson</label>
                    <input type="text" name="link" onChange={handleLinkChange}/>
                    <div className="checkbox-container">
                    <label htmlFor="checkbox">Favori</label>
                    <input type="checkbox" name="checkbox" checked={favorite} onChange={handleFavoriteChange}/>
                    </div>
                    <button onClick={handleAddSongClick}>Ajouter</button>
                </div>
            </div>
        </>
    )
}

export default AddSong;