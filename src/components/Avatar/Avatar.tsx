import React from 'react'
import {AvatarWrapper, AvatarImage, OnlineStatus, AvatarImageWrapper} from './Avatar.styled'

export type AvatarProps = {
    srcImage:string
    size: number,
    isOnline?:boolean
}
const Avatar = ({size = 50, isOnline, srcImage}: AvatarProps) => {
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