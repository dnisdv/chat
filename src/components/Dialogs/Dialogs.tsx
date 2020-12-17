import React from 'react'
import Dialog from '../Dialog/Dialog.container'
import emptyBoxIcon from './Assets/empty-box.svg'
import ContentLoader from 'react-content-loader'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
    Wrapper,
    DialogWrapper,
    NoDialogsWrapper,
    NoDialogImg,
    NoDialogsTitle,
    NoDialogsDescription,
    LoadingWrapper,
} from './Dialogs.styled'

type DialogsProps = {
    items?:{
        active?:boolean,
        user:{
            firstName:string,
            lastName:string,
            avatar:string
        },
        lastMessage:{
            message:string,
            date:Date
        }
        notReadedCount?:number
    }[],
    loading?:boolean,
}

const Dialogs = ({items, loading=false}:DialogsProps) => {
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
                {items.map((i:any) => {
                    return(
                        <DialogWrapper>
                            <Dialog 
                                active={i.active}
                                user={i.user}
                                lastMessage={i.lastMessage}
                                notReadedCount={i.notReadedCount}
                            />
                        </DialogWrapper>
                    )
                })}
                </PerfectScrollbar>
                :
                <NoDialogsWrapper>
                    <NoDialogImg src={emptyBoxIcon }/>
                    <NoDialogsTitle>Add new friends</NoDialogsTitle>
                    <NoDialogsDescription>Add friend and start communication</NoDialogsDescription>
                </NoDialogsWrapper>}
        </Wrapper>
    )
}

export default Dialogs
