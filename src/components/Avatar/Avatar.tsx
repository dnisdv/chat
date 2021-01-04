import React from 'react'
import generateAvatarColor from '../../lib/generateAvatar'
import {
    AvatarWrapper,
    AvatarImage,
    OnlineStatus,
    AvatarImageWrapper,
    AvatarNoImage
} from './Avatar.styled'

export type AvatarProps = {
    srcImage?:string
    size: number,
    isOnline?:boolean
    user:{
        firstname:string,
        lastname:string,
    }
    noimageColor?:string,
}
const Avatar = ({size = 50, isOnline, srcImage, user}: AvatarProps) => {
    return(
        <AvatarWrapper>
            <AvatarImageWrapper>
                {srcImage ? 
                    <AvatarImage 
                        size={size} 
                        width={size} 
                        height={size} 
                        src={srcImage} 
                        alt="user image" />
                 : 
                    <AvatarNoImage
                        size={size} 
                        width={size} 
                        height={size} 
                        alt="user image"
                        style={{
                            backgroundColor: generateAvatarColor(user.firstname, user.lastname)
                        }}
                    >{user.firstname[0]?.toUpperCase() + "" + user.lastname[0]?.toUpperCase()}</AvatarNoImage>
                 }

                    
                {isOnline ? <OnlineStatus />: ""}
            </AvatarImageWrapper>
        </AvatarWrapper>
    )
}

export default Avatar