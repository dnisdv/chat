import React, { useEffect, useState } from 'react'
import DialogComponent,{DialogProps} from './Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDialog } from '../../redux/dialogs/actions'
import { DialogState } from '../../redux/dialogs/types'
import { Dialog as DialogType } from '../../redux/dialogs/types'
import socket from '../../core/socket'
import { UserState } from '../../redux/user/types'

const Dialog = (props:DialogProps) => {
    const [isTyping, setIsTyping] = useState(false)
    const currentDialog = useSelector( (state:{dialog:DialogState}) => state.dialog.currentDialog)
    const me = useSelector( (state:{user:UserState}) => state.user.data)
    const dispatch = useDispatch()
    let typingTimeoutId:any = null;
    
    const selectDialog = (dialog:DialogType) => {
        dispatch(setCurrentDialog(dialog))
    }
    const toggleIsTyping = () => {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      };

    useEffect(() => {
        socket.on('DIALOGS:TYPING', ({dialogId, userId}:any) => {
            if(props.dialog._id === dialogId && me?._id !== userId){
                toggleIsTyping();
            }
        });
    }, [me?._id, props.dialog._id])
    return(
        <DialogComponent 
            isTyping={isTyping}
            active={ currentDialog? currentDialog._id === props.dialog._id: false}
            onClick={selectDialog} 
            {...props}
        />
    )
}

export default Dialog