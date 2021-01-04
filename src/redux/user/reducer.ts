import { 
    UserActionTypes,
    UserState,
    SET_USER_DATA,
    SET_USER_AUTH,
    USER_LOADING,
    LOGIN_ERROR,
    REGISTER_ERROR
  } from './types'
  
  export const initialState:UserState = {
    data: {
      firstname:"",
      lastname:"",
      username:"",
      email:"",
      bio:"",
      _id:"",
      createdAt:"",
      last_seen:"",
      isOnline:false
    },
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
          data: {
            _id:action.payload._id,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            username: action.payload.username,
            email: action.payload.email,
            bio: "",
            createdAt:action.payload.createdAt,
            last_seen:action.payload.last_seen,
            isOnline:action.payload.isOnline
          },
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
      default:
        return state;
    }
  };
  