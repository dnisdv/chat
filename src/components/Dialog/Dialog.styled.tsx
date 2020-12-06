import styled from 'styled-components'

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
`
export const LastMessageWrapper = styled.div`
    margin-top:7px;
    display:flex;
    align-items:center;
`

export const LastMessage = styled.p`
    margin:0;
    font-size:13px;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    max-width:100%;
    margin-right:10px;
`

export const TimeWrapper = styled.div`
    margin-left:auto;
    white-space: nowrap;
    font-size:12px;
    font-weight:700;
    color:rgb(0,0,0,0.2)
`
export const NotReaded = styled.div`
    min-width:19px;
    min-height:19px;
    width:19px;
    height:19px;
    background-color:#46CA63;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:700;
    color:white;
    margin-left:auto;
`