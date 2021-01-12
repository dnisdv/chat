import styled from 'styled-components'

export const Wrapper = styled.div`
    margin:24px 34px;
    padding-top:14px;
    position:relative;
    @media (max-width: 732px) {
        margin:0;
    }
`
export const ChatWrapper = styled.div`
    background-color:white;
    min-height:55px;
    display:flex;
    align-items:center;
`

export const InputText = styled.textarea`
    height:100%;
    box-sizing:border-box;
    flex:1;
    border:none;
    min-height:55px;
    width:100%; 
    height:55px;
    padding:18px 12px 18px 12px;
    max-height:250px;
    resize:none;
    font-family:inherit;
    display:block;
    &:focus-visible{
        outline:none;
    }
`

export const EmojiImg = styled.img`
    cursor:pointer;

`

export const SendButton = styled.button<{
    notEmpty:boolean
}>`
    height:100%;
    width:45px;
    border:none;
    background-color:#231F30;
    cursor:pointer;
    height:45px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:4px;
    margin-right:12px;
    @media (max-width: 732px) {
        display:${({notEmpty}) => notEmpty ? "flex" : "none"};
        margin-right:0px;
    };
`
export const ControlWrapper = styled.div`
    display:flex;
    align-items:center;
`
export const EmojiControl = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    margin-right:15px;
    padding:4px 5px 2px 5px;
    & > section {
        position:absolute;
        bottom:100%;
        right:0;
        @media (max-width: 732px) {
            right:-20px;
        };
    }
    
`

export const AttachmentWrapper = styled.div`
    cursor:pointer;
    margin-right:15px;
    padding:4px 5px 2px 5px;
`

export const Attachment = styled.img`
`

export const FileUpload = styled.input`
    position:absolute;
    display:none;
`

export const AttachmentLabel = styled.label`
    padding:2px;
    cursor:pointer;
`

export const Controls = styled.div`
    display:flex;
    align-items:center;
    margin-top:auto;
`

export const LeftColumn = styled.div`
    width:100%;
    position:relative;
    box-sizing:border-box
`

export const PreviewAttachment = styled.img`
    width:50px;
    height:50px;
    border-radius:5px;
    margin-left:4px;
    object-fit:cover;
    cursor:pointer;
    display:block;
    &:first-child{
        margin:0;
    };
`

export const AttachmentDelete = styled.div`
    cursor:pointer;
    display:none;

`

export const PreviewAttachmentWrapper = styled.div`
    position:relative;
    margin-left:5px;
    &:first-child{
        margin-left:0;
    };
    width:50px;
    height:50px;
    border-radius:5px;
    background-color:#b6b6b6;
    &:hover ${AttachmentDelete}{
        display:block;
    }
`

export const AttachmentDeleteIcon = styled.img`
    width:20px;
    height:20px;
    position:absolute;
    z-index:9999;
    top:-5px;
    right:-5px;
`

export const PreviewsAttach = styled.div`
    display:flex;
`