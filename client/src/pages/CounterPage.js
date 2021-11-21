import React, {useState, useCallback, useContext, useEffect} from "react";
import {useParams} from 'react-router-dom'
import {UseHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from "../components/Loader"
import {CounterCard} from  "../components/CounterCard"

export const CounterPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = UseHttp()
    const [counter, setCounter] = useState({
        serial_number: "",
        type_counter: "",
    })
    const counterId = useParams().id

    


    const getCounter = useCallback(async () => {
        try {

            const fetched = await request(`/api/counter/${counterId}`,'GET', null,
                {
                    Autherization: `Bearer ${token}`
                })

            setCounter(fetched)

        }catch (e) {}
    },[token, counterId, request])

    useEffect(() => {
        getCounter()
    }, [getCounter])

    if(loading){
        return <Loader/>
    }

    return(
        <>
            { !loading && counter && <CounterCard counter = {counter}/>}
        </>
    )
}
