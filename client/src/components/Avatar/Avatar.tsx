import React,{ useState, useEffect } from 'react'
import generateAvatarColor from '../../lib/generateAvatar'
import {
    AvatarWrapper,
    AvatarImage,
    OnlineStatus,
    AvatarImageWrapper,
    AvatarNoImage
} from './Avatar.styled'
import axios from "../../core/axios"


export type AvatarProps = {
    srcImage?:string | null,
    size: number,
    isOnline?:boolean,
    user:{
        firstname:string,
        lastname:string,
    }
    noimageColor?:string,
}
const Avatar = ({size = 50, isOnline, srcImage, user}: AvatarProps) => {
    const [isAvatarExist, setisAvatarExist] = useState(true)
    useEffect(() => {
        if(srcImage){
            axios.get(srcImage).then(() => {
                setisAvatarExist(true)
            })
            .catch((e) =>{
                setisAvatarExist(false)
            })
        }
    }, [srcImage])

    return(
        <AvatarWrapper>
            <AvatarImageWrapper>
                {srcImage && isAvatarExist ? 
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