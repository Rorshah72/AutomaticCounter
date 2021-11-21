import React, {useState, useEffect, useContext} from "react";
import {UseHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {UseMessage} from "../hooks/message.hook"
import {useHistory, useParams} from "react-router-dom"


export const CreateStatsPage = () => {

    const statsId =  useParams().id
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request, loading, error, clearError} = UseHttp()
    const message = UseMessage()

  //  setForm({ ...form, counterId: statsId})
    const [form, setForm] = useState({
        indicator: '',
        counterId: statsId
    })


    useEffect(() => {

          window.M.updateTextFields()
   },[])


    useEffect( () => {
        message(error)
        clearError()

    }, [error, message,clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createHandler = async event => {
        try {

            const data = await request('/api/stats/generate', 'POST', {...form}, {  Autherization: `Bearer ${auth.token}`})
            console.log({data})
            history.push(`/stats/${data.stats.counter}`)
        }catch (e) {}

    }




return(
        <div className = "row">
            <div className= ".col.s6.offset-s3">
                <h1>Automatic Counter</h1>
                <div className="card grey darken-3">
                    <div className="card-content red-text">
                        <span className="card-title">Create Counter</span>
                        <div>

                            <div className="input-field ">
                                <input
                                    placeholder="Введіть показник лічильника"
                                    id="indicator"
                                    type="text"
                                    name= "indicator"
                                    className= "red-input"
                                    value={form.indicator}
                                    onChange= {changeHandler}
                                />
                                <label htmlFor="indicator">Показник</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className= "btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={createHandler}
                            disabled={loading}
                        >
                            Подати показник
                        </button>

                    </div>
                </div>
            </div>
        </div>

    )
}
