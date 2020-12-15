import React from 'react'
import MessageComponent,{MessageProps} from './Message'

const Message = (props:MessageProps) => {
    return(
        <MessageComponent {...props}/>
    )
}

export default Message