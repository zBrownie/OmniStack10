import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'



export default function Main({ navigation }) {
    const [position, setPosition] = useState(null)
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState('')

    //PEGANDO CORDENADA GPS
    useEffect(() => {
        async function initPosition() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    //PRA FUNCIONAR PRECISA DE GPS LIGADO
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords

                setPosition({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
        initPosition()

    }, [])

    function positionChanged(region) {
        //QUANDO USUARIO MUDA A REGIAO NO MAPA ( ARRASTANDO A TELA) ESSA FUNÇÂO DEVOLVE A COORDENADA DA REGIAO
        setPosition(region)
    }

    //NAO MOSTRA MAP ATE PEGA COORDENADA
    if (!position) {
        return null;
    }

    //CARREGANDO DEVS CADASTRADOS
    async function loadDevs() {
        const { latitude, longitude } = position;

        const resp = await api.get('/search', {
            params: {
                longitude,
                latitude,
                techs
            }
        })

        console.log(resp.data)
        setDevs(resp.data.devs)
    }

    return <>

        <MapView style={styles.map} initialRegion={position} onRegionChange={positionChanged}>
            {
                devs.map(item =>
                    <Marker coordinate={{ latitude: item.location.coordinates[1], longitude: item.location.coordinates[0] }} key={item._id}>
                        <Image style={styles.avatar} source={{ uri: item.avatar_url }} />


                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: item.github_username })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devname}>{item.name}</Text>
                                <Text style={styles.bio}>{item.bio === null ? 'Sem bio' : item.bio}</Text>
                                <Text style={styles.techs}>
                                    {
                                        item.techs.join(', ')
                                    }
                                </Text>
                            </View>
                        </Callout>

                    </Marker>)
            }
        </MapView>

        <View style={styles.form}>

            <TextInput style={styles.input}
                placeholder="Buscar devs por techs"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false} 
                value={techs}
                onChangeText={setTechs}/>

            <TouchableOpacity style={styles.button} onPress={loadDevs}>
                <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>
        </View>

    </>

}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54
    },
    callout: {
        width: 260,

    },
    devname: {
        fontWeight: 'bold',
        fontSize: 16
    },
    techs: {
        marginTop: 5
    },
    bio: {
        color: '#666',
        marginTop: 5
    },
    form: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        elevation: 6
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})