import styled from 'styled-components'

export const Wrapper = styled.div`
    display:flex;
    align-items:center;
    padding:10px 32px 10px 12px;
    position:relative;
    cursor:pointer;
    overflow:hidden;
    width:150px;
`

export const Controls = styled.div`
    cursor:pointer;
    z-index:2;
`

export const ControlImg = styled.img`
    display:block;
`

export const ProgressBar = styled.div`
    position:absolute;
    height:100%;
    width:0px;
    background-color:rgb(159, 191, 255);
    left:0;
    z-index:1;
`

export const Wave = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:2;
`

export const WaveImg = styled.img`
    max-width:200px;
    min-width:100px;
    width:70%;
    height:35px;
    display:block;
`

export const Duration = styled.div`
    font-size:13px;
    color:rgb(0,0,0, 0.2);
    z-index:2;

`
