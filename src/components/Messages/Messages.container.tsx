import React from 'react'
import MessagesComponent from './Messages'

const Messages = () => {
    return(
        <MessagesComponent
            items={[
            {
                text:"Hello Dog",
                user:{
                    firstName:"Denis",
                    lastName:"Mayami",
                    avatar:"https://eu.ui-avatars.com/api/?name=Sett+Doe"
                }
            },
            {
                isMe:true,
                text:"Hello Dog",
                user:{
                    firstName:"Denis",
                    lastName:"Mayami",
                    avatar:"https://eu.ui-avatars.com/api/?name=Sett+Doe"
                }
            },
            {
                isMe:true,
                text:"Hello Dog",
                user:{
                    firstName:"Denis",
                    lastName:"Mayami",
                    avatar:"https://eu.ui-avatars.com/api/?name=Sett+Doe"
                },
                attachments:[
                    {
                        filename:"img1",
                        url: "https://images.unsplash.com/photo-1608039439183-c0e8c56fffdd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    },
                    {
                        filename:"img2",
                        url: "https://images.unsplash.com/photo-1608012421239-013f3470f1ab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80"
                    }
                ]
            }
        ]}
        />
    )
}

export default Messages