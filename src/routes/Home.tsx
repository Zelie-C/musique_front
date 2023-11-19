import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const Home = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [musicData, setMusicData] = useState<IMusic[]>([]);
    const [favoriteMusic, setFavoriteMusic] = useState([]);
    const [sortedMusic, setSortedMusic] = useState([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);



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
            const favMusicRequest = async () => {
                try {
                    const response = await fetch('http://localhost:1337/api/musiques?populate=*&filters[favorite][$eq]=true');
                    const data = await response.json();
                    const favMusic = data.data.map(
                        (favMusic: any) => ({...favMusic.attributes})
                        )
                    setFavoriteMusic(favMusic)
                } catch(error) {
                    console.error('Erreur', error);
                }
            }
            favMusicRequest()
    }, [])


    useEffect(
        () => {
            const musicAlphaSortRequest = async () => {
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
            musicAlphaSortRequest();
    }, [])

    const handleAddBtnClick = () => {
        navigate('/add');
    }

    const handleCardClick = useCallback(
        async (id: number) => {
            setSelectedId(id);
            try {
                const response = await fetch(`http://localhost:1337/api/musiques?filters[id][$eq]=${selectedId}`)
                const data = await response.json()
                console.log('API Response:', data);
                console.log(data)
                if (data.data && data.data.attributes) {
                window.open(data.data.attributes.link, "_blank")
                } else {
                    console.error('pas de données')
                }
            } catch(error) {
                console.error('Erreur:', error);
            }
    }, [selectedId])

    return (
        <>
            <div>
                <div className="title-container">
                    <h1>Hello {params.username}</h1>
                    <button className="add-btn" onClick={handleAddBtnClick}>+</button>
                </div>
                <div className="favorite-music cards-container">
                    <h2>Musiques préférées</h2>
                    <div className="row">
                    {favoriteMusic.map(
                        (favMusic: any) => (
                            <div key={favMusic.id} className="card" onClick={() => handleCardClick(favMusic.id)} style={{backgroundColor: favMusic.color, color: "white"}}>
                                <h3>{favMusic.title}</h3>
                                {favMusic.interpretes.data.map(
                                    (interprete: any) => (
                                        <h4 key={interprete.id}>{interprete.attributes.nom}</h4>
                                    ))
                                }
                                <button className="update-btn">Mettre à jour</button>
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
                                <div key={sorted.id} className="card" onClick={() => handleCardClick(sorted.id)} style={{backgroundColor: sorted.color, color: "white"}}>
                                    <h3>{sorted.title}</h3>
                                    {sorted.interpretes.data.map(
                                        (interprete: any) => (
                                            <h4 key={interprete.id}>{interprete.attributes.nom}</h4>
                                        ))}
                                    <button className="update-btn">Mettre à jour</button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
