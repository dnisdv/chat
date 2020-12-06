import styled, {keyframes} from 'styled-components'

export const Wrapper = styled.div`
    width:100%;
    display:flex;
    position:relative;
`

export const SearchInput = styled.input`
    height:43px;
    flex:1;
    border:none;
    border-radius: 4px;
    padding:0px 19px 0px 19px;
`

const Fade = keyframes`
    0%{
        opacity:0;
    }
    100%{
        opacity:1;
    }
`

export const SearchIMG = styled.img`
    position:absolute;
    width:18px;
    height:18px;
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    right:18px;
    opacity:0.7;
    transition:0.2s;
    animation-name: ${Fade};
    animation-duration: 1s;
`
export const CloseIMGWrapper = styled.div`
    padding:4px;
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    right:18px;
    cursor:pointer;
`
export const CloseIMG = styled.img`
    width:15px;
    height:15px;
    opacity:0.7;
    transition:0.2s;
    animation-name: ${Fade};
    animation-duration: 1s;
`

