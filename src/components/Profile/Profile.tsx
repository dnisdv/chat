import React from 'react'
import Avatar from '../Avatar/Avatar'
import EditIcon from './Assets/edit.svg'
import {
    Wrapper,
    FullName,
    Username,
    EditIMGwrapper,
    EditIMG,
    DataWrapper
} from './Profile.styled'

export type ProfileProps = {
    user:{
        firstName:string,
        lastName:string,
        avatar:string
    }
}

const Profile = ({user}: ProfileProps) => {
    return(
        <Wrapper>
            <Avatar size={50} srcImage={user.avatar} />
            <DataWrapper>
                <FullName>{user.firstName + " " + user.lastName}</FullName>
                <Username>@dnisdv</Username>
            </DataWrapper>
            <EditIMGwrapper>
                <EditIMG src={EditIcon} />
            </EditIMGwrapper>
            
        </Wrapper>
    )
}

export default Profile