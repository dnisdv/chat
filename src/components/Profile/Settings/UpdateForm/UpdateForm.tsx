import React from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'
import {
    Wrapper,
    Title,
    Input,
    ConfirmButton,
    Form,
    Background,
    Description,
    Actions,
    CancelButton
} from './UpdateForm.styled'
import {UpdateItems} from '../Settings.container'
import { useSelector, useDispatch } from "react-redux"
import { User_Update } from "../../../../redux/user/actions"
import { UserState } from "../../../../redux/user/types"


type UpdateFormProps = {
  name:UpdateItems,
  closeSettingItem:() => void
}

const UpdateForm = ({name, closeSettingItem}:UpdateFormProps) => {
    const user = useSelector((state:{user:UserState}) => state.user.data)
    const dispatch = useDispatch()
    const variant = {
      "FULLNAME":{
        title:"Full Name",
        description: "Here you can upadate your main credentials:",
        inputs:[
        {
          current: user?.firstname,
          name:"firstname",
          placeholder:"Enter new firstname"
        },
        {
          current: user?.lastname,
          name:"lastname",
          placeholder:"Enter new lastname"
        },
      ],
      validationSchema: yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
      })
      },
      "USERNAME":{
        title:"Username",
        description: "Here you can upadate your username:",
        inputs:[
          {
            current: user?.username,
            name:"username",
            placeholder:"Enter new username"
          },
        ],
        validationSchema: yup.object().shape({
          username: yup.string().required(),
        })
      },
      "EMAIL":{
        title:"Email",
        description: "Here you can upadate your email:",
        inputs:[
          {
            current: user?.email,
            name:"email",
            placeholder:"Enter new email"
          },
        ],
        validationSchema: yup.object().shape({
          email: yup.string().email().required(),
        })
      },
      "ABOUT_ME":{
        title:"About Me",
        description: "Here you put some information about you:",
        inputs:[{
          current: user?.bio,
          name:"bio",
          placeholder:"Say something about you"
        }],
        validationSchema: yup.object().shape({
          bio: yup.string().required(),
        })
      }
    }

    const data = variant[name!]

    const initialValues = data.inputs.reduce( (a:any, i) => {
      return {...a, [i.name] : i.current}
    }, {})
    return(
        <Formik
        initialValues={initialValues}
        validationSchema={data.validationSchema}
        onSubmit={(values, { setSubmitting }) => { 
          dispatch(User_Update(values))
          closeSettingItem()
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
            <Background className="SettingsBack">
            <Wrapper>
                <Title>{data.title}</Title>
                <Description>{data.description}</Description>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                  {data.inputs.map( (i) => {
                    return (
                    <Input 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // @ts-ignore
                      value={values[i.name]}
                      type="text" 
                      name={i.name} 
                      placeholder={i.placeholder} 
                    />)

                  })}
                    <Actions>
                      <CancelButton onClick={closeSettingItem}>Cancel</CancelButton>
                      <ConfirmButton type="submit" >Update</ConfirmButton>
                    </Actions>
                </Form>
            </Wrapper>
          </Background>
        )}
 
      </Formik>
    )
}

export default UpdateForm