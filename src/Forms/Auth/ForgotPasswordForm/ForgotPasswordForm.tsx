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
  ErrorFeedback
} from '../Auth.styled'
import { Description } from './ForgotPasswordForm.styled'
import * as yup from 'yup'

const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPasswordForm = () => {
    return(
        <Formik
        initialValues={{email: '',}}
        validationSchema={ForgetPasswordSchema}
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
            <Title>Forgot Password?</Title>
            <Description>Please enter your email to search for your account.</Description>

            <Form onSubmit={handleSubmit}>
                <FormInputWrapper>
                    <FormInput
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        id="forgotformemail"
                    />
                    <FormInputLabel htmlFor="forgotformemail" >E-mail</FormInputLabel>
                    {errors.email && touched.email && <ErrorFeedback>{errors.email}</ErrorFeedback> }
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

export default ForgotPasswordForm