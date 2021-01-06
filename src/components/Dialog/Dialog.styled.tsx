import styled, {keyframes} from 'styled-components'

type WrapperProps = {
    active:boolean
}

export const Wrapper = styled.div<WrapperProps>`
    display:flex;
    align-items:center;
    background-color:${({active}) => active ? "#F3F3F3" : "inherit"};
    cursor:pointer;
    padding:12px 24px 12px 24px;
    &:hover{
        background-color:#F3F3F3;
    }

`

export const DialogData = styled.div`
    margin-left:12px;
    flex:1;
    width:55%;
`

export const Box = styled.div`
    display:flex;
    align-items:center;
`

export const FullName = styled.span`
    margin:0;
    font-size:16px;
    font-weight:700;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    margin-right:10px;
`
export const LastMessageWrapper = styled.div`
    margin-top:7px;
    display:flex;
    align-items:center;
    overflow:hidden;
`

export const LastMessage = styled.p`
    margin:0;
    font-size:13px;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    max-width:100%;
    margin-right:10px;
    display:flex;
`

export const LastMessageImage = styled.img`
    width:15px;
    height:15px;
    display:block;
    margin-left:10px;
`

export const LastMessageAudio = styled.img`
    width:45px;
    height:20px;
    display:block;
    margin-left:0px;
`

export const TimeWrapper = styled.div`
    margin-left:auto;
    white-space: nowrap;
    font-size:12px;
    font-weight:700;
    color:rgb(0,0,0,0.2);
`
export const NotReaded = styled.div`
    min-width:19px;
    min-height:19px;
    background-color:#46CA63;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:700;
    color:white;
    margin-left:auto;
    padding: 2px;
    font-size: 12px;
    position: absolute;
    right: 24px;
`

export const Username = styled(LastMessage)`
    margin:0;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    max-width:240px;
    margin-top:0px;
    color:rgb(0,0,0,0.6); 
`
export const UsernameWrapper = styled(LastMessageWrapper)`
`



const mercuryTypingAnimation = keyframes`
    0% {
      transform: translateY(0px);
    }
    28% {
      transform: translateY(-7px);
    }
    44% {
      transform: translateY(0px);
    }
`
export const TypingWrapper = styled.div`
    display:flex;
    align-items:flex-end;
`
export const TypingTitle = styled.span`
    font-size:12px;
`

export const Typing = styled.div`
    align-items: center;
    display: flex;
    padding:2px;
    display:flex;
    position:relative;
`

export const TypingDot = styled.div`
    animation: ${mercuryTypingAnimation} 1.8s infinite ease-in-out;
    background-color: #000000;
    border-radius: 50%;
    height: 2px;
    margin-right: 4px;
    vertical-align: middle;
    width: 2px;
    display: inline-block;
    &:nth-child(1){
        animation-delay: 200ms;
    }
    &:nth-child(2){
        animation-delay: 300ms;
    }
    &:nth-child(3){
        animation-delay: 400ms;
    }
`