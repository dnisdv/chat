import styled from "styled-components"

export const Wrapper = styled.div`
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
    overflow:auto;
    margin-top:auto;
    @media (max-width: 490px) {
        padding:0px;
    }
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

`