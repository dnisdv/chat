import styled from 'styled-components'

export const Wrapper = styled.div`
    position:absolute;
    top:0;
    width:250px;
    background-color:white;
    z-index:999999999999999999999999999;
    display:flex;
    flex-direction:column;
    padding:15px 27px;
    left:50%;
    transform:translateX(-50%);
    top:60px;
    border-radius:3px;
    
`
export const Form = styled.form`
    display:flex;
    flex-direction:column;
`
export const Title = styled.span`
    font-size:18px;
    font-weight:700;
`
export const Description = styled.span`
    font-size:14px;
    color: rgb(0,0,0,0.6);
    width:70%;
    margin-top:5px;
`
export const Input = styled.input`
    padding:10px;
    margin-top:15px;
`

export const ConfirmButton = styled.button`
    background:none;
    border:none;
    margin-left:auto;
    cursor:pointer;
    padding:5px;
    font-weight:700;
`
export const CancelButton = styled.button`
    border:none;
    background:none;
    cursor:pointer;
    padding:5px;
    font-weight:700;
`
export const Actions = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:40px;
`

export const Background = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
`