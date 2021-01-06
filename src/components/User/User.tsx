import React from 'react'
import {
    Wrapper,
    UserData,
    FullName,
    Box,
    Username,
    UsernameWrapper
} from './User.styled'
import Avatar from '../Avatar/Avatar'
import { Userdata } from '../../redux/user/types'

export type UserProps = {
    user:Userdata & {avatar:string},
    active:boolean,
    selectUser?: (user:Userdata) => void
}

const User = ({user, active, selectUser}: UserProps) => {
    return(
        <Wrapper onClick={() => selectUser ?  selectUser(user) :""} active={active}>
            <Avatar 
                size={60} 
                srcImage={user.avatar ? user.avatar.path : null} 
                user={{
                    firstname: user.firstname,
                    lastname: user.lastname
                }}
            ></Avatar>
            <UserData>
                <Box>
                    <FullName>{user.firstname + " " + user.lastname}</FullName>
                </Box>
                <UsernameWrapper>
                    <Username>@{user.username}</Username>
                </UsernameWrapper> 
            </UserData>
        </Wrapper>
    )
}

export default User