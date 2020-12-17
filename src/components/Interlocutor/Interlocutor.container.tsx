import React,{useState} from 'react'
import InterlocutorComponent from './Interlocutor'

const Interlocutor = () => {
    const [menuStatus, setmenuStatus] = useState<boolean>(false)

    const onClearHistory = () => {
        console.log("CLEAR HISTORY")
    }
    const onBlockUser = () => {
        console.log("BLOCK USER")
    }

    const onDeleteChat = () => {
        console.log("DELETE CHAT")
    }

    const toggleMenu = () => {
        setmenuStatus( prevProps => !prevProps)
    }

    return(
        <InterlocutorComponent
            user={{
                firstName:"Senior",
                lastName:"Senior",
                avatar:"https://image.freepik.com/free-photo/high-angle-senior-enjoying-music_23-2148362865.jpg"
            }}
            toggleMenu={toggleMenu}
            isMenuOpen={menuStatus}
            clearHistory={onClearHistory}
            blockUser={onBlockUser}
            deleteChat={onDeleteChat}
        />
    )
}

export default Interlocutor