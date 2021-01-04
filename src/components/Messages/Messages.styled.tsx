import styled, { keyframes } from "styled-components"

export const Wrapper = styled.div<{
    isItems:boolean
}>`
    height:${({isItems}) => isItems ? "auto" : "100%"};
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
    overflow:hidden;
    margin-top:auto;
    justify-content:flex-end;
    @media (max-width: 490px) {
        padding:0px;
    };
    @media (max-width: 732px) {
        padding:10px 0px;
    }
`
export const MessagesWrapper = styled.div`
    overflow:auto;
    position:relative;
`
export const MessageWrapper = styled.div`
    margin-bottom:37px;
    &:last-child{
        margin-bottom:0px;
    }
`

export const NoItemsWrapper = styled.div`
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`
export const NoItemsFeedbackImage = styled.img`
    width:82px;
    height:82px;
    opacity:0.4

`
export const NoItemsTitle = styled.h4`
    margin:0;
    font-size:20px;
    font-weight:700;
    margin-top:25px;
    opacity:0.4

`

export const NoItemsDescription = styled.p`
    margin:0;
    text-align:center;
    font-size:16px;
    margin-top:11px;
    opacity:0.4;
    width:390px;
    @media (max-width: 730px) {
        width:350px
    }
`

export const TypingWrapper = styled.div`
    display:flex;
    align-items:flex-end;
    padding:0px 34px;
    padding-top:5px;
    @media (max-width: 732px) {
        padding:0px 5px;
    };
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