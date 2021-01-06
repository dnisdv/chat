import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
    display:flex;
    height:100vh;
    max-width:1350px;
    min-with:305px;
    margin:0 auto;
    width:100%;
    padding:0 10px;
    box-sizing: border-box;
    @media (max-width: 732px) {
    };
`

export const SideMenu = styled.div<{
    isSelect:boolean
}>`
    padding-top:33px;
    width:24vw;
    max-width:300px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
    min-width:243px;
    @media (max-width: 732px) {
        max-width:100%;
        width:100%;
        padding:10px 5px;

    }
`
export const MessagesWrapper = styled.div`
    height:100%;
`

export const SideMenuWrapper = styled.div`
    height:100%;
`


export const MessagesMenu = styled.div<{
    isSelect:boolean
}>`
    width:100%;
    height:100%;
    margin-left:62px;
    display:flex;
    flex-direction:column;
    background-color:#F7F6FC;    

    @media (max-width: 1000px) {
        margin-left:20px
    };
    @media (max-width: 732px) {
        position:fixed;
        left: 0%;
        margin-left:0;
        left: ${({isSelect}) => isSelect ? "0%" : "100%"};
    };
    transition:.4s;
`