import React, { useEffect } from 'react'
import DialogsComponent from './Dialogs'
import { useSelector, useDispatch } from 'react-redux'
import { DialogState, Dialog as DialogType } from '../../redux/dialogs/types'
import { UserState } from '../../redux/user/types'
import socket from '../../core/socket'
import { fetchDialogs, setDialogNotReadCount } from '../../redux/dialogs/actions'
import { messageUpdateReadStatus, messageUpdateNotReadCount } from '../../redux/messages/actions'

const Dialogs = () => {
    const dispatch = useDispatch()
    const Dialogs = useSelector( (state:{dialog:DialogState}) => state.dialog.items)
    const me = useSelector((state:{user:UserState}) => state.user.data)

    useEffect(() => {
        const readcount = ({dialogId, count}:any) => {
            dispatch(setDialogNotReadCount(dialogId, count))
        }
        const newMessage = (data:any) => {
            if(me && data.dialog.author === me._id || me && data.dialog.partner === me._id){
                dispatch(fetchDialogs())
            }
        }
        socket.on('SERVER:DIALOG_CREATED', () => dispatch(fetchDialogs()));
        socket.on('SERVER:NEW_MESSAGE', newMessage)
        socket.on('SERVER:MESSAGES_NOT_READED_COUNT', readcount)
        
        return () => {
          socket.removeListener('SERVER:DIALOG_CREATED', () => dispatch(fetchDialogs()));
          socket.removeListener('SERVER:MESSAGES_READED', () =>{dispatch(fetchDialogs())});
          socket.removeListener('SERVER:NEW_MESSAGE', newMessage);
          socket.removeListener('SERVER:MESSAGES_NOT_READED_COUNT', readcount)
        };
    }, []);

    if(!me) {
        return <></>
    }

    return(
        <>
        {me ? 
            <DialogsComponent 
            items={ Array.isArray(Dialogs) && Dialogs.length > 0 ? Dialogs.map( (i:DialogType) => {
                const Realuser = me._id === i.partner._id ? i.author : i.partner
                let LastMessag = null
                if(i.lastMessage){
                    LastMessag = {
                        message:i.lastMessage.text,
                        date:i.lastMessage.createdAt,
                        fromMe:i.lastMessage.user._id === me._id,
                        audio:i.lastMessage.audio,
                        attachments:i.lastMessage.attachments,
                        user:i.lastMessage.user
                    }
                }

                return {
                    dialog:i,
                    user:{
                        _id: Realuser._id,
                        firstname: Realuser.firstname,
                        lastname: Realuser.lastname,
                        avatar: Realuser.avatar ? Realuser.avatar : null,
                        username: Realuser.username,
                        isOnline: Realuser.isOnline,
                    },
                    lastMessage:LastMessag,
                    notReadedCount: i.lastMessage ? me._id === i.lastMessage.user._id ? 0 : i.notReadedCount : null
                }
            }): null}
        /> : ""
        }
        </>
        
    )
}



export default Dialogs