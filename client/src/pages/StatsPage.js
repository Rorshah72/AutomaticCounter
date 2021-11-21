import React, {useState, useContext, useCallback, useEffect} from "react";
import {UseHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {useParams} from 'react-router-dom'
import {Loader} from "../components/Loader"
import {StatsList} from "../components/StatsList"

export const StatsPage = () => {
    const statsId =  useParams().id
    const {loading, request} = UseHttp()
    const {token} = useContext(AuthContext)
    const [stats, setStats] = useState({
        indicator: "",
        date: "",
        counter: ""
    })

    const fetchStats = useCallback( async () => {
        try {

            const fetched = await request(`/api/stats/${statsId}`,'GET', null,
                {
                    Autherization: `Bearer ${token}`
                })

            setStats(fetched)


        }catch (e) {}
    },[token, request, statsId] )

    useEffect(() => {
        fetchStats()
    },[fetchStats])


    if(loading) {
        return <Loader/>
    }
    return(
        <>
            {!loading && <StatsList stats = { stats }/>}
        </>
    )
}
