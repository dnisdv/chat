import React,{useState} from 'react'
import InterlocutorComponent from './Interlocutor'
import { useSelector, useDispatch } from 'react-redux'
import { DialogState } from "../../redux/dialogs/types"
import { UserState } from '../../redux/user/types'
import { resetCurrentDialog, removeDialog } from '../../redux/dialogs/actions'
import { clearMessages } from '../../redux/messages/actions'

const Interlocutor = () => {
    const [menuStatus, setmenuStatus] = useState<boolean>(false)
    const me = useSelector((state: {user:UserState}) => state.user.data)
    const selectedUser = useSelector((state: {dialog:DialogState}) => state.dialog.selectedUser)
    const currentDialog = useSelector((state: {dialog:DialogState}) => state.dialog.currentDialog)
    const dispatch = useDispatch()

    const onDeleteChat = () => {
        currentDialog && dispatch(removeDialog(currentDialog._id))
        currentDialog && dispatch(clearMessages())
    }
    const toggleMenu = () => {
        setmenuStatus( prevProps => !prevProps)
    }

    const onBack = () => {
        dispatch(resetCurrentDialog())
    }

    if( selectedUser ){
        return (
        <InterlocutorComponent
            onBack={onBack}
            type="user"
            user={{
                firstname:selectedUser.firstname,
                lastname:selectedUser.lastname,
                avatar: selectedUser.avatar,
                last_seen:selectedUser.last_seen,
                isOnline: selectedUser.isOnline
            }}
            toggleMenu={toggleMenu}
            isMenuOpen={menuStatus}
            deleteChat={onDeleteChat}
        />)
    }
    if( currentDialog && me ){
        const user = me?._id === currentDialog.partner._id ? currentDialog.author : currentDialog.partner;
        return(
            <InterlocutorComponent
                onBack={onBack}
                type="dialog"
                user={{
                    firstname:user.firstname,
                    lastname:user.lastname,
                    avatar: user.avatar,
                    last_seen:user.last_seen,
                    isOnline: user.isOnline
                }}
                toggleMenu={toggleMenu}
                isMenuOpen={menuStatus}
                deleteChat={onDeleteChat}
            />
        )
    }
    return(
       <></>
    )
}

export default Interlocutor