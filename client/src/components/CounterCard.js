import React from 'react'
import {useParams} from 'react-router-dom'

export const CounterCard = ({counter}) => {
    const counterId = useParams().id
    return(
        <>
            <h2>Лічильник</h2>

            <p>Серійний номер: {counter.serial_number} </p>
            <p>Тип : {counter.type_counter}  </p>
            <p><a href={`http://localhost:3000/stats/create/${counterId}`} target= "_blank" rel="noopener noreferrer" >Подати показники</a></p>
            <p><a href={`http://localhost:3000/stats/${counterId}`} target= "_blank" rel="noopener noreferrer" >Показати показники</a></p>

        </>
    )
}
