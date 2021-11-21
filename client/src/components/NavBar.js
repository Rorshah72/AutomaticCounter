import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"

export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    return (
        <nav>
            <div className="nav-wrapper grey darken-1" style={{ padding: '0 2rem' }}>
                <span className="brand-logo red-text">Automatic Counter</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/basket">List Counter</NavLink></li>
                    <li><NavLink to="/counter/create">Add Counter</NavLink></li>
                    <li><NavLink to="/stats">History of indicators</NavLink></li>                    
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}
