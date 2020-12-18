import React from 'react'
import {SideMenu, Wrapper, MessagesWrapper, SideMenuWrapper, MessagesMenu} from './Home.styled'
import Dialogs from '../../components/Dialogs/Dialogs.container'
import Messages from '../../components/Messages/Messages.container'
import Search from '../../components/Search/Search.container'
import ChatInput from '../../components/ChatInput/ChatInput.container'
import Profile from '../../components/Profile/Profile.container'
import Interlocutor from '../../components/Interlocutor/Interlocutor.container'

const userExample = {
    firstName: "Dwight ",
    lastName: "Schrute",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  }
  
  const roomExample = {
      partner:userExample,
      lastMessage:{
        message:"Agreed joy vanity regret met may ladies oppose who",
        date:new Date()
      },
      notReadedCount:2,
  }


  const MessageItems = [
    {
        user:{
            firstName:"Denis",
            lastName:"Gradinaru",
            avatar: "https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        },
        readed:false,
        text:"Hello"
    },
    {
        isMe:true,
        user:{
            firstName:"Denis",
            lastName:"Gradinaru",
            avatar: "https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        },
        readed:false,
        text:"Hello"
    },
    {
        user:{
            firstName:"Denis",
            lastName:"Gradinaru",
            avatar: "https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        },
        readed:false,
        text:"How are you"
    },
    {
        attachments:[
            {
                filename:"dog1",
                url:"https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            },
            {
                filename:"dog2",
                url:"https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            },                {
                filename:"dog3",
                url:"https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
            },
            ],
            user:{
                firstName:"Denis",
                lastName:"Gradinaru",
                avatar: "https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            },
            readed:false,
            text:"How are you"
    }
]


const Home = () => {
    return(
        <Wrapper>
            <SideMenu>
                <Profile />
                <Search />
                <Dialogs />
            </SideMenu>

            <MessagesMenu>
                <Interlocutor />
                <Messages />
                <ChatInput />
            </MessagesMenu>
        </Wrapper>
    )
}

export default Home