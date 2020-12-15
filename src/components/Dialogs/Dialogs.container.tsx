import React from 'react'
import DialogsComponent from './Dialogs'

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

const Dialogs = () => {
    return(
        <DialogsComponent 
            items={[
            {
                active:true,
                user:userExample,
                lastMessage:{
                    message:"Agreed joy vanity regret met may ladies oppose who",
                    date:new Date()
                },
            },
            {
                user:userExample,
                lastMessage:{
                    message:"Agreed joy vanity regret met may ladies oppose who",
                    date:new Date()
                },
            },
            {
                user:userExample,
                lastMessage:{
                    message:"Agreed joy vanity regret met may ladies oppose who",
                    date:new Date()
                },
                notReadedCount:2
            }
        ]}
        />
    )
}

export default Dialogs