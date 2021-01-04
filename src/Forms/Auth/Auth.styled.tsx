import styled from 'styled-components'

export const Wrapper = styled.div`
`

export const Title = styled.h1`
    margin:0;
    font-size:40px;
    font-weight:200;
`

export const SwitchParagraph = styled.p`
    margin:0;
    margin-top:7px;
    & a {
        color:black;
    }
`


export const Form = styled.form`
    display:flex;
    flex-direction:column;
`

export const FormInputWrapper = styled.div`
    background-color:white;
    position:relative;
    margin-top:30px;
    &:first-children{
        margin-top:20px;
    };
    display:flex;
    align-items:center;
`
export const InputImage = styled.img`
    display:block
    width:20px;
    height:20px;
`

export const FormInputLabel = styled.label`
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    margin-left:2px;
    transition:.05s;
    padding-left:5px;
    padding-right:5px;
    left:0;
    cursor:text;
    margin-left:25px;
`
export const FormInput = styled.input`
    margin-left:10px;
    width:100%;
    padding:13px 0px 13px 0px; 
    border:none;
    background:inherit;
    border-bottom: 1px solid #B557FF;
    background:inherit;
    &:not([value=""]) ~ ${FormInputLabel}{
        top:0%;
        transition:.05s;
        font-size:12px;
        padding-left:5px;
    }
    &:focus + ${FormInputLabel}{
        top:0px;
        font-size:12px;
        padding-left:5px;
        outile:none;
    };
    &:invalid{
        box-shadow: none;
    };      
    &:autofill {
        border: 1px solid green;
        -webkit-text-fill-color: green;
        -webkit-box-shadow: 0 0 0px 1000px #000 inset;
        transition: background-color 5000s ease-in-out 0s;
    }   
    &:focus-visible{
        outline:none;
    }
`

export const RememberMe = styled.div`
    display:flex;
`

export const RememberMeCustomCheckbox = styled.label`
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 5px;
    position:relative;
`
export const RememberMeLabel = styled.label`
    margin-left:13px;
    cursor:pointer;
    user-select: none;
`

export const RememberMeCheckbox = styled.input`
    display:none;
    &:checked + ${RememberMeCustomCheckbox}::before{
        content:"";
        width:14px;
        height:14px;
        display:block;
        position:absolute;
        background-color:#B557FF;
        border-radius: 5px;
        left:50%;
        top:50%;
        transform:translateX(-50%) translateY(-50%);
        transition:.2s;
    }
`

export const FormSubmit = styled.button`
    height: 64px;
    background-color: #B557FF;
    border-radius:55px;
    width:100%;
    max-width:500px;
    margin:0 auto;
    border:none;
    font-size:18px;
    color:white;
    cursor:pointer;
    margin-top:30px;
`

export const Additional = styled.div`
    display:flex;
    margin-top:30px;
    justify-content:space-between;
`

export const ForgetPassword = styled.p`
    margin:0;
    & a{ 
        color:black;
        text-decoration:none;
    }
`

export const ErrorFeedback = styled.span`
    color:rgba(255, 87, 87, 1);
    font-size:14px;
    position:absolute;
    white-space:nowrap;
    top:50%;
    transform:translateY(-50%) translateX(100%) ;
    right:-20px;
`

export const ServerErrorFeedback = styled.span`
    font-size:14px;
    color:rgba(255,87,87,1);
    display:block;
    margin-top:10px;
`
// export const 