import React from 'react'

import Menu from './Menu'

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    navbar: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
}))

const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.navbar}>
           
            <Menu />
        </div>
    )
}

export default NavBar
