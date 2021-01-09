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
    AttachmentsWrapper
} from './Message.styled'
import { formatDistance } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';


export type IsMeProps = {
    isMe? :boolean
}

export type MessageProps = {
    id: string,
    text? : string,
    attachments?: {
        _id:string,
        filename:string,
        path:string
    }[],
    user: {
        firstname:string,
        lastname:string,
        avatar:{
            filename:string,
            path:string
        },
    },
    readed?:boolean,
    audio?:{
        filename:string,
        path: string
        },
    createdAt: string,
    isTyping?: boolean
} & IsMeProps



const Message = ({id, text, user, isMe, readed, attachments, audio, createdAt, isTyping}: MessageProps) => {
    return (
        <MessageWrapper isMe={isMe}>
            <AvatarWrapper isMe={isMe} className="Avatar_Wrapper">
                <Avatar 
                    isOnline 
                    size={35} 
                    srcImage={user.avatar ? user.avatar.path : null} 
                    user={{
                        firstname: user.firstname,
                        lastname:user.lastname
                    }} />
            </AvatarWrapper>

            <MessageBubble attachment={!!(attachments)} isMe={isMe} >
                    {attachments ?<AttachmentsWrapper isText={!!(text)} >{attachments.map( (i) =>  {
                            return <AttachmentImage key={i._id} isSingle={attachments.length === 1} src={"/" + i.path}  />
                    })}</AttachmentsWrapper>
                    : ""}

                    {audio ? <MessageAudio AudioUrl={"/" + audio.path} /> : text ? <MessageText isMe={isMe}>

                    {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                        <Emoji key={i} emoji={match} set="apple" size={18} />
                    ))}
                    </MessageText> : ""}
        
                    {isMe ? <ReadStatus >
                        {readed ? <ReadIcon src={ReadedIcon} width="16px" height="10px" /> : <ReadIcon src={CheckIcon} width="11px" height="8px" />}
                    </ReadStatus> : ""}
            </MessageBubble>
            {/* } */}
            <TimeWrapper isMe={isMe} >
                    {formatDistance(new Date(), new Date(), { addSuffix: true, locale: enUS })}
            </TimeWrapper>

        </MessageWrapper>
    )   
}



export default Message