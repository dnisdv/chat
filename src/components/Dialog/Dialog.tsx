import React from 'react'
import {Wrapper, DialogData, FullName, LastMessage, Box, TimeWrapper, NotReaded, LastMessageWrapper} from './Dialog.styled'
import Avatar from '../Avatar/Avatar'
import { getHours, getMinutes, formatDistanceStrict, isToday } from 'date-fns'
import { enUS } from 'date-fns/locale'

const formateDate = (date:number | string | Date) => {
    if(isToday(+date)){
        // n < 10 ? "add 0 in face" : n
        return (getHours(+date) < 10 ? "0" + getHours(+date) : getHours(+date)) + " : " + (getMinutes(+date) < 10 ? "0" + getMinutes(+date) : getMinutes(+date))
    }else{
        return formatDistanceStrict(+date, new Date(), { addSuffix: true, locale: enUS })
    }
}

export type DialogProps = {
    user:{
        firstName: string,
        lastName: string,
        avatar:string
    }
    lastMessage:{
        message:string,
        date:Date
    },
    notReadedCount:number
    active:boolean,
}

const Dialog  = ({user, lastMessage, notReadedCount, active}: DialogProps) => {
    return(
        <Wrapper active={active}>
            <Avatar size={60} srcImage={user.avatar}></Avatar>
            <DialogData>
                <Box>
                    <FullName>{user.firstName + user.lastName}</FullName>
                    <TimeWrapper>
                        {formateDate(lastMessage.date)}
                    </TimeWrapper>
                </Box>
                <LastMessageWrapper>
                    <LastMessage>{lastMessage.message}</LastMessage>
                    {notReadedCount ? <NotReaded>{notReadedCount}</NotReaded> : "" }
                </LastMessageWrapper>
            </DialogData>
        </Wrapper>
    )
}

export default Dialog