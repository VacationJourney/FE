import React, { useState, useEffect } from 'react'
import { Switch, useRouteMatch } from 'react-router-dom';
import NavBar from './Nav/Index'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {  useMutation } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../../graphQl/mutations/userM'

import Vacations from './Vacations'
import OneVacation from './OneVacation/Index';

import PrivateRoute from '../../utils/PrivateRoute';
import Loading from '../Loading'
import { makeStyles } from '@material-ui/core';
import Blue from '../../assets/Blue.jpg';

const useStyles = makeStyles(() => ({
  vacations: {
    backgroundImage: `url(${Blue})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
}));

const Index = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();
  const { user } = useAuth0()
  const { nickname, email, picture } = user
  const [userId, setUserId] = useState('')

  // GraphQL
  // Upsert User
  const [authorizeUser] = useMutation(AUTHORIZE_USER);

  useEffect(() => {
    authorizeUser({
      variables: {
        username: nickname,
        email
      }
    }).then(res => {
      setUserId(res.data.authorizeUser.id)
    })
  },[authorizeUser, email, nickname])
 
  return (
    <div className={ classes.vacations }>
      <NavBar picture={ picture } />
      <Switch>
        <PrivateRoute exact path={path}>
          <Vacations userId={ userId } />
        </PrivateRoute>
        <PrivateRoute path={`${path}/:id`}>
          <OneVacation />
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default withAuthenticationRequired(Index, {
  onRedirecting: () => <Loading />,
})