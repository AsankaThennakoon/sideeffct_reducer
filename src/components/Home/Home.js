import React, { useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import AuthContex from '../../store/auth-context';

const Home = () => {
  const authCtx=useContext(AuthContex)
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>logout</Button>
    </Card>
  );
};

export default Home;
