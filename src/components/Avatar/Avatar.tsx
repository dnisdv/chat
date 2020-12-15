import React from 'react'
import {AvatarWrapper, AvatarImage, OnlineStatus, AvatarImageWrapper} from './Avatar.styled'

export type AvatarProps = {
    user:{
        firstName: string,
        lastName: string,
    },
    srcImage:string
    size: number,
    isOnline?:boolean
}
const Avatar = ({size = 50, isOnline, user, srcImage}: AvatarProps) => {
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