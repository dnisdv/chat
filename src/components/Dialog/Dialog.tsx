import React from 'react'
import {Wrapper, DialogData, FullName, LastMessage, Box, TimeWrapper, NotReaded, LastMessageWrapper} from './Dialog.styled'
import Avatar from '../Avatar/Avatar'
import { getHours, getMinutes, formatDistanceStrict, isToday } from 'date-fns'
import { enUS } from 'date-fns/locale'


export type DialogProps = {
    room:{
        partner:{
            firstName: string,
            lastName: string,
            avatar:string
        }
        lastMessage:{
            message:string,
            date:Date
        },
        notReadedCount:number
    }
    active:boolean,
}


const Dialog  = ({room, active}: DialogProps) => {

    const formateDate = (date:any) => {
        if(isToday(date)){
            return (getHours(date) < 10 ? "0" + getHours(date) : getHours(date)) + " : " + (getMinutes(date) < 10 ? "0" + getMinutes(date) : getMinutes(date))
        }else{
            return formatDistanceStrict(date, new Date(), { addSuffix: true, locale: enUS })
        }
    }
    
    return(
        <Wrapper active={active}>
            <Avatar size={60} user={room.partner}></Avatar>
            <DialogData>
                <Box>
                    <FullName>{room.partner.firstName + room.partner.lastName}</FullName>
                    <TimeWrapper>
                        {formateDate(room.lastMessage.date)}
                    </TimeWrapper>
                </Box>
                <LastMessageWrapper>
                    <LastMessage>{room.lastMessage.message}</LastMessage>
                    <NotReaded>{room.notReadedCount}</NotReaded>
                </LastMessageWrapper>
            </DialogData>
        </Wrapper>
    )
}

export default Dialog