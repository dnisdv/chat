import React from 'react'
import FoundUsersComponent from './FoundUsers'
import { useSelector } from 'react-redux'
import { DialogState } from '../../redux/dialogs/types'
import { Userdata } from '../../redux/user/types'

const FoundUsers = () => {
    const foundUsers = useSelector( (state:{dialog:DialogState}) => state.dialog.usersfound)
    return(
        <FoundUsersComponent 
            items={foundUsers ? foundUsers.map( (i:Userdata) => {
                return {
                    user:{
                        _id:i._id,
                        firstname:i.firstname,
                        lastname:i.lastname,
                        avatar:"",
                        username:i.username,
                        email:i.email,
                        createdAt:i.createdAt,
                        isOnline:false,
                        last_seen:i.last_seen
                    }
                }
            }): ""}
        />
    )
}

export default FoundUsers