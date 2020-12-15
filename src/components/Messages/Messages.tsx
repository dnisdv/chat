import React from 'react'
import Message, {MessageProps} from '../Message/Message'
import NoItemsIcon from './Assets/MailBox.svg' 
import {
    Wrapper,
    MessageWrapper,
    NoItemsFeedbackImage,
    NoItemsWrapper,
    NoItemsTitle,
    NoItemsDescription
} from './Messages.styled'

type MessagesProps = {
    items?:MessageProps[],
    loading?:boolean
}

const Messages = ({items, loading=false}: MessagesProps) => {
    return(
        <Wrapper>
            {loading ? "" :
                items && items.length > 0 ? 
                items.map( (i:any) => {
                    console.log(items)
                    return(
                        <MessageWrapper>
                            <Message
                                isMe={i.isMe}
                                user={i.user}       
                                attachments={i.attachments}
                                readed={i.readed}
                                text={i.text}
                            />
                        </MessageWrapper>
                    )
                })
            :
            <NoItemsWrapper>
                <NoItemsFeedbackImage src={NoItemsIcon} />
                <NoItemsTitle>Add friends to chat</NoItemsTitle>
                <NoItemsDescription>That’s easy to correct ! Get more meeting to get more matches on your account</NoItemsDescription>
            </NoItemsWrapper>
            }
            </Wrapper>
    )
}

export default Messages