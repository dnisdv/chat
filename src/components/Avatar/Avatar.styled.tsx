import styled from 'styled-components'

type AvatarImageProps = {
    size: number;
} & React.ImgHTMLAttributes<HTMLImageElement>

export const AvatarWrapper = styled.div`
    display:flex;
    position:relative;
`

export const AvatarImage = styled.img<AvatarImageProps>`
    width:${({size}) => size + "px" };
    height:${({size}) => size + "px" };
    object-fit: cover;
    border-radius:50%;
`

export const OnlineStatus = styled.div`
    width:17%;
    height:17%;
    background-color: #46CA63;
    display:block;
    position:absolute;
    z-index:1111111;
    bottom:5%;
    right:6%;
    border-radius:50%;
`
export const AvatarImageWrapper = styled.div`
    position:relative;
`