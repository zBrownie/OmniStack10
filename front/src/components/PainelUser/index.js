import React,{useState,useEffect} from 'react';

import '../../Styles/Sidebar.css'
import api from '../../services/api'

export default function PainelUser() {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [techs, setTechs] = useState('')
    const [username, setUsername] = useState('')
    //PEGANDO CORDENADAS
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude)
                setLongitude(longitude)
            },
            err => {
                console.log("ERRO GEOLOCATION", err)
            },
            {
                timeout: 30000
            }
        )
    }, [])

    //CADASTRANDO DEV
    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/devs', {
            github_username: username,
            techs,
            latitude,
            longitude
        })

        setTechs('')
        setUsername('')
    }

    return ( 
        <aside>
            <strong>Cadastrar</strong>
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label htmlFor="username_github">Usuario Github</label>
                    <input id="username_github" name="username_github" value={username}
                        onChange={e => setUsername(e.target.value)}
                        required />
                </div>
                <div className="input-block">
                    <label htmlFor="techs">Tecnologias</label>
                    <input id="techs" name="techs"
                        value={techs}
                        onChange={e => setTechs(e.target.value)}
                        required />
                </div>

                <div className="input-group">
                    <div className="input-block">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            type="number"
                            id="latitude"
                            name="latitude"
                            value={latitude}
                            onChange={e => setLatitude(e.target.value)} required />
                    </div>
                    <div className="input-block">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            type="number"
                            id="longitude"
                            name="longitude"
                            value={longitude}
                            onChange={e => setLongitude(e.target.value)} required />
                    </div>
                </div>

                <button type="submit">Salvar</button>
            </form>
        </aside>
    );
}