import React,{useRef, useState} from 'react'
import ChatInputComponent, {AttachmentImagesType} from './ChatInput'
import {useSelector, useDispatch} from 'react-redux'
import {DialogState} from '../../redux/dialogs/types'
import { createDialogs_sendMessage } from '../../redux/dialogs/actions'
import { sendMessagetoDialog } from '../../redux/messages/actions'
import socket from '../../core/socket'
import { UserState } from '../../redux/user/types'

export type EventTargetFiles = React.ChangeEvent<HTMLInputElement> & {
    target:{
        files:[FileList]
    }
}

const ChatInput = () => {
    const [EmojiStatus, setEmojiStatus] = useState<boolean>(false)
    const [InputValue, setInputValue] = useState<string>("")
    const [AttachmentImages, setAttachmentImages] = useState<AttachmentImagesType[]>([])
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const selectedUser = useSelector((state: {dialog:DialogState}) => state.dialog.selectedUser)
    const currentDialog = useSelector((state: {dialog:DialogState}) => state.dialog.currentDialog)
    const me = useSelector((state: {user:UserState}) => state.user.data)


    const dispatch = useDispatch()

    const selectEmoji = (data:{colons:string}) => {
        if(textAreaRef.current){
            setInputValue(InputValue + data.colons)
            textAreaRef.current.style.height = '55px';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }

    const toogleEmojiOpen = () => {
        setEmojiStatus(!EmojiStatus)
    }

    const changeInputValue = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
        autoResize(e)
    }



    const uploadAttachmentHandle = (e:EventTargetFiles) => {
        if (e.target.files && e.target.files[0]) {
            const files = [...e.target.files]
            if(
                files.length > 12 ||
                AttachmentImages.length + files.length > 12){
                //TODO RETURN ERROR
                return
            }
            setPreviewAttachment(files)  
          }
    }

    const setPreviewAttachment = (files:File[]) => {
        for (let i = 0; i < files.length ; i++){
            var reader = new FileReader();

            reader.onload = function(e:any) {
                setAttachmentImages((oldState:AttachmentImagesType[]) => [...oldState, {
                    id: oldState.length >= 1 ? Math.max(...oldState.map((i:AttachmentImagesType) => i.id)) + 1 : 1,
                    name: files[i].name,
                    url: e.target.result,
                    file: files[i]
                }])
              }
            reader.readAsDataURL(files[i])
        }
    }

    const deleteAttachment = ({id}:AttachmentImagesType) => {
        setAttachmentImages((prevProps:AttachmentImagesType[]) => prevProps.filter( (i:AttachmentImagesType) => i.id !== id))
    }
    const onSend = () => {
        if(/([^\s])/.test(InputValue) || (AttachmentImages && AttachmentImages.length > 0) ){
            if(selectedUser){
                dispatch(createDialogs_sendMessage(selectedUser._id, InputValue, AttachmentImages))
                setAttachmentImages([])
            }else if(currentDialog){
                dispatch(sendMessagetoDialog(currentDialog._id, InputValue, AttachmentImages))
                setAttachmentImages([])

            }
            setInputValue("")
        }else{
            setInputValue("")
        }
        setEmojiStatus(false)
        if(textAreaRef.current){
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }
    const KeyPressHandle = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(currentDialog && me){
            socket.emit('DIALOGS:TYPING', { dialogId: currentDialog._id, userId: me._id });
        }
        if(e.key === "Enter"){
            e.preventDefault()
            onSend()
        }
    }

    const autoResize = (e:React.KeyboardEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = '55px';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    }

    return(
        <>
        {selectedUser || currentDialog ? <ChatInputComponent
            AttachmentImages={AttachmentImages}
            deleteAttachment={deleteAttachment}
            sendHandle={onSend}
            autoResize={autoResize}
            changeInputValue={changeInputValue}
            toogleEmojiOpen={toogleEmojiOpen}
            EmojiStatus={EmojiStatus}
            onSend={onSend}
            selectEmoji={selectEmoji}
            inputValue={InputValue}
            uploadAttachmentHandle={uploadAttachmentHandle}
            textAreaRef={textAreaRef}
            KeyPressHandle={KeyPressHandle}
        /> :""}
        
        </>
    )
}

export default ChatInput