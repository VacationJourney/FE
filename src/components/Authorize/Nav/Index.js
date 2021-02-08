import React from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import Menu from './Menu'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Hidden } from '@material-ui/core'
import '../../Style/Vacation.css'
import JCost from '../../../assets/J.png'

const NavBar = ({ picture }) => {
    let { url } = useRouteMatch();
    const history = useHistory();
    const { logout } = useAuth0();

    const exit = () => {
        
        logout({
            returnTo: window.location.origin,
        })
        // history.push('/');
        // clear();
    };
    return (
        <div className='navbar'>
            <Link className='logoAnchor' to={ `${url}` }>
                <img src={ JCost } className='journeyCostLogo' alt="Journey Co$t Logo" />
            </Link>
            <div className='menu'>
                <img
                    src={ picture }
                    alt="Profile"
                    className='userImage'

                />
                <Hidden style={{margin: '3%'}} smDown>
                    <HomeIcon  className="menuItem"  onClick={ () => history.push('/vacations') } fontSize='large'></HomeIcon>
                    <ExitToAppIcon className="menuItem"  onClick={ exit } fontSize='large' />
                </Hidden>
                <Hidden mdUp>
                    <Menu exit={ exit } />
                </Hidden>
            </div>
        </div>
    )
}

export default NavBar;