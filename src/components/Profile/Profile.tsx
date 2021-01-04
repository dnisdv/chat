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
        username:string,
        firstname:string,
        lastname:string,
        avatar:string
    }
}

const Profile = ({user}: ProfileProps) => {
    return(
        <Wrapper>
            <Avatar 
                size={50} 
                srcImage={user.avatar} 
                user={{
                    firstname:user.firstname,
                    lastname:user.lastname
                }}
                
            />
            <DataWrapper>
                <FullName>{user.firstname + " " + user.lastname }</FullName>
                <Username>@{user.username }</Username>
            </DataWrapper>
            <EditIMGwrapper>
                <EditIMG src={EditIcon} />
            </EditIMGwrapper>
            
        </Wrapper>
    )
}

export default Profile