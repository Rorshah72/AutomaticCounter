import React from "react"
import {Link} from "react-router-dom"

export const CounterList = ({counter}) => {
    if (!counter.length) {
        return <p className = "center"> Список лічильників</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Серійний номер </th>
                <th>Тип </th>
                <th>Докладніше про лічильник</th>
                <th>Показати показники</th>
            </tr>
            </thead>

            <tbody>

            {counter.map((counter, index) => {

                return (
                    <tr key={counter._id}>

                        <td>{index + 1}</td>
                        <td>{counter.serial_number}</td>
                        <td>{counter.type_counter}</td>
                        <td>
                            <Link to = {`/counter/${counter._id}`}>Докладніше про лічильник</Link>
                        </td>
                        <td>
                            <Link to = {`/stats/${counter._id}`}>Показати показники</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
