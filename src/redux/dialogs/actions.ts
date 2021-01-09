import axios from '../../core/axios'
import {ThunkAction, ThunkDispatch } from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';
import {
    DIALOGS_SET,
    DIALOGS_SET_LOADING,
    DialogActionTypes,
    DIALOGS_USERS_FOUND,
    DIALOGS_CLEAR_USER_FOUND,
    DIALOGS_SELECT_USER,
    DIALOGS_CLEAR_FOUND,
    DIALOG_SET_CURRENT,
    DIALOG_SET_NOTREADCOUNT,
    DIALOG_RESET_CURRENT
} from './types'
import { Userdata } from '../user/types'
import { DialogState, Dialog } from '../dialogs/types'
import socket from '../../core/socket'

type AttachmentImagesType = {
  id:number,
  name:string,
  url:string,
  file:File
}
export const selectUser: ActionCreator<ThunkAction<{}, DialogState, {}, DialogActionTypes>> = (
    user: Userdata
  ) => {
    return (dispatch: Dispatch<DialogActionTypes>): Action => {
      dispatch({
        type: DIALOGS_SELECT_USER,
        payload:user
      });
      return dispatch({
          type: DIALOGS_CLEAR_FOUND
      })
    };
};


export const clearFoundDialogs: ActionCreator<Action> = () => {
    return {
      type: DIALOGS_CLEAR_USER_FOUND,
    };
  };

export const searchDialogs = (value:string): ThunkAction<Promise<void>, {}, {}, DialogActionTypes> => {
    return async (dispatch: ThunkDispatch<{}, {}, DialogActionTypes>): Promise<void> => {
        dispatch({type:DIALOGS_SET_LOADING})
        return axios.get(`/user/find?query=${value}`).then((res) => {
            dispatch({
                type:DIALOGS_USERS_FOUND,
                payload:res.data
            })
        }).catch((e) => {
                console.log(e)
        })
    }
}

export const fetchDialogs = (): ThunkAction<Promise<void>, {}, {}, DialogActionTypes> => {
    return async (dispatch: ThunkDispatch<{}, {}, DialogActionTypes>): Promise<void> => {
        return axios.get("/dialogs").then((res) => {
              dispatch({
                  type:DIALOGS_SET,
                  payload:res.data
              })
        }).catch((e) => {
                console.log(e)
        })
    }
}

export const setCurrentDialog: ActionCreator<Action> = (dialog: Dialog ) => {
    socket.emit('DIALOGS:JOIN', dialog);

    return {
      type: DIALOG_SET_CURRENT,
      payload:dialog
    };
  };
  
export const createDialogs_sendMessage = (partner:string, text:string, attachments?:AttachmentImagesType[]): ThunkAction<Promise<void>, {}, {}, DialogActionTypes> => {
    return async (dispatch: ThunkDispatch<{}, {}, DialogActionTypes>): Promise<void> => {

      const formdata = new FormData()

      attachments && attachments.forEach((i) => {
        formdata.append("photos", i.file)
      })
      formdata.append("text", text)
      formdata.append("partner", partner)

        return axios.post("/dialogs", formdata).then((res) => {
            dispatch(setCurrentDialog(res.data)) 
            dispatch(fetchDialogs())
            dispatch({
              type: DIALOGS_SELECT_USER,
              payload:null
            });
        }).catch((e) => {
          console.log(e)
        })
    }
}

export const createDialogs_sendVoiceRecord = (blob:Blob, partner:string): ThunkAction<Promise<void>, {}, {}, DialogActionTypes> => {
  return async (dispatch: ThunkDispatch<{}, {}, DialogActionTypes>): Promise<void> => {
    
      const formdata = new FormData()
      formdata.append("record", blob)
      formdata.append("partner", partner)

      return axios.post("/dialogs/voice",formdata).then((res) => {
        dispatch(setCurrentDialog(res.data)) 
        dispatch(fetchDialogs())
        dispatch({
          type: DIALOGS_SELECT_USER,
          payload:null
        });
      }).catch((e) => {
        console.log(e)
      })
  }
}

export const setDialogNotReadCount: ActionCreator<ThunkAction<{}, DialogState, {}, DialogActionTypes>> = (
  dialogId:string,count:number
  ) => {
    return (dispatch: ThunkDispatch<{}, {}, DialogActionTypes>): Action => {
      return dispatch({
        type: DIALOG_SET_NOTREADCOUNT,
        payload:{
          dialogId,
          count
      }
    });
  };
};

export const resetCurrentDialog: ActionCreator<ThunkAction<{}, DialogState, {}, DialogActionTypes>> = () => {
    return (dispatch: ThunkDispatch<{}, {}, DialogActionTypes>): Action => {
      return dispatch({
        type: DIALOG_RESET_CURRENT
    });
  };
};
  
export const removeDialog = (
  dialogId:string
): ThunkAction<Promise<void>, {}, {}, DialogActionTypes> => {
  return async (dispatch: ThunkDispatch<{}, {}, DialogActionTypes>): Promise<void> => {
      return axios.delete(`/dialogs/${dialogId}`).then((res) => {
        dispatch({
            type: DIALOG_RESET_CURRENT
        });
        dispatch(fetchDialogs())
      }).catch((e) => {
          console.log(e)
      })
  }
}
