import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface IMusic {
            id: number,
            attributes: {
                title: string,
                link: string,
                favorite: boolean,
                release: string,
                color: string,
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
                createdAt: string,
                updateAt: string,
                publishedAt: string,
                }
            }

}

const Home = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [favoriteMusic, setFavoriteMusic] = useState<IMusic[]>([]);
    const [sortedMusic, setSortedMusic] = useState<IMusic[]>([]);


    useEffect(
        () => {
            const favMusicRequest = async () => {
                try {
                    const response = await fetch('http://localhost:1337/api/musiques?populate=*&filters[favorite][$eq]=true');
                    const data = await response.json();
                    setFavoriteMusic(data.data)
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
                    setSortedMusic(data.data);
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

            try {
                const response = await fetch(`http://localhost:1337/api/musiques/${id}`)
                const data = await response.json()
                window.location.href = data.data.attributes.link

            } catch(error) {
                console.error('Erreur:', error);
            }
    }, [])

    const handleUpdateBtn = useCallback(
      (id: number) => {
        navigate(`/update/${id}`)
      }, [navigate])

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
                        (favMusic) => (
                            <div key={favMusic.id} className="card" onClick={() => handleCardClick(favMusic.id)} style={{backgroundColor: favMusic.attributes.color, color: "white"}}>
                                <h3>{favMusic.attributes.title}</h3>
                                {favMusic.attributes.interpretes.data.map(
                                    (interprete: any) => (
                                        <h4 key={interprete.id}>{interprete.attributes.nom}</h4>
                                    ))
                                }
                                <button className="update-btn" onClick={(e) => {e.stopPropagation(); handleUpdateBtn(favMusic.id)}}>Mettre à jour</button>
                            </div>
                        ))
                    }

                    </div>
                </div>
                <div className="others-music cards-container">
                    <h2>Toutes les musiques</h2>
                    <div className="row">
                        {sortedMusic.map(
                            (sorted) => (
                                <div key={sorted.id} className="card" onClick={() => handleCardClick(sorted.id)} style={{backgroundColor: sorted.attributes.color, color: "white"}}>
                                    <h3>{sorted.attributes.title}</h3>
                                    {sorted.attributes.interpretes.data.map(
                                        (interprete: any) => (
                                            <h4 key={interprete.id}>{interprete.attributes.nom}</h4>
                                        ))}
                                    <button className="update-btn" onClick={(e) => {e.stopPropagation(); handleUpdateBtn(sorted.id)}}>Mettre à jour</button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
