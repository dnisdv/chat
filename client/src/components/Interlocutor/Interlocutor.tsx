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
    MenuImgWrapper,
    LastSeen,
    LeftSide,
    OnlineStatus,
    LeftSideData,
    BackArrowImage
 } from './Interlocutor.styled'
import leftArrow from './Assets/left-arrow.svg'
import { formatDistance } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useMediaQuery } from 'react-responsive'

export type InterlocutorProps = {
    onBack: () => void,
    type: "dialog" | "user",
    toggleMenu: () => void,
    isMenuOpen:boolean,
    deleteChat: (e:React.MouseEvent<HTMLLIElement>) => void,
    user:{
        firstname:string,
        lastname:string,
        avatar:{
            filename:string,
            path:string
        },
        last_seen:string,
        isOnline?:boolean
    }
}

const Interlocutor = ({
    onBack,
    toggleMenu,
    isMenuOpen,
    deleteChat,
    user,
    type
}: InterlocutorProps) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 732px)'
      })
    return(
        <Wrapper>
            <LeftSide onClick={() => isMobile && onBack()} >
                <BackArrowImage src={leftArrow} width="20px" height="20px" />
                <LeftSideData>
                        <Title>{user.firstname + " " + user.lastname}</Title>
                    {user.isOnline ? 
                        <OnlineStatus>Online</OnlineStatus>
                    :
                        <LastSeen>Was online {formatDistance(Date.parse(user.last_seen), new Date(), { addSuffix: true, locale: enUS })}</LastSeen> 
                    }
                </LeftSideData>
            </LeftSide>
            <RightSide>
                <Avatar
                        user={{
                            firstname:user.firstname,
                            lastname:user.lastname
                        }}
                        size={isMobile ? 35 :50}
                        srcImage={user.avatar ? user.avatar.path : null} />
                {type === "user" ? "":
                    <Menu>
                        <MenuImgWrapper onClick={toggleMenu} >
                            <MenuImg src={MenuIcon} />
                        </MenuImgWrapper>
                        <MenuList open={isMenuOpen}>
                            <MenuItem onClick={deleteChat} >Delete chat</MenuItem>
                        </MenuList>
                    </Menu>
                }
            </RightSide>
        </Wrapper>
    )
}

export default Interlocutor

export const userExample = {
    firstName:"Shrek",
    lastName:"Simon",
}