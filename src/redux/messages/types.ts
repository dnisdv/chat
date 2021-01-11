import { Dialog as DialogType } from '../dialogs/types'
import { Userdata } from '../user/types'

export const MESSAGES_ADD = "MESSAGES_ADD" 
export const MESSAGES_SET = "MESSAGES_SET" 
export const MESSAGES_SET_READ_STATUS = "MESSAGES_SET_READ_STATUS"
export const MESSAGES_SET_LOADING = "MESSAGES_SET_LOADING"
export const MESSAGES_SEND = "MESSAGES_SEND"
export const MESSAGES_READED_STATUS = "MESSAGES_READED_STATUS"
export const MESSAGES_CLEAR = "MESSAGES_CLEAR"

export type MessageType = {
    _id:string,
    read:boolean,
    attachments:{
        _id:string,
        filename:string,
        path:string,
    },
    text:string,
    user:Userdata,
    dialog:DialogType,
    createdAt:string,
}

export type fetchMessagesAction = {
    type: typeof MESSAGES_SET,
    payload:MessageType
}

export type sendMessageToDialog = {
    type: typeof MESSAGES_ADD
    payload: MessageType
}

export type messageSetReadStatus = {
    type:typeof MESSAGES_READED_STATUS,
    payload:{
        dialogId:string,
        userId:string   
    }
}

export type messageClearAction = {
    type: typeof MESSAGES_CLEAR
}


export type messagesAction = 
    fetchMessagesAction |
    sendMessageToDialog |
    messageSetReadStatus |
    messageClearAction
;

export type messageState = {
    items: any,
    isLoading:boolean
}