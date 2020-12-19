import React from 'react'

import Menu from './Menu'
import User from './User'
import '../../Style/Vacation.css'

const NavBar = () => {
    return (
        <div className='navbar'>
           <User />
            <Menu />
        </div>
    )
}

export default NavBar
