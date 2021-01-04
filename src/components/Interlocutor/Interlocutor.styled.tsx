import styled from 'styled-components'

export const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    position:relative;
    padding:10px 34px;
    box-sizing:border-box;
    @media (max-width: 732px) {
        padding-top:5px;
        padding: 0px 5px;
    };
`

export const Title = styled.h2`
    margin:0;
    font-size:20px;
    @media (max-width: 732px) {
        font-size:16px;
    }
    
`
export const Menu = styled.div` 

`
export const MenuImg = styled.img`
    cursor:pointer;   
    width:26px;
    height:6px;  
    user-select: none;
    display:block;
`
export const MenuList = styled.ul<{open:boolean}>`
    padding:0;
    margin:0;
    list-style:none;
    position:absolute;    
    width:133px;
    padding:8px 0px;
    right:0;
    top:81%;
    background-color:white;
    margin-right:24px;
    z-index:99999999;
    display:${({open}) => open ? "block": "none"};
    box-shadow:-2px 2px 4px #efefef;

`
export const MenuItem = styled.li`
    padding:6px 4px;
    cursor:default;
    text-align:center;
    margin-top:5px;
    &:hover{
        background-color:#f2f2f2;
    };
`

export const RightSide = styled.div`
    display:flex;
    align-items:center;
`

export const MenuImgWrapper = styled.div`
    width:38px;
    height:30px;
    margin-left:31px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    &:active{
        background-color:#ebebeb;
    };
    @media (max-width: 732px) {
        margin-left:15px;
    }
`
export const LeftSide = styled.div`
    display:flex;   
    align-items:center;
    @media (max-width: 732px) {
        &:hover{
            background-color:#e6e6e6;
            cursor:pointer
        }
    };
`
export const LeftSideData = styled.div`
    display:flex;
    flex-direction:column;
`
export const BackArrowImage = styled.img`
    display:none;
    @media (max-width: 732px) {
        height:100%;
        display:block;
    };
`
export const LastSeen = styled.div`
    font-size:16px;
    color: rgb(0,0,0,0.5);
    margin-top:5px;
    @media (max-width: 732px) {
        font-size:12px;
    }
`
export const OnlineStatus = styled(LastSeen)`

`