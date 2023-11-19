import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export interface IArtist {
  id: number,
  attributes: {
    nom: string,
    prenom: string | null,
    naissance: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
  }
}

const AddSong = () => {
    const navigate = useNavigate();
    const [artist, setArtist] = useState<IArtist[]>([])
    const [selectedArtist, setSelectedArtist] = useState<number>(0)
    const [song, setSong] = useState("")
    const [color, setColor] = useState("")
    const [date, setDate] = useState<string>("")
    const [link, setLink] = useState("")
    const [favorite, setFavorite] = useState<boolean>(false)

    useEffect(
        () => {
            const allPerformerRequest = async () => {
                try {
                    const response = await fetch('http://localhost:1337/api/interpretes?populate=nom')
                    const data = await response.json()
                    setArtist(data.data);
                } catch(error) {
                    console.log('Erreur', error)
                }
            }
            allPerformerRequest();
        }, [])

    const handleArtistChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
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
            setDate(e.target.value)
            console.log(date)
    }, [date])

    const handleLinkChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setLink(e.target.value)
        }, [])

    const handleFavoriteChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFavorite(e.target.checked)
        }, [])

    const handleAddSongClick = useCallback(async () => {
            const response = await fetch('http://localhost:1337/api/musiques', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "data": {
                        "title": song,
                        "link": link,
                        "interpretes": selectedArtist,
                        "favorite": favorite,
                        "release": date,
                        "color": color
                    }
                })
            });
            const data = await response.json()
            if (data.data.id){
              navigate('/home/')
              } else {
              setSelectedArtist(0)
              setSong('')
              setColor('')
              setDate('')
              setLink('')
              setFavorite(false)
        }
    }, [selectedArtist, song, color, date, favorite, link, navigate])

    return (
        <>
            <div className="add-container">
                <h1>Ajouter une chanson</h1>
                <div className="add-form">
                    <label htmlFor="performer"></label>
                    <select name="performer" onChange={handleArtistChange}>
                        <option value="default">Selectionner un ou une interprète</option>
                        {artist.map(
                            (artist: any) => (
                                <option key={artist.id} value={artist.id}>{artist.id} - {artist.attributes.nom}</option>
                            ))}
                    </select>
                    <label htmlFor="chanson">Nom de la chanson</label>
                    <input type="text" name="chanson" onChange={handleSongChange} className="input-form"/>
                    <label htmlFor="color">Couleur de la chanson</label>
                    <input type="color" name="color" onChange={handleColorChange} className="input-form input-color"/>
                    <label htmlFor="date">Date de sortie</label>
                    <input type="date" name="date" value={date} onChange={handleDateChange} className="input-form"/>
                    <label htmlFor="link">Lien de la chanson</label>
                    <input type="text" name="link" onChange={handleLinkChange} className="input-form"/>
                    <div className="checkbox-container">
                    <label htmlFor="checkbox">Favori</label>
                    <input type="checkbox" name="checkbox" checked={favorite} onChange={handleFavoriteChange} className="input-form"/>
                    </div>
                    <button onClick={handleAddSongClick}>Ajouter</button>
                </div>
            </div>
        </>
    )
}

export default AddSong;
