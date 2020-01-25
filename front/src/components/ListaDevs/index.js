import React, { useEffect, useState } from 'react';
import '../../Styles/Main.css'
import api from '../../services/api'

export default function ListaDevs() {
    const [devs, setDevs] = useState([])

    //BUSCANDO DEVS
    useEffect(() => {
        async function loadDevs() {
            const resp = await api.get('/devs');

            setDevs(resp.data)
        }
        loadDevs();
    }, [])
    return (
        <main>
            <ul>
                {
                    devs.map(dev =>
                        <li className="dev-item" key={dev._id}>
                            <header>
                                <img src={dev.avatar_url} alt={dev.name} />
                                <div className="user-info">
                                    <strong>{dev.name}</strong>
                                    <span>{dev.techs.join(', ')}</span>

                                </div>
                            </header>
                            <p>{dev.bio}</p>
                            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
                        </li>)
                }

            </ul>
        </main>
    );
}
