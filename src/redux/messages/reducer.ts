import {
  MESSAGES_SET,
  MESSAGES_ADD,
  messageState,
  messagesAction,
  MESSAGES_READED_STATUS,
  MessageType,
  MESSAGES_CLEAR,
} from './types'

export const initialState: any = {
  items: null,
  isLoading: false,
};

export default (state = initialState, action: messagesAction): messageState => {
  switch (action.type) {
        case MESSAGES_SET:
          return{
            ...state,
            items:action.payload
          }
        case MESSAGES_ADD:
          return{
            ...state,
            items: state.items && [...state.items, action.payload]
          }
        case MESSAGES_READED_STATUS : 
        return {
          ...state,
          
          items: state.items ?  state.items.map((message:MessageType) => {
            if (message.dialog._id === action.payload.dialogId) {
              message.read = true;
            }
            return message;
          }): []
        };
        case MESSAGES_CLEAR :
          return {
            ...state, 
            items:[]
          }
    default:
      return state;
  }
};
