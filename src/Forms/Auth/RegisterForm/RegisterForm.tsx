import React from 'react'
import { Formik } from 'formik';
import { Link } from 'react-router-dom'
import {
  Form,
  FormInput, 
  FormSubmit,
  FormInputWrapper,
  FormInputLabel,
  Wrapper,
  Title,
  SwitchParagraph,
  ErrorFeedback
} from '../Auth.styled'
import * as yup from 'yup'

const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const RegisterForm = () => {
    return(
        <Formik
          initialValues={{ username:'', email: '', password: '' }}
          validationSchema={SignupSchema}
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
            <Title>Sign up</Title>
            <SwitchParagraph>or <Link to="/signin">Sign in</Link></SwitchParagraph>
            <Form onSubmit={handleSubmit}>
                <FormInputWrapper>
                    <FormInput
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        id="registerformusername"
                    />
                    <FormInputLabel htmlFor="registerformusername">Username</FormInputLabel>
                    {errors.username && touched.username && <ErrorFeedback>{errors.username}</ErrorFeedback>}
                </FormInputWrapper>

                <FormInputWrapper>
                    <FormInput
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        id="registerformemail"
                    />
                    <FormInputLabel htmlFor="registerformemail" >E-mail</FormInputLabel>
                    {errors.email && touched.email && <ErrorFeedback>{errors.email}</ErrorFeedback> }
                </FormInputWrapper>
    
                <FormInputWrapper>
                    <FormInput
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        id="registerformpassword"
                    />
                    <FormInputLabel htmlFor="registerformpassword" >Password</FormInputLabel>
                    {errors.password && touched.password && <ErrorFeedback>{errors.password}</ErrorFeedback>}
                </FormInputWrapper>
                
                <FormSubmit type="submit" disabled={isSubmitting}>
                    Submit
                </FormSubmit>
            </Form>
          </Wrapper>
        )}
 
      </Formik>
    )
}

export default RegisterForm