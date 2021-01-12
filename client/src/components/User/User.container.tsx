import React from 'react'
import UserComponent ,{UserProps} from './User'
import {Userdata} from '../../redux/user/types'
import { selectUser } from '../../redux/dialogs/actions'
import { useDispatch } from 'react-redux'
import { clearMessages } from '../../redux/messages/actions'

const User = (props:UserProps) => {
    const dispatch = useDispatch()

    const onSelectUser = (user:Userdata) => {
       dispatch(selectUser(user))
       dispatch(clearMessages())
    }

    return(
        <UserComponent selectUser={onSelectUser} {...props} />
    )
}

export default User