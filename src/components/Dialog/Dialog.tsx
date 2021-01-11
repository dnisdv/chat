import React from 'react'
import {
    Wrapper,
    DialogData,
    FullName,
    LastMessage,
    Box,
    TimeWrapper,
    NotReaded,
    LastMessageWrapper,
    LastMessageImage,
    LastMessageAudio,
    Typing,
    TypingDot,
    TypingWrapper,
    TypingTitle
} from './Dialog.styled'
import imagePlaceholder from './Assets/imagePlaceholder.png'
import Avatar from '../Avatar/Avatar'
import SoundVawe from '../../Assets/img/sound-waves.svg'
import { getHours, getMinutes, formatDistanceStrict, isToday } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Dialog as DialogType } from '../../redux/dialogs/types'
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';


const formateDate = (date:string) => {
    const parseddate = Date.parse(date)
    if(isToday(+parseddate)){
        // n < 10 ? "add 0 in face" : n
        return (getHours(+parseddate) < 10 ? "0" + getHours(+parseddate) : getHours(+parseddate)) + " : " + (getMinutes(+parseddate) < 10 ? "0" + getMinutes(+parseddate) : getMinutes(+parseddate))
    }else{
        return formatDistanceStrict(+parseddate, new Date(), { addSuffix: true, locale: enUS })
    }
}


export type DialogProps = {
    dialog:DialogType,
    user:{
        firstname:string,
        lastname:string,
        avatar:{
            filename:string,
            path:string
        } | null,
        username :string,
        isOnline?:boolean
    }
    lastMessage:{
        message:string,
        date:string,
        fromMe:boolean,
        audio?:{
            filename:string,
            path:string,
        },
        attachments?:{
            filename:string,
            path:string
        }[]
    } | null,
    notReadedCount:number | null
    active?:boolean,
    onClick?: (dialog:DialogType) => void,
    isTyping?:boolean
}

const Dialog  = ({user, lastMessage, notReadedCount, active=false, onClick, dialog, isTyping}: DialogProps) => {
    return(
        <Wrapper onClick={() => onClick && onClick(dialog)} active={active}>
            <Avatar 
                size={50} 
                srcImage={user.avatar ? user.avatar.path : ""} 
                isOnline={user.isOnline}
                user={{
                    firstname: user.firstname,
                    lastname: user.lastname
                }}
            ></Avatar>
            <DialogData>
                <Box>
                    <FullName>{user.firstname + " " + user.lastname}</FullName>
                    {lastMessage ? 
                        <TimeWrapper>
                            {formateDate(lastMessage.date)}
                        </TimeWrapper> : "" }

                </Box>
                <LastMessageWrapper>

                    {isTyping ? 
                        <TypingWrapper>
                            <TypingTitle>Typing</TypingTitle>
                                <Typing>
                                    <TypingDot />
                                    <TypingDot />
                                    <TypingDot />
                                </Typing>
                        </TypingWrapper>
                    : 
                        lastMessage ? 
                        <LastMessage>
                        {lastMessage.fromMe ? <span>You: </span>: ""}
                        {!lastMessage ? "Error":
                            lastMessage.audio ? <LastMessageAudio src={SoundVawe} /> : 
                            lastMessage.attachments && lastMessage.attachments.length > 0  ? <LastMessageImage src={imagePlaceholder} /> :

                            reactStringReplace(lastMessage.message, /:(.+?):/g, (match, i) => (
                                <Emoji key={i} emoji={match} set="apple" size={18} />
                            ))
                        }
                        </LastMessage>
                    : ""}
                    
                    
                {  lastMessage ? notReadedCount && notReadedCount > 0 ? <NotReaded>{notReadedCount > 99 ? "99+" : notReadedCount}</NotReaded> : "" : "" }
                </LastMessageWrapper> 

            </DialogData>
        </Wrapper>
    )
}

export default Dialog