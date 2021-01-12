import { 
    UserActionTypes,
    UserState,
    SET_USER_DATA,
    SET_USER_AUTH,
    USER_LOADING,
    LOGIN_ERROR,
    REGISTER_ERROR,
    USER_LOGOUT
  } from './types'
  
  export const initialState:UserState = {
    data: null,
    errors:{
      login:"",
      register:""
    },
    token: window.localStorage.token,
    isAuth: !!window.localStorage.token,
    loading:false
  };
  
  export default (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
      case USER_LOADING:
        return{
          ...state,
          loading:true
        }
      case SET_USER_DATA:
        return {
          ...state,
          data: action.payload,
          isAuth: true,
          token: window.localStorage.token,
          loading:false,
          errors:{
            login:"",
            register:""
          },
        };
      case SET_USER_AUTH:
        return {
          ...state,
          isAuth: action.payload,
          loading:false,
          errors:{
            login:"",
            register:""
          },
        };
      case LOGIN_ERROR : 
        return {
          ...state,
          errors: {
            ...state.errors,
            login:action.payload
          }
        }
      case LOGIN_ERROR : 
        return {
          ...state,
          errors: {
            ...state.errors,
            register:action.payload
          }
      }
      case USER_LOGOUT : 
        return {
          ...state,
          data:null,
          isAuth:false,
          token:null
        }
      default:
        return state;
    }
  };
  