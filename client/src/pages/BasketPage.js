import React, {useState, useContext, useCallback, useEffect} from "react";
import {UseHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {useParams} from 'react-router-dom'
import {Loader} from "../components/Loader"
import {CounterList} from "../components/CounterList"

export const BasketPage = () => {

    const {loading, request} = UseHttp()
    const {token} = useContext(AuthContext)
    const [counter, setCounter] = useState({
        serial_number: "",
        type_counter: ""

    })

    const fetchCounter = useCallback( async () => {
        try {

            const fetched = await request(`/api/counter`,'GET', null,
                {
                    Autherization: `Bearer ${token}`
                })

            setCounter(fetched)
            


        }catch (e) {}
    },[token, request] )

    useEffect(() => {
        fetchCounter()
    },[fetchCounter])


    if(loading) {
        return <Loader/>
    }
    return(
        <>
            {!loading && <CounterList counter = { counter }/>}
        </>
    )
}
