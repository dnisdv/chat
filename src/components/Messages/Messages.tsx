import React,{useRef, useEffect} from 'react'
import Message, {MessageProps} from '../Message/Message'
import NoItemsIcon from './Assets/MailBox.svg' 
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Dialog } from '../../redux/dialogs/types'
import { Userdata } from '../../redux/user/types'

import {
    Wrapper,
    MessageWrapper,
    NoItemsFeedbackImage,
    NoItemsWrapper,
    NoItemsTitle,
    NoItemsDescription,
    MessagesWrapper,
    Typing,
    TypingDot,
    TypingWrapper,
    TypingTitle
} from './Messages.styled'

type MessagesProps = {
    items?:MessageProps[],
    loading?:boolean,
    scrollRef:any,
    wrapperRef:any,
    currentDialog:Dialog | null,
    isTyping:boolean,
    user: Userdata
}

const Messages = ({items, loading=false, isTyping, currentDialog, user}: MessagesProps) => {
    const scrollRef = useRef<any>(null)
    useEffect( () =>{
        scrollRef.current && scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }, [scrollRef, items])

    return(
        <Wrapper  isItems={!!(items && items.length > 1)}>
            {loading ? "" :
                currentDialog && items && items.length > 0 ? 
                <MessagesWrapper ref={scrollRef}>
                    {items.map( (i) => {
                        return(
                            <MessageWrapper key={i.id}>
                                <Message
                                    id={i.id}
                                    isMe={i.isMe}
                                    user={i.user}       
                                    attachments={i.attachments}
                                    readed={i.readed}
                                    text={i.text}
                                    createdAt={i.createdAt}
                                />
                            </MessageWrapper>
                        )
                    })}
                </MessagesWrapper>
            :
            currentDialog ? "" :
            <NoItemsWrapper>
                <NoItemsFeedbackImage src={NoItemsIcon} />
                <NoItemsTitle>Add friends to chat</NoItemsTitle>
                <NoItemsDescription>That’s easy to correct ! Get more meeting to get more matches on your account</NoItemsDescription>
            </NoItemsWrapper> 
            }
            {isTyping ? 
                <TypingWrapper>
                    <TypingTitle>
                        { currentDialog ? currentDialog.author._id === user._id ? 
                        currentDialog.partner.firstname : 
                        currentDialog.author.firstname : ""} typing</TypingTitle>
                        <Typing>
                            <TypingDot />
                            <TypingDot />
                            <TypingDot />
                    </Typing>
                </TypingWrapper>
            : ""}

            </Wrapper>
    )
}

export default Messages