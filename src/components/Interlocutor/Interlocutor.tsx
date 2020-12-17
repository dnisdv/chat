import React from 'react'
import Avatar from '../../components/Avatar/Avatar'
import MenuIcon from './Assets/MenuIcon.svg'
import { 
    Wrapper,
    Title,
    Menu,
    MenuList,
    MenuItem,
    MenuImg,
    RightSide,
    MenuImgWrapper
 } from './Interlocutor.styled'

type InterlocutorProps = {
    toggleMenu: () => void,
    isMenuOpen:boolean,
    clearHistory: (e:React.MouseEvent<HTMLLIElement>) => void,
    blockUser: (e:React.MouseEvent<HTMLLIElement>) => void,
    deleteChat: (e:React.MouseEvent<HTMLLIElement>) => void,
    user:{
        firstName:string,
        lastName:string,
        avatar:string
    }
}

const Interlocutor = ({
    toggleMenu,
    isMenuOpen,
    clearHistory,
    blockUser,
    deleteChat,
    user
}: InterlocutorProps) => {
    return(
        <Wrapper>
            <Title>{user.firstName + " " + user.lastName}</Title>
            <RightSide>
                <Avatar
                        size={50}
                        user={user} 
                        srcImage={user.avatar} />
                <Menu>
                    <MenuImgWrapper onClick={toggleMenu} >
                        <MenuImg src={MenuIcon} />
                    </MenuImgWrapper>
                    <MenuList open={isMenuOpen}>
                        <MenuItem onClick={clearHistory}>Clear history</MenuItem>
                        <MenuItem onClick={blockUser}>Block user</MenuItem>
                        <MenuItem onClick={deleteChat} >Delete chat</MenuItem>
                    </MenuList>
                </Menu>
            </RightSide>
        </Wrapper>
    )
}

export default Interlocutor

export const userExample = {
    firstName:"Shrek",
    lastName:"Simon",
}