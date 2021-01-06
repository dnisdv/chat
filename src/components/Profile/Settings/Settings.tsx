import React from 'react'
import Avatar from '../../Avatar/Avatar'
import {
    Wrapper,
    TopBar,
    Title,
    ItemTitle,
    SettingList,
    SettingItem,
    ItemValue,
    AvatarWrapper,
    FullName,
    LogoutButton,
    CloseIcon,
    MainDataWrapper,
    AvatarInput,
    AvatarInputLabel,
    SettingsWrapper
} from './Settings.styled'
import closeIcon from '../../../Assets/img/close.svg'
import { Userdata } from '../../../redux/user/types'
import UpdateForm from './UpdateForm/UpdateForm'
import { UpdateItems } from './Settings.container'

export type SettingsProps = {
    closeSettings:() => void,
    LogoutUser?:() => void,
    user:Userdata,
    SelectItem: (name:UpdateItems) => void,
    selectedItem:UpdateItems,
    closeModal:(e:React.MouseEvent<HTMLDivElement>) => void,
    closeItemModal:(e: React.MouseEvent<HTMLDivElement>) => void,
    closeSettingItem:() => void,
    updateAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Settings = ({closeSettings, LogoutUser, user, SelectItem, selectedItem, closeModal, closeItemModal, closeSettingItem, updateAvatar}: SettingsProps) => {

    return(
        <SettingsWrapper className="SettingsBack" onClick={selectedItem ? closeItemModal : closeModal}>
            <Wrapper className="Settings">
                <TopBar>
                    <Title>Edit profile</Title>
                    <CloseIcon
                        onClick={closeSettings} 
                        src={closeIcon} 
                        width="15px" 
                        height="15px" 
                    />
                </TopBar>
                <MainDataWrapper>
                        <AvatarWrapper> 
                            <Avatar
                            srcImage={user.avatar ? user.avatar.path : null} 
                            size={160} 
                            user={{
                                firstname:user.firstname,
                                lastname:user.lastname
                            }} />
                            <AvatarInput onChange={updateAvatar} name="avatar" type="file" id="avatarFile#443" accept="image/x-png,image/gif,image/jpeg"/>
                            <AvatarInputLabel htmlFor="avatarFile#443" ></AvatarInputLabel>
                        </AvatarWrapper>
                        <SettingList>
                            <SettingItem onClick={() => SelectItem("FULLNAME")}>
                                <ItemTitle>FULLNAME</ItemTitle>
                                <ItemValue>{user.firstname} {user.lastname}</ItemValue>
                            </SettingItem>

                            <SettingItem onClick={() => SelectItem("USERNAME")} >
                                <ItemTitle>USERNAME</ItemTitle>
                                <ItemValue>@{user.username}</ItemValue>
                            </SettingItem>

                            <SettingItem onClick={() => SelectItem("EMAIL")} >
                                <ItemTitle>EMAIL</ItemTitle>
                                <ItemValue>{user.email}</ItemValue>
                            </SettingItem>

                            <SettingItem onClick={() => SelectItem("ABOUT_ME")}>
                                <ItemTitle>ABOUT ME</ItemTitle>
                                <ItemValue>
                                    {user.bio}
                                </ItemValue>
                            </SettingItem>
                        </SettingList>
                        <LogoutButton onClick={LogoutUser}>Log out</LogoutButton>
                        {selectedItem ?  
                        <UpdateForm
                            closeSettingItem={closeSettingItem}
                            name={selectedItem}
                        /> : ""}
                </MainDataWrapper>
            </Wrapper>
        </SettingsWrapper>

    )
}

export default Settings
