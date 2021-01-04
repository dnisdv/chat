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
  ErrorFeedback,
  ServerErrorFeedback,
  InputImage
} from '../Auth.styled'
import * as yup from 'yup'
import {useDispatch, useSelector} from "react-redux"
import {User_Register} from '../../../redux/user/actions'
import { UserState } from '../../../redux/user/types'
import { useHistory } from "react-router-dom"
import {name, at, email, password} from '../Assets'

const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
});

const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const registerError = useSelector( (state: {user: UserState}) => state.user.errors.register)
    return(
        <Formik
          initialValues={{ firstname:'', lastname:'', username:'', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(User_Register({
              firstname:values.firstname,
              lastname:values.lastname,
              username:values.username,
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
            <Title>Sign up</Title>
            <SwitchParagraph>or <Link to="/signin">Sign in</Link></SwitchParagraph>

            {registerError ? <ServerErrorFeedback>{registerError}</ServerErrorFeedback> : ""}
            <Form onSubmit={handleSubmit}>

              <FormInputWrapper>
                    <InputImage src={name} width="20px" height="20px" alt="first name" />
                    <FormInput
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstname}
                        id="registerformfirstname"
                    />
                    <FormInputLabel htmlFor="registerformfirstname">First name</FormInputLabel>
                    {errors.firstname && touched.firstname && <ErrorFeedback>{errors.firstname}</ErrorFeedback>}
                </FormInputWrapper>

                <FormInputWrapper>
                    <InputImage src={name} width="20px" height="20px" alt="last name" />
                    <FormInput
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                        id="registerformlastname"
                    />
                    <FormInputLabel htmlFor="registerformlastname">Last name</FormInputLabel>
                    {errors.lastname && touched.lastname && <ErrorFeedback>{errors.lastname}</ErrorFeedback>}
                </FormInputWrapper>

                <FormInputWrapper>
                  <InputImage src={at} width="20px" height="20px" alt="last name" />
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
                    <InputImage src={email} width="20px" height="20px" alt="email" />
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
                    <InputImage src={password} width="20px" height="20px" alt="password" />
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
                    Sign up
                </FormSubmit>
            </Form>
          </Wrapper>
        )}
 
      </Formik>
    )
}

export default RegisterForm