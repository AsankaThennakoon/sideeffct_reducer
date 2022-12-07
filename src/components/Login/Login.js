import React, { useContext, useEffect, useReducer, useRef, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContex from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, actions) => {
  if (actions.type === "USER_INPUT") {
    return { value: actions.val, isValid: actions.val.includes("@") };
  }

  if (actions.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, actions) => {
  if (actions.type === "USER_INPUT") {
    return { value: actions.val, isValid: actions.val.trim().length > 6 };
  }

  if (actions.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  const authCtx = useContext(AuthContex);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const emailRef=useRef();
  const passwordRef=useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("Clean");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(event.target.value.includes('@')&& passwordState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid&& event.target.value.trim().length>6);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(formIsValid){

      authCtx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailRef.current.focus();
      
    }
    else{
      passwordRef.current.focus();

    }
  };
 

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailRef}
          type="email"
          id="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
        ref={passwordRef}
          type="password"
          id="password"
          label="Password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
