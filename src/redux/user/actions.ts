import axios from '../../core/axios'
import {ThunkAction, ThunkDispatch } from 'redux-thunk';
import {History} from 'history'
import {ActionCreator, Dispatch} from 'redux';

import {
    LoginData,
    RegisterData,
    UserActionTypes,
    USER_LOGIN,
    USER_REGISTER, 
    SET_USER_DATA,
    SET_USER_AUTH,
    USER_LOADING,
    Userdata,
    UserLoginResponse,
    LOGIN_ERROR,
    REGISTER_ERROR,
    UserState,
    USER_LOGOUT
} from './types'

export const fetch_User = (history?:History): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
  return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
      dispatch({
        type:USER_LOADING,
      })
      return axios.get<Userdata>("/user/me").then((res) => {
        dispatch({
          type:SET_USER_DATA,
          payload:res.data
        })
        history!.push('/')
      }).catch(() => {

      })

  }
}

export const User_Update = (
  data: Partial<Userdata>
): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
    return axios.put<Userdata>("/user/update", data).then((res) => {
      dispatch({
        type:SET_USER_DATA,
        payload:res.data
      })
    }).catch((e) => {
      console.log(e)
    })
}
}

export const User_UdateAvatar = (
  file:File
): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
    const formdata = new FormData()
    formdata.append("avatar", file)
    return axios.put<Userdata>("/user/update", formdata).then((res) => {
      dispatch({
        type:SET_USER_DATA,
        payload:res.data
      })
    }).catch((e) => {
      console.log(e)
    })
}
}


export const User_Login = (
    {email, password}:LoginData,
    history:History,
    setSubmitting:(isSubmitting: boolean) => void
  ): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
  return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
      return axios.post<UserLoginResponse>("/user/signin", {email, password}).then((res) => {
        setSubmitting(false)
        const {token} = res.data
        dispatch({
          type:USER_LOGIN,
          payload:{}
        })
        axios.defaults.headers.common['token'] = token;
        window.localStorage['token'] = token;
        dispatch({
          type:SET_USER_AUTH,
          payload:true
        })
        dispatch(fetch_User(history));
      }).catch((e) => {
        console.log(e)
        dispatch({
          type:LOGIN_ERROR,
          payload:e.response.data.message
        })
        setSubmitting(false)
      })
  }
}



export const User_Register = (
  {firstname,
    lastname,
    username,
    email,
    password}:RegisterData,
    history:History,
    setSubmitting:(isSubmitting: boolean) => void
  ): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
  return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
      return axios.post<Userdata>("/user/signup", 
        {firstname, lastname, username, email, password}).then(() => {
          setSubmitting(false)
          dispatch({
            type:USER_REGISTER,
            payload:{}
          })
          history!.push('/signin')
          setSubmitting(false)
      }).catch((e) => {
        dispatch({
          type:REGISTER_ERROR,
          payload:e.response.data.message
        })
      })
  }
}

export const userLogout: ActionCreator<ThunkAction<{}, UserState, {}, any>> = (
  history:any
  ) => {
    return (dispatch: Dispatch<any>): any => {
      localStorage.removeItem('token');
      dispatch({
        type: USER_LOGOUT,
      });
      history.push('/signin')

    };
};
