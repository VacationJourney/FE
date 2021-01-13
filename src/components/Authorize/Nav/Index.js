import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Menu from './Menu'

import '../../Style/Vacation.css'
import JCost from '../../../assets/J.png'

const NavBar = ({picture}) => {
    let { url } = useRouteMatch();
    return (
        <div className='navbar'>
            <Link className='logoAnchor' to={`${url}`}>
                <img src={JCost} className='journeyCostLogo' alt="Journey Co$t Logo"/>
            </Link>
            <div className='menu'>
            <img
            src={picture}
            alt="Profile"
            style={{width: 40, borderRadius: '50%', marginTop: 3}}
          />
                <Menu />
            </div>
        </div>
    )
}

export default NavBar;