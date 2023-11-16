import React, { useCallback, useEffect, useState } from "react"

const AddSong = () => {

    const [song, setSong] = useState("")
    const [color, setColor] = useState("")
    const [date, setDate] = useState<Date>()
    const [link, setLink] = useState("")
    const [artist, setArtist] = useState([])
    
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

    const handleAddSongClick = async () => {

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
                                <option value={artist.nom}>{artist.nom + artist.prenom}</option>
                            ))}
                    </select>
                    <label htmlFor="chanson">Nom de la chanson</label>
                    <input type="text" name="chanson" onChange={handleSongChange}/>
                    <label htmlFor="color"></label>
                    <input type="color" name="color" onChange={handleColorChange}/>
                    <label htmlFor="year"></label>
                    <input type="date" name="year" onChange={handleDateChange}/>
                    <label htmlFor="link"></label>
                    <input type="text" name="link" onChange={handleLinkChange}/>
                    <button onClick={handleAddSongClick}>Ajouter</button>
                </div>
            </div>
        </>
    )
}

export default AddSong;