import styled from 'styled-components'

type AvatarImageProps = {
    size: number;
} & React.ImgHTMLAttributes<HTMLImageElement>

export const AvatarWrapper = styled.div`
    display:flex;
    position:relative;
`

export const AvatarNoImage = styled.div<AvatarImageProps>`
    width:${({size}) => size + "px" };
    height:${({size}) => size + "px" };
    object-fit: cover;
    border-radius:50%;
    display:block;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:700;
    user-select:none;
    color:white;
    font-size:${({size}) => size / 3 + "px" };
`

export const AvatarImage = styled.img<AvatarImageProps>`
    width:${({size}) => size + "px" };
    height:${({size}) => size + "px" };
    object-fit: cover;
    border-radius:50%;
    display:block;
`

export const OnlineStatus = styled.div`
    width:17%;
    height:17%;
    background-color: #46CA63;
    display:block;
    position:absolute;
    z-index:4;
    bottom:5%;
    right:6%;
    border-radius:50%;
`
export const AvatarImageWrapper = styled.div`
    position:relative;
`