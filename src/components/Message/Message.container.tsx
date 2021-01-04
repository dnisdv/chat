import React from 'react'
import MessageComponent,{MessageProps} from './Message'

const Message = (props:MessageProps) => {

    
    return(
        <MessageComponent isTyping={true} {...props}/>
    )
}

export default Message