import React from "react"
import {Link} from "react-router-dom"

export const StatsList = ({stats}) => {
    if (!stats.length) {
        return <p className = "center"> Історія подачі показників пуста</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Показник</th>
                <th>Дата подачі</th>
                <th>Подати показник</th>
            </tr>
            </thead>

            <tbody>
            {stats.map((stats, index) => {
                return (
                    <tr key={stats._id}>
                        <td>{index + 1}</td>
                        <td>{stats.indicator}</td>
                        <td>{stats.date}</td>
                        <td>
                            <Link to = {`/stats/create/${stats.counter}`}>Подати показник</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
