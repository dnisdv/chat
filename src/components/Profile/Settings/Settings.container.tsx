import React, { useState } from 'react'
import SettingsComponent from './Settings'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, User_UdateAvatar } from '../../../redux/user/actions'
import { useHistory } from 'react-router-dom'
import { UserState } from '../../../redux/user/types'

type SettingsContainerProps = {
    closeSettings:() => void
    closeModal:(e:React.MouseEvent<HTMLDivElement>) => void
}

export type UpdateItems = "FULLNAME" | "USERNAME" | "EMAIL" | "ABOUT_ME" | null

const Settings = (props: SettingsContainerProps) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state:{user: UserState}) => state.user.data)
    const [selectedItem, setselectedItem] = useState<UpdateItems>(null)

    const LogoutUser = () => dispatch(userLogout(history))
    const SelectItem = (name: UpdateItems) => setselectedItem(name)
    const closeSettingItem = () => setselectedItem(null)
    const closeItemModal = (e: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        if(e.target.className.includes("SettingsBack")){
            e.stopPropagation()
            setselectedItem(null)
        }
    }

    const updateAvatar = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            dispatch(User_UdateAvatar(e.target.files[0]))
        }
    }


    if(!user) return (<></>)
    return(
        <SettingsComponent 
        user={user} 
        LogoutUser={LogoutUser} 
        SelectItem={SelectItem}
        closeItemModal={closeItemModal}
        closeSettingItem={closeSettingItem}
        selectedItem={selectedItem}
        updateAvatar={updateAvatar}
        {...props} />
    )
}

export default Settings