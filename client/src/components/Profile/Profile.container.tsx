import React, { useState } from 'react'
import ProfileComponent from './Profile'
import {useSelector} from 'react-redux'
import { UserState } from '../../redux/user/types'

const Profile = () => {
    const user = useSelector((state:{user:UserState}) => state.user)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const openSettings = () => setSettingsOpen(true)
    const closeSettings = () => setSettingsOpen(false)
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        if(e.target.className.includes("SettingsBack")){
            e.stopPropagation()
            closeSettings()
        }
    }

    if(!user.data) return <></>
    return(
        <ProfileComponent 
            openSettings={openSettings}
            closeSettings={closeSettings}
            closeModal={closeModal}
            isSettingsOpen={settingsOpen}
            user={{ 
                username:user.data.username,
                firstname:user.data.firstname,
                lastname:user.data.lastname,
                avatar:user.data.avatar ? user.data.avatar : null,
            }}
        />
    )
}

export default Profile