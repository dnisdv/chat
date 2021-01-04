export const SET_USER_DATA = "SET_USER_DATA"
export const SET_USER_AUTH = "SET_USER_AUTH"
export const FETCH_USER_DATA = "FETCH_USER_DATA"
export const USER_LOGIN = "USER_LOGIN"
export const USER_REGISTER = "USER_REGISTER"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const REGISTER_ERROR = "REGISTER_ERROR"
export const USER_LOADING = "USER_LOADING"

export type LoginData = {
    email:string,
    password:string
}

export type RegisterData = {
    firstname:string,
    lastname:string,
    username:string,
    email:string,
    password:string
}

export type Userdata = {
    _id:string,
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    createdAt:string,
    bio:string,
    last_seen:string,
    isOnline:boolean,
}

interface RegisterUserAction {
    type: typeof USER_REGISTER,
}

interface LoginUserAction {
    type: typeof USER_LOGIN,
}

interface RegisterUserErrorAction {
    type: typeof REGISTER_ERROR,
    payload:string,
}

interface LoginUserErrorAction {
    type: typeof LOGIN_ERROR,
    payload:string
}

interface SET_USER_DATA_ACTION{
    type: typeof SET_USER_DATA,
    payload:Userdata
}
interface SET_USER_AUTH_ACTION{
    type: typeof SET_USER_AUTH,
    payload:boolean
}
interface USER_LOADING{
    type: typeof USER_LOADING,
}

export type UserLoginResponse = {
    status:string,
    token:string
  }

export type UserActionTypes =
    RegisterUserAction |
    LoginUserAction |
    SET_USER_DATA_ACTION |
    SET_USER_AUTH_ACTION |
    USER_LOADING |
    RegisterUserErrorAction |
    LoginUserErrorAction
;

export type UserState = {
    data:Userdata
    errors:{
        login:string,
        register:string
    },
    token:string,
    isAuth:boolean,
    loading:boolean,
}
