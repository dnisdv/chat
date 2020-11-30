import React from 'react'
import {AvatarWrapper, AvatarImage, OnlineStatus, AvatarImageWrapper} from './Avatar.styled'

export type AvatarProps = {
    user:{
        firstName: string,
        lastName: string
    }
    size: number,
    srcImage:string,
    isOnline?:boolean
}
const Avatar = ({size = 50, srcImage, isOnline}: AvatarProps) => {
    return(
        <AvatarWrapper>
            <AvatarImageWrapper>
                <AvatarImage 
                    size={size} 
                    width={size} 
                    height={size} 
                    src={srcImage} 
                    alt="user image" />
                    
                {isOnline ? <OnlineStatus />: ""}
            </AvatarImageWrapper>
        </AvatarWrapper>
    )
}

export default Avatar