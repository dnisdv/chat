import styled from 'styled-components'
import {IsMeProps} from './Message'

type MessageWrapperProps ={
} & IsMeProps

type MessageBubbleProps = {
    attachment:boolean
} & IsMeProps

type AttachmentImageProps = {
    isSingle:boolean,
}
type AttachmentWrapperProps = {
    isText:boolean
}

export const MessageWrapper = styled.div<MessageWrapperProps>`
    display: grid;
    grid-template-columns: ${({isMe}) => isMe ? "auto auto" : "auto auto" };
    grid-template-rows: auto auto;
    grid-column-gap: 10px;
    grid-template-areas: ${({isMe}) => isMe ?   '"message avatar"' : '"avatar message"' } ;
    justify-content: ${({isMe}) => isMe ? "end" : "start"};
    max-width:80%;
    ${({isMe}) => isMe ? "margin-left:auto" : ""};
}
`

export const MessageText = styled.span`
    line-height:130.2%;
    padding:15px 50px 15px 12px;
    font-size:14px;
    @media (min-width: 560px) {
        font-size:16px;
    }
`

export const AvatarWrapper = styled.div`
    margin-top:auto;
    grid-area:avatar;
    display:none;
    @media (min-width: 560px) {
        display:block;
    }
`

export const MessageBubble = styled.div<MessageBubbleProps>`
    background-color:white;
    grid-area:message;
    display:flex;
    flex-direction:${({isMe}) => isMe ? "row-reverse" : "row"} ;
    position:relative;
    flex-direction: ${({attachment}) => attachment ? 'column' : 'column-reverse' };
    max-width:600px;
    width:100%;
    background-color:${({isMe}) => isMe ? "#E4EDFF" : "white" };
`

export const ReadStatus = styled.div<IsMeProps>`
    margin-top:auto;
    position:absolute;
    bottom:10px;
    right:10px;
    z-index:2;
`

export const ReadIcon = styled.img`
    display:block;
`
export const TimeWrapper = styled.div<IsMeProps>`
    grid-column: ${({isMe}) => isMe ? "1/2" : "2/3"};
    margin:${({isMe}) => isMe ? "0 0 0 auto" : "0 auto 0 0"};
    margin-top:12px;
    font-size: 13px;    
    color:rgb(0,0,0,.2);
`
export const AttachmentImage = styled.img<AttachmentImageProps>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-width:150px;
    height:${({isSingle}) => isSingle ? "auto" : "200px"};
    padding:4px;
    flex:1;
    border-radius: 15px;
    max-width:600px;
    max-height:600px;
    
`
export const AttachmentsWrapper = styled.div<AttachmentWrapperProps>`
    display:flex;   
    flex-wrap:wrap;
`