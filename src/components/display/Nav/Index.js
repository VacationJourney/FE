import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import User from './User'
import '../../Style/Vacation.css'
import JCost from '../../../assets/J.png'

const NavBar = () => {
    return (
        <div className='navbar'>
            <Link className='logoAnchor' to="/dashboard">
                <img src={JCost} className='journeyCostLogo' alt="Journey Co$t Logo"/>
            </Link>
            <div className='menu'>
                <User />
                <Menu />
            </div>
        </div>
    )
}

export default NavBar
