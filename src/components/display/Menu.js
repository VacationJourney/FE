import React, { useState } from 'react';
import { clear } from '../../index';
import { useHistory } from 'react-router-dom';

import { withStyles, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			backgroundColor: 'black',
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

const CustomizedMenus = () => {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);

	const exit = () => {
		localStorage.clear();
		history.push('/');
		clear();
	};

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<MenuIcon
				aria-controls='customized-menu'
				aria-haspopup='true'
				variant='contained'
				fontSize='large'
				color='black'
				onClick={handleClick}
			></MenuIcon>
			<StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>
					<ListItemIcon>
						<HomeIcon onClick={() => history.push('/dashboard')}fontSize='large'></HomeIcon>
					</ListItemIcon>
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemIcon>
						<PersonIcon onClick={() => history.push('/settings')}fontSize='large'></PersonIcon>
					</ListItemIcon>
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemIcon>
						<ExitToAppIcon onClick={exit} fontSize='large' />
					</ListItemIcon>
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
};
export default CustomizedMenus;
