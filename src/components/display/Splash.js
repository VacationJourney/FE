import React, { useState} from 'react';
// import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Login from '../auth/Login';

// import { useStyles } from '../../Style/Styles';
import { Typography, Button, SwipeableDrawer,  makeStyles } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Flight from '../../assets/flight.jpg';


const useStyles = makeStyles(() => ({
	splash: {
		backgroundImage: `url(${Flight})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
	appName: {
		marginTop: 100,
		color: 'white',
		fontWeight: 'bold'
	},
	
}));

 
const Splash = () => {
	const classes = useStyles();
	const [state, setState] = useState(false);

	const toggleDrawer = (anchor, open) => (event) => {
    if (event.key === 'Tab' || event.key === 'Shift'){
      return;
    }

    setState({ ...state, [anchor]: open });
	};
	
	const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' 
      })}
      role="presentation"
      
    >
      <Login />
    </div>
  );
	
	return (
		<div className={classes.splash}>

{['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><ArrowDropDownIcon style={{fontSize: '2rem' }}/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
			
			<Typography className={classes.appName} variant='h2'>Journey 2</Typography>
		</div>
	);
};

export default Splash;
