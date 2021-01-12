import React from 'react'
import User from '../User/User.container'
import emptyBoxIcon from './Assets/empty-box.svg'
import ContentLoader from 'react-content-loader'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
    Wrapper,
    FoundUsersWrapper,
    NoFoundUsersWrapper,
    NoFoundUsersImg,
    NoFoundUsersTitle,
    NoFoundUsersDescription,
    LoadingWrapper,
} from './FoundUsers.styled'
import { Userdata } from '../../redux/user/types'

type FoundUsersProps = {
    items:{
        active?:boolean,
        user:Userdata & {avatar:string},
    }[],
    loading?:boolean,
}

const FoundUsers = ({items, loading=false}:FoundUsersProps) => {
    return (
        <Wrapper>
            {loading ? 
                <LoadingWrapper>
                    {[1,1,1,1,1,1,1,1].map( (i) => {
                        return(
                        <ContentLoader 
                            speed={2}
                            width={476}
                            height={75}
                            viewBox="0 0 476 75"
                            backgroundColor="#c0c0c0"
                            foregroundColor="#dbdbdb"
                        >
                        <rect x="325" y="27" rx="3" ry="3" width="22" height="6" /> 
                        <rect x="95" y="27" rx="3" ry="3" width="82" height="6" /> 
                        <rect x="95" y="46" rx="3" ry="3" width="253" height="6" /> 
                        <circle cx="54" cy="40" r="30" />
                    </ContentLoader>
                        )
                    })}
                </LoadingWrapper>
             : items && items.length > 0 ? 
                <PerfectScrollbar>
                {items.map((i) => {
                    return(
                        <FoundUsersWrapper key={i.user._id}>
                            <User 
                                active={i.active || false}
                                user={i.user}
                            />
                        </FoundUsersWrapper>
                    )
                })}
                </PerfectScrollbar>
                :
                <NoFoundUsersWrapper>
                    <NoFoundUsersImg src={emptyBoxIcon }/>
                    <NoFoundUsersTitle>No friend for you</NoFoundUsersTitle>
                    <NoFoundUsersDescription>But you can spam to other persons</NoFoundUsersDescription>
                </NoFoundUsersWrapper>}
        </Wrapper>
    )
}

export default FoundUsers
