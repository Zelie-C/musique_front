import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [musicData, setMusicData] = useState([])
    const [artistData, setArtistData] = useState([])

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

    useEffect(() => {
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
                    {musicData.map(
                        (data: any) => (
                            <div key={data.id} className="card" onClick={handleCardClick} style={{backgroundColor: data.color}}>
                                <h3>{data.title}</h3>

                                {data.interpretes.data.map(
                                    (interprete: any) => (
                                        <h4 key={interprete.id}>{interprete.attributes.nom}</h4>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;