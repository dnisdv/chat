import React from 'react'
import Avatar from '../Avatar/Avatar'
import EditIcon from './Assets/edit.svg'
import Settings from './Settings/Settings.container'
import {
    Wrapper,
    FullName,
    Username,
    EditIMGwrapper,
    EditIMG,
    DataWrapper,
} from './Profile.styled'

export type ProfileProps = {
    user:{
        username:string,
        firstname:string,
        lastname:string,
        avatar:{
            filename:string,
            path:string
        } | null
    },
    closeSettings:() => void
    openSettings:() => void
    closeModal:(e: React.MouseEvent<HTMLDivElement>) => void
    isSettingsOpen:boolean
}

const Profile = ({
    user, 
    isSettingsOpen, 
    openSettings, 
    closeSettings, 
    closeModal
}: ProfileProps) => {
    return(
        <Wrapper>
            <Avatar 
                size={50} 
                srcImage={user.avatar ? user.avatar.path : ""} 
                user={{
                    firstname:user.firstname,
                    lastname:user.lastname
                }}
            />
            <DataWrapper>
                <FullName>{user.firstname + " " + user.lastname }</FullName>
                <Username>@{user.username }</Username>
            </DataWrapper>
            <EditIMGwrapper onClick={openSettings}>
                <EditIMG src={EditIcon} />
            </EditIMGwrapper>
                {isSettingsOpen ? 
                        <Settings closeModal={closeModal} closeSettings={closeSettings} />
                :""}

        </Wrapper>
    )
}

export default Profile