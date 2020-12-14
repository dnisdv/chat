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
  ErrorFeedback
} from '../Auth.styled'
import {Link} from 'react-router-dom'
import * as yup from 'yup'

const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean()
});

const LoginForm = () => {
    return(
        <Formik
        initialValues={{ email: '', password: '' , remember:false}}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => { 
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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

              <Form onSubmit={handleSubmit}>
                  <FormInputWrapper>
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
                  Submit
                </FormSubmit>
              </Form>
          </Wrapper>
        )}
 
      </Formik>
    )
}

export default LoginForm