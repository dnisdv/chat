import styled from 'styled-components'

export const Wrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    padding-bottom:20px;
`

export const DataWrapper = styled.div`
    margin-left:27px;
`

export const FullName = styled.p`
    margin:0;
    font-size:18px; 
    font-weight:700;
    max-width:240px;
`

export const Username = styled.p`
    margin:0;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    max-width:240px;
    margin-top:4px;
    color:rgb(0,0,0,0.6);   
`
export const EditIMGwrapper = styled.div`
    margin-left:auto;
    cursor:pointer;
`
export const EditIMG = styled.img`
    width:19px;
    height:19px;
`