import React, { useEffect, useRef, useState } from 'react'
import MessagesComponent from './Messages'
import { getMessages, add_message, messageUpdateReadStatus } from '../../redux/messages/actions'
import { useDispatch, useSelector } from 'react-redux'
import { DialogState } from '../../redux/dialogs/types'
import { MessageType, messageState } from '../../redux/messages/types'
import { UserState } from '../../redux/user/types'
import socket from '../../core/socket'


const Messages = () => {
    const dispatch = useDispatch()
    const currentDialog = useSelector( (state:{dialog:DialogState}) => state.dialog.currentDialog);
    const messages = useSelector( (state: {message: messageState}) => state.message.items)
    const me = useSelector( (state:{user:UserState}) => state.user.data)
    const scrollRef = useRef<any>()
    const wrapperRef = useRef<any>()
    const [isTyping, setIsTyping] = useState(false)
    let typingTimeoutId:any = null;


    useEffect( () => {
        currentDialog?._id && dispatch(getMessages(currentDialog._id))
    }, [currentDialog, scrollRef, wrapperRef, dispatch])

    // TODO DO SOMETHING WITH THIS
    // eslint-disable-next-line
    const toggleIsTyping = () => {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      };

      useEffect(() => {
        const AddMessage = (Message:any) => {
            dispatch(add_message(Message))
        };
        socket.on('SERVER:NEW_MESSAGE', AddMessage);
        socket.on('SERVER:MESSAGES_READED', (data:any) =>{
            if(me){
                if(data.userId !== me._id){
                    dispatch(messageUpdateReadStatus(data))
                }
            }
         });

        return () => socket.removeListener('SERVER:NEW_MESSAGE', AddMessage);
    }, [me, dispatch])

    useEffect(() => {
        socket.on('DIALOGS:TYPING', ({dialogId, userId}:any) => {
            if(currentDialog){
                if(currentDialog._id === dialogId && me?._id !== userId){
                    toggleIsTyping();
                }
            }
        });
    }, [currentDialog, me?._id, toggleIsTyping])



    if(!me){
        return <></>
    }
    return(
        
        <MessagesComponent
            isTyping={isTyping}
            user={me}
            currentDialog={currentDialog}
            wrapperRef={wrapperRef}
            scrollRef={scrollRef}
            items={
                messages && messages.length > 0  ? messages.map( (i:MessageType) => {
                    return{
                        id:i._id,
                        text:i.text,
                        user:{
                            firstname:i.user.firstname,
                            lastname:i.user.lastname,
                            avatar:i.user.avatar
                        },
                        attachments:i.attachments,
                        readed:i.read,
                        isMe: i.user._id === me._id,
                        createdAt: i.createdAt,
                    }
                }) :""
                
            }
        />
    )
}

export default Messages