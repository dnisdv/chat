import styled from 'styled-components'

export const Wrapper = styled.div`
    position:absolute;
    background-color:white;
    display:flex;
    flex-direction:column;
    z-index:99999999;
    top:50px;
    max-width:475px;
    // min-width:419px;
    width:80vw;
    left:50%;
    transform: translateX(-50%);
    z-index:9999999999999999999999999999999999;
    @media (max-width: 732px) {
        width:100vw;
        top:0;
        height:100vh;
    }
`
export const MainDataWrapper = styled.div`
    margin:27px 59px;
    display:flex;
    flex-direction:column;
    overflow-x:auto;
    @media (max-width: 732px) {
        margin:20px 0px 20px 40px;
        padding-right:40px;
    };
    height:100%;
`

export const TopBar = styled.div`
    padding: 15px 15px;
    border-bottom: 1px solid rgb(0,0,0,0.2);
    display:flex;
    justify-content:space-between;
    align-items:center;
`
export const Title = styled.h2`
    margin:0;
    width:281px;
    font-size:20px;
    @media (max-width: 732px) {
       font-size:18px;
    }
`
export const AvatarWrapper = styled.div`
    margin:0 auto;
    position:relative;
`
export const AvatarInput = styled.input`
    display:none;
`
export const AvatarInputLabel = styled.label`
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    cursor:pointer;
    border-radius:50%;
    overfow:hidden;
`
export const FullName = styled.span`
    margin:0 auto;
    font-size:36px;
    font-weight:900;
    font-size:30px;
    margin-top:5px;
    @media (max-width: 732px) {
        font-size:24px;
    }
`


export const SettingList = styled.ul`
    list-style:none;
    margin:0;
    padding:0;
`

export const SettingItem = styled.li`
    margin-top:30px;
    padding:10px 5px;
    &:first-child{
        margin-top:20px; 
    };
    @media (max-width: 732px) {
        margin-top:30px;
        font-size:14px;
    };
    &:hover{
        background-color:rgb(0,0,0,0.05)
    };
    cursor:pointer;
`
export const ItemTitle = styled.span`
    font-size:12px;
    font-weight:700;
    color:rgb(0,0,0, 0.5);
    font-size:12px;
    @media (max-width: 732px) {
        font-size:12px;
    }
`
export const ItemValue = styled.p`
    margin:0;
    font-size:16px;
    margin-top:2px;
    @media (max-width: 732px) {
    }
`

export const LogoutButton = styled.button`
    margin-left:auto;
    display:block;
    background-color:#ff7474;
    border:none;
    padding:11px 21px;
    color:white;
    font-weight:700;
    margin-top:50px;
    border:1px solid #df0000;
    cursor:pointer;
`

export const CloseIcon = styled.img`
    cursor:pointer;
    display:block;
`

export const SettingsWrapper = styled.div`
    width:100vw;
    left:0;
    top:0;
    height:100vh;
    overflow:hidden;
    background-color:rgb(0,0,0,0.3);
    position:absolute;
    z-index:999999999;
`