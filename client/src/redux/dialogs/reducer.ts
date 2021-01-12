import { 
    DialogActionTypes,
    DialogState,
    DIALOGS_USERS_FOUND,
    DIALOGS_CLEAR_USER_FOUND,
    DIALOGS_SELECT_USER,
    DIALOGS_CLEAR_FOUND,
    DIALOGS_SET,
    DIALOG_SET_CURRENT,
    Dialog,
    DIALOG_SET_NOTREADCOUNT,
    DIALOG_RESET_CURRENT
} from './types'
import { MESSAGES_READED_STATUS } from '../messages/types'


export const initialState: DialogState = {
  usersfound: null,
  items: null,
  selectedUser: null,
  currentDialog:null,
  isLoading: false,
  
};

const reducer = (state = initialState, action: DialogActionTypes): DialogState => {
  switch (action.type) {
        case DIALOG_SET_CURRENT:
          return{
            ...state,
            currentDialog:action.payload,
          }
        case DIALOGS_SET:
          return{
            ...state,
            items:action.payload
          }
        case DIALOGS_USERS_FOUND:
            return {
                ...state,
                usersfound:action.payload
            }
        case DIALOGS_CLEAR_USER_FOUND:
          return{
            ...state,
            usersfound: null
          }
        case DIALOGS_SELECT_USER : 
          return{
            ...state,
            selectedUser:action.payload,
          }
        case DIALOGS_CLEAR_FOUND :
          return{
            ...state,
            usersfound:null
          }
          case DIALOG_RESET_CURRENT :
            return{
              ...state,
              selectedUser:null,
              currentDialog:null
            }
          case DIALOG_SET_NOTREADCOUNT :
            return{
              ...state,
              items : state.items.map((i:Dialog) => {
                  if(i._id === action.payload.dialogId){
                    i.notReadedCount = action.payload.count
                  }
                  return i
              })
            }
    default:
      return state;
  }
};


export default reducer