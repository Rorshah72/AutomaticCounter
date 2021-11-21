import React, {useState, useContext, useCallback, useEffect} from "react";
import {UseHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {useParams} from 'react-router-dom'
import {Loader} from "../components/Loader"
import {StatsList} from "../components/StatsList"

export const AllStatsPage = () => {

    const {loading, request} = UseHttp()
    const {token} = useContext(AuthContext)
    const [stats, setStats] = useState({
        indicator: "",
        date: "",
        counter: ""
    })

    const fetchStats = useCallback( async () => {
        try {

            const fetched = await request(`/api/stats`,'GET', null,
                {
                    Autherization: `Bearer ${token}`
                })

            setStats(fetched)


        }catch (e) {}
    },[token, request] )

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
