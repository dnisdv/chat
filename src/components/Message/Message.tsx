import React from 'react'
import Avatar from '../Avatar/Avatar'
import CheckIcon from './assets/check.svg'
import ReadedIcon from './assets/readed.svg'
import MessageAudio from './MessageAudio/MessageAudio.container'
import { MessageWrapper,
    MessageText,
    TimeWrapper,
    AvatarWrapper,
    MessageBubble,
    ReadStatus,
    ReadIcon,
    AttachmentImage,
    AttachmentsWrapper,
    } from './Message.styled'
import { formatDistance } from 'date-fns'
import { enUS } from 'date-fns/locale'

export type IsMeProps = {
    isMe? :boolean
}

export type MessageProps = {
    children? : string,
    attachments?: {
        filename:string,
        url:string
    }[],
    user: {
        firstName:string,
        lastName:string,
        avatar:string,
    },
    readed?:boolean,
    audio?:{
        audioname:string,
        url: string
        },
} & IsMeProps



const Message = ({children, user, isMe, readed, attachments, audio}: MessageProps) => {
    return (
        <MessageWrapper isMe={isMe}>
            <AvatarWrapper className="Avatar_Wrapper">
                <Avatar isOnline size={35} user={user} />
            </AvatarWrapper>

            <MessageBubble attachment={!!(attachments)} isMe={isMe} >
                {attachments ?<AttachmentsWrapper isText={!!(children)} >{attachments.map( (i) =>  {
                        return <AttachmentImage isSingle={attachments.length === 1} src={i.url}  />
                })}</AttachmentsWrapper>
                : ""}

                {audio ? <MessageAudio AudioUrl={audio.url} /> : children ? <MessageText>{children}</MessageText> : ""}
    
                {isMe ? <ReadStatus >
                    {readed ? <ReadIcon src={ReadedIcon} width="16px" height="10px" /> : <ReadIcon src={CheckIcon} width="11px" height="8px" />}
                </ReadStatus> : ""}
            </MessageBubble>

            <TimeWrapper isMe={isMe} >
                {formatDistance(new Date(), new Date(), { addSuffix: true, locale: enUS })}
            </TimeWrapper>
        </MessageWrapper>
    )   
}



export default Message