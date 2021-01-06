import React, { useEffect } from 'react'
import {SideMenu, Wrapper, MessagesWrapper, SideMenuWrapper, MessagesMenu} from './Home.styled'
import Dialogs from '../../components/Dialogs/Dialogs.container'
import Messages from '../../components/Messages/Messages.container'
import Search from '../../components/Search/Search.container'
import ChatInput from '../../components/ChatInput/ChatInput.container'
import Profile from '../../components/Profile/Profile.container'
import Interlocutor from '../../components/Interlocutor/Interlocutor.container'
import { searchDialogs, clearFoundDialogs, fetchDialogs } from '../../redux/dialogs/actions'
import { useDispatch, useSelector } from 'react-redux'
import { DialogState } from '../../redux/dialogs/types'
import FoundUsers from '../../components/FoundUsers/FoundUsers.container'
import { messageUpdateReadStatus, getMessages } from '../../redux/messages/actions'
import socket from '../../core/socket'
import { UserState } from '../../redux/user/types'

const Home = () => {
    const foundUsers = useSelector( (state:{dialog:DialogState}) => state.dialog.usersfound)
    const currentDialog = useSelector( (state:{dialog:DialogState}) => state.dialog.currentDialog)
    const selectedUser = useSelector( (state:{dialog:DialogState}) => state.dialog.selectedUser)
    const me = useSelector( (state:{user:UserState}) => state.user.data)



    const dispatch = useDispatch()

    const onUserSearch = (value:string) => {
        if(value !== ""){
            dispatch(searchDialogs(value))
        }else{
            dispatch(clearFoundDialogs())
        }
    }

    useEffect(() => {
        dispatch(fetchDialogs())
        // socket.on('SERVER:MESSAGES_READED', (data:any) =>{dispatch(fetchDialogs())});
    }, [])

    if(!me){
        return <></>
    }
    return(
        <Wrapper>
            <SideMenu isSelect={!!(currentDialog || selectedUser)}>
                <Profile />
                <Search onChange={onUserSearch} />
                {foundUsers  ? <FoundUsers /> : <Dialogs />}
            </SideMenu>

            <MessagesMenu isSelect={!!(currentDialog || selectedUser)}>
                <Interlocutor />
                <Messages />
                <ChatInput />
            </MessagesMenu>
        </Wrapper>
    )
}

export default Home