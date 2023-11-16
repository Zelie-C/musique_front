import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [musicData, setMusicData] = useState([]);
    const [favoriteMusic, setFavoriteMusic] = useState([]);
    const [sortedMusic, setSortedMusic] = useState([]);

    interface IMusic {
        data: [
            {
                id: number,
                attributes: {
                    title: string,
                    link: string,
                    favorite: boolean,
                    release: string,
                    color: string,
                    createdAt: string,
                    updateAt: string,
                    publishedAt: string,
                    interpretes: {
                        data: [
                            {
                            id: number,
                            attributes: {
                                nom: string,
                                prenom: string | null,
                                naissance: string,
                                createdAt: string,
                                updateAt: string,
                                publishedAt: string,
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }

    useEffect(
        () => {
        const musicUserRequest = async () => {
            try {
            const response = await fetch('http://localhost:1337/api/musiques?populate=*');
            const data = await response.json();
            const musicData = data.data.map(
                (music: any) => ({...music.attributes, id: music.id})
            )
            setMusicData(musicData)
            console.log("state", musicData)
            } catch(error) {
                console.error('Erreur', error);
            }
        }
        musicUserRequest();
    }, [])

    useEffect(
        () => {
            let fav = musicData.filter(
                (music: any) =>
                    music.favorite === true)
                console.log("var:", fav)
            setFavoriteMusic(fav);
            console.log('fav:', favoriteMusic)
        }, [musicData])

    useEffect(
        () => {
            const musicAlphaSort = async () => {
                try {
                    const response = await fetch('http://localhost:1337/api/musiques?populate=*&sort=title:asc');
                    const data = await response.json();
                    const alphaSort = data.data.map(
                        (musicSorted: any) => ({...musicSorted.attributes})
                    )
                    setSortedMusic(alphaSort);
                } catch(error) {
                    console.error('Erreur', error);
                    
                }
            }
            musicAlphaSort();
    }, [sortedMusic])
    
    const handleCardClick = () => {
        navigate
    }

    return (
        <>
            <div>
                <div className="title-container">
                    <h1>Hello {params.username}</h1>
                </div>
                <div className="favorite-music cards-container">
                    <h2>Musiques préférées</h2>
                    <div className="row">
                    {favoriteMusic.map(
                        (favMusic: any) => (
                            <div key={favMusic.id} className="card" onClick={handleCardClick}>
                                <h3>{favMusic.title}</h3>
                                {favMusic.interpretes.data.map(
                                    (interprete: any) => (
                                        <h4 key={interprete.id}>{interprete.attributes.nom}</h4>
                                    ))
                                }
                            </div>
                        ))
                    }
                    
                    </div>
                </div>
                <div className="others-music cards-container">
                    <h2>Toutes les musiques</h2>
                    <div className="row">
                        {sortedMusic.map(
                            (sorted: any) => (
                                <div key={sorted.id} className="card" onClick={handleCardClick}>
                                    <h3>{sorted.title}</h3>
                                    {sorted.interpretes.data.map(
                                        (interprete: any) => (
                                            <h4 key={interprete.id}>{interprete.attributes.nom}</h4>
                                        ))}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;