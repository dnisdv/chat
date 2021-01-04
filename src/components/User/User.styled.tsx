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

export const UserData = styled.div`
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

export const Username = styled.p`
    margin:0;
    font-size:13px;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    max-width:100%;
    margin-right:10px;
    max-width:240px;
    margin-top:0px;
    color:rgb(0,0,0,0.6); 
`
export const UsernameWrapper = styled.div`
    margin-top:7px;
    display:flex;
    align-items:center;
`