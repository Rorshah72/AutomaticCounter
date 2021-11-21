import React, {useState, useEffect, useContext} from "react";
import {UseHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {UseMessage} from "../hooks/message.hook"
import {useHistory} from "react-router-dom"


export const CreateCounterPage = () => {


    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request, loading, error, clearError} = UseHttp()
    const message = UseMessage()

    const [form, setForm] = useState({
        serial_number: '',
        type_counter: ''
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

            const data = await request('/api/counter/generate', 'POST', {...form}, {  Autherization: `Bearer ${auth.token}`})
            history.push(`/counter/${data.counter._id}`)
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
                                    placeholder="Введіть серійни номер вашого лічильник"
                                    id="serial_number"
                                    type="text"
                                    name= "serial_number"
                                    className= "red-input"
                                    value={form.serial_number}
                                    onChange= {changeHandler}
                                />
                                <label htmlFor="serialNumber">Серійний номер</label>
                            </div>

                            <div className="input-field ">
                                <input
                                    placeholder="Введіть тип лічильника"
                                    id="type_counter"
                                    type="text"
                                    name= "type_counter"
                                    className= "red-input"
                                    value={form.type_counter}
                                    onChange= {changeHandler}
                                />
                                <label htmlFor="typeCounter">Тип лічильника</label>
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
                            Добавти лічильник
                        </button>

                    </div>
                </div>
            </div>
        </div>

    )
}
