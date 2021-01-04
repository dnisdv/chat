import React from 'react'
import ProfileComponent from './Profile'
import {useSelector} from 'react-redux'
import { UserState } from '../../redux/user/types'

const Profile = () => {
    const user = useSelector((state:{user:UserState}) => state.user)
    return(
        <ProfileComponent 
            user={{ 
                username:user.data.username,
                firstname:user.data.firstname,
                lastname:user.data.lastname,
                avatar:"",
            }}
        />
    )
}

export default Profile