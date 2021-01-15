import React,{useEffect, useState} from 'react'
import Message, {MessageProps} from '../Message/Message'
import NoItemsIcon from './Assets/MailBox.svg' 
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from "react-perfect-scrollbar"
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
    const [scrollEl, setScrollEl] = useState<any>(null);

    useEffect( () =>{
        if(scrollEl){
            scrollEl && scrollEl.scrollTo(0, scrollEl.scrollHeight);
        }
    }, [scrollEl, items])

    return(
        <Wrapper  isItems={!!(items && items.length > 1)}>
            {loading ? "" :
                currentDialog && items && items.length > 0 ? 
                <MessagesWrapper>
                    <PerfectScrollbar
                    containerRef={(ref:any) => {
                        setScrollEl(ref);
                        }}
                    >
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
                    </PerfectScrollbar>

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