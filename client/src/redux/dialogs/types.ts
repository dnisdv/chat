import { Userdata } from '../user/types'
import { MESSAGES_READED_STATUS } from '../messages/types'
export const DIALOGS_SET = "DIALOGS_SET"
export const DIALOGS_SET_LOADING = "DIALOGS_SET_LOADING"
export const DIALOGS_USERS_FOUND = "DIALOGS_USERS_FOUND"
export const DIALOGS_CLEAR_USER_FOUND = "DIALOGS_CLEAR_USER_FOUND"
export const DIALOGS_SELECT_USER = "DIALOGS_SELECT_USER"
export const DIALOGS_CLEAR_FOUND = "DIALOGS_CLEAR_FOUND"
export const DIALOG_SET_CURRENT = "DIALOG_SET_CURRENT"
export const DIALOG_SET_NOTREADCOUNT = "DIALOG_SET_NOTREADCOUNT"
export const DIALOG_RESET_CURRENT = "DIALOG_RESET_CURRENT"

export type Dialog = {
    _id:string,
    author:Userdata,
    partner:Userdata,
    lastMessage:any,
    notReadedCount:number
}

interface setDialogAction {
    type: typeof DIALOGS_SET
    payload:Dialog
}

interface setDialogLoading {
    type: typeof DIALOGS_SET_LOADING,
}

interface setDialogsFound {
    type:typeof DIALOGS_USERS_FOUND,
    payload:Userdata[]
}

interface clearUserFound {
    type: typeof DIALOGS_CLEAR_USER_FOUND
}

interface selectUserAction {
    type: typeof DIALOGS_SELECT_USER,
    payload:Userdata | null
}
interface clearFoundUsersAction {
    type: typeof DIALOGS_CLEAR_FOUND
}
interface dialogSetCurrentAction {
    type: typeof DIALOG_SET_CURRENT,
    payload:Dialog
}

type messageSetReadStatus = {
    type:typeof MESSAGES_READED_STATUS,
    payload:any
}
type setNoReadCount = {
    type: typeof DIALOG_SET_NOTREADCOUNT,
    payload:{
        dialogId:string,
        count:number
    }
}
type dialogResetCurrent = {
    type: typeof DIALOG_RESET_CURRENT
}


export type DialogActionTypes =
    setDialogAction |
    setDialogLoading |
    setDialogsFound |
    clearUserFound | 
    selectUserAction |
    clearFoundUsersAction |
    dialogSetCurrentAction |
    messageSetReadStatus | 
    setNoReadCount |
    dialogResetCurrent
;

export type DialogState = {
    usersfound:any ,
    items: any ,
    isLoading: boolean,
    selectedUser:Userdata | null,
    currentDialog:Dialog | null
}