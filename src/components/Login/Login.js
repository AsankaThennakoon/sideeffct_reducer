import React, {  useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContex from '../../store/auth-context';

const emailReducer=(state, actions)=>{


  if(actions.type==='USER_INPUT'){
    return {value:actions.val, isValid:actions.val.includes('@') };
  }

  if(actions.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@') };
  }
  return {value:'', isValid:false};
}


const passwordReducer=(state,actions)=>{

  if(actions.type==='USER_INPUT'){
    return {value:actions.val, isValid:actions.val.trim().length > 6 };
  }

  if(actions.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length > 6 };
  }

  return {value:'', isValid:false};
}

const Login = (props) => {
  
  const authCtx=useContext(AuthContex);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer, {value:'', isValid:null});
  const [passwordState,dispatchPassword]=useReducer(passwordReducer, {value:'', isValid:null});
  const {isValid: emailIsValid}=emailState;
const {isValid: passwordIsValid}=passwordState;

  useEffect(()=>{

    const identifier=setTimeout(()=>{
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    },500);

    return ()=>{
      
      console.log('Clean');
      clearTimeout(identifier);
    }
  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {

    dispatchEmail({type:"USER_INPUT",val:event.target.value});
    // setFormIsValid(event.target.value.includes('@')&& passwordState.isValid);
  
  };
  
  const validateEmailHandler = () => {

    dispatchEmail({type:'INPUT_BLUR'})
  
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"USER_INPUT",val:event.target.value});
    // setFormIsValid(emailState.isValid&& event.target.value.trim().length>6);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
  authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
