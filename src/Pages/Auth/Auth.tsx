import React from 'react'
import LoginForm from '../../Forms/Auth/LoginForm/LoginForm'
import { Route } from "react-router-dom";
import RegisterForm from '../../Forms/Auth/RegisterForm/RegisterForm';
import ForgetPasswordForm from '../../Forms/Auth/ForgotPasswordForm/ForgotPasswordForm';
import {
    Wrapper,
    FormWrapper
} from './Auth.styled'


const Auth = () => {
    return(
        <Wrapper>
            <FormWrapper>
                <Route exact path="/signin" render={() => <LoginForm /> } />
                <Route exact path="/signup" render={() => <RegisterForm /> } />
                <Route exact path="/forget" render={() => <ForgetPasswordForm />} />
            </FormWrapper>
        </Wrapper>
    )
}

export default Auth