import axios from '../../core/axios'
import {ThunkAction, ThunkDispatch } from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';
import {
  MESSAGES_SET,
  messagesAction,
  MESSAGES_ADD,
  messageState,
  MESSAGES_READED_STATUS,
  MESSAGES_CLEAR
} from "./types"
import socket from '../../core/socket'
type AttachmentImagesType = {
  id:number,
  name:string,
  url:string,
  file:File
}

export const getMessages = (dialogId:string): ThunkAction<Promise<void>, {}, {}, messagesAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, messagesAction>, getState:any): Promise<void> => {
      return axios.get(`/messages?dialog=${dialogId}`).then((res) => {
          dispatch({
              type:MESSAGES_SET,
              payload:res.data
          })
      }).catch((e) => {
      })
  }
}


export const sendMessagetoDialog = (dialogId:string, text:string, attachments?:AttachmentImagesType[]): ThunkAction<Promise<void>, {}, {}, messagesAction> => {
  return async (): Promise<void> => {
      const formdata = new FormData()
      attachments && attachments.forEach((i) => {
        formdata.append("photos", i.file)
      })
      formdata.append("text", text)
      formdata.append("dialog_id", dialogId)

      return axios.post("/messages",formdata).then((res) => {
      }).catch((e) => {
        console.log(e)
      })
  }
}
export const messageUpdateReadStatus: ActionCreator<ThunkAction<{}, messageState, {}, messagesAction>> = (
  {userId, dialogId}
) : any => {

  return (dispatch: Dispatch<messagesAction>, getState:any):  void => {
    const meId = getState().user.data._id
      if( userId !== meId){
        const currentDialog = getState().dialog.currentDialog
      if(currentDialog){
        if (currentDialog._id === dialogId) {
            dispatch({
              type: MESSAGES_READED_STATUS,
              payload: {
                userId,
                dialogId: dialogId,
            }})
      }
      };
    }
  };
};


export const messageUpdateNotReadCount: ActionCreator<ThunkAction<{}, messageState, {}, messagesAction>> = (
  {userId, dialogId}
): any => {
  return (dispatch: Dispatch<messagesAction>, getState:any): void => {
      const currentDialog = getState().dialog.currentDialog
      if(currentDialog){
        if (currentDialog._id === dialogId) {
            dispatch({
              type: MESSAGES_READED_STATUS,
              payload: {
                userId,
                dialogId: dialogId,
            }})
        }
      };
  };
};


export const add_message: ActionCreator<ThunkAction<{}, messageState, {}, any>> = (
  message
) => {
  return (dispatch: Dispatch<any>, getState:any): any => {
    const meId = getState().user.data._id

    const currentDialog = getState().dialog.currentDialog
    if(currentDialog){
      if (currentDialog._id === message.dialog._id) {
        dispatch({
          type: MESSAGES_ADD,
          payload: message
        })

        socket.emit("udateReadStatus", {userId: meId, dialogId:currentDialog._id})
      }
    }
  };
};

export const clearMessages: ActionCreator<ThunkAction<{}, messageState, {}, any>> = (
) => {
  return (dispatch: Dispatch<any>): Action => {
    return dispatch({
      type: MESSAGES_CLEAR,
    });
  };
};


