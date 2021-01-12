import React from 'react'
import { Formik } from 'formik';
import {
  Form,
  FormInput, 
  FormSubmit,
  FormInputWrapper,
  FormInputLabel,
  Wrapper,
  Title,
  SwitchParagraph,
  RememberMe,
  RememberMeCheckbox,
  RememberMeCustomCheckbox,
  RememberMeLabel,
  Additional,
  ForgetPassword,
  ErrorFeedback,
  ServerErrorFeedback,
  InputImage
} from '../Auth.styled'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { User_Login } from '../../../redux/user/actions'
import { useHistory } from "react-router-dom";
import { UserState } from '../../../redux/user/types';
import { email, password } from '../Assets/index'

const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean()
});

const LoginForm = () => {
    const LoginError = useSelector( (state:{user : UserState}) => state.user.errors.login)
    const history = useHistory()
    const dispatch = useDispatch()
    return(
        <Formik
        initialValues={{ email: '', password: '' , remember:false}}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => { 
          dispatch(User_Login({
            email:values.email,
            password:values.password
          }, history, setSubmitting))
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Wrapper>
            <Title>Sign in</Title>
            <SwitchParagraph>or <Link to="/signup">Sign up</Link></SwitchParagraph>
            
            {LoginError ? <ServerErrorFeedback>{LoginError}</ServerErrorFeedback> : ""}

              <Form autoComplete="off" onSubmit={handleSubmit}>

                  <FormInputWrapper>
                    <InputImage src={email} width="20px" height="20px" alt="email" />
                    <FormInput
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        id="loginformemail"
                    />
                    <FormInputLabel htmlFor="loginformemail" >E-mail</FormInputLabel>
                    {errors.email && touched.email && <ErrorFeedback>{errors.email}</ErrorFeedback>}
                </FormInputWrapper>
    
                <FormInputWrapper>
                  <InputImage src={password} width="20px" height="20px" alt="pasword" />
                    <FormInput
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        id="loginformpassword"
                    />
                    <FormInputLabel htmlFor="loginformpassword" >Password</FormInputLabel>
                    {errors.password && touched.password && <ErrorFeedback>{errors.password}</ErrorFeedback>}
                </FormInputWrapper>
                
                <Additional>

                  <RememberMe>
                    <RememberMeCheckbox
                      name="remember"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.remember}
                      id="remember_checkbox_222f" 
                      type='checkbox'
                    />
                    <RememberMeCustomCheckbox htmlFor="remember_checkbox_222f" ></RememberMeCustomCheckbox>
                    <RememberMeLabel htmlFor="remember_checkbox_222f" >Remember Me</RememberMeLabel>
                  </RememberMe>

                  <ForgetPassword><Link to="/forget">Forgot password?</Link></ForgetPassword>
                </Additional>

                <FormSubmit type="submit" disabled={isSubmitting}>
                  Sign in
                </FormSubmit>

              </Form>
          </Wrapper>
        )}
 
      </Formik>
    )
}

export default LoginForm