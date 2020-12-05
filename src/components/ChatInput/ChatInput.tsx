import React, {useEffect, useRef, useState} from 'react'
import {InputText,
     Wrapper,
    EmojiImg,
    SendButton,
    EmojiControl,
    AttachmentWrapper,
    Attachment,
    PreviewAttachment,
    FileUpload,
    AttachmentLabel,
    RecordingWrapper,
    RecordingIcon,
    RecordingTime,
    RecordTitle,
    Controls,
    LeftColumn,
    PreviewAttachmentWrapper,
    AttachmentDelete,
    AttachmentDeleteIcon,
    PreviewsAttach
} from './ChatInput.styled'
import 'emoji-mart/css/emoji-mart.css'
import EmojiIcon from './Assets/Emoji.svg'
import SendIcon from './Assets/Send.svg'
import AttachmentIcon from './Assets/Attachment.svg'
import DeleteIcon from './Assets/remove.svg'
import { Picker, BaseEmoji } from 'emoji-mart'
import Recorder from './Recorder/Recorder'

export type ChatInputProps = {
    sendHandle: () => void,
    voiceSend: (blob:Blob) => void
}

type EventTargetFiles = React.ChangeEvent<HTMLInputElement> & {
    target:{
        files:[FileList]
    }
}

const PickerStyle = {
    width:338,
    height:426
}

const ChatInput = ({
    sendHandle,
    voiceSend
}:ChatInputProps) => {
    type pickerPositionType = {
        top?: string,
        bottom?: string,
        left?: string,
        right?: string
    }

    type AttachmentImagesType = {
        id:number,
        name:string,
        url:string,
        file:File
    }

    const [EmojiStatus, setEmojiStatus] = useState<boolean>(false)
    const [PickerPosition, setPickerPosition] = useState<pickerPositionType>({})
    const EmojiRef = useRef<any>()
    const [InputValue, setInputValue] = useState<string>("")
    const [isRecording, setisRecording] = useState<boolean>(false)
    const [AttachmentImages, setAttachmentImages] = useState<AttachmentImagesType[]>([])
    const [passedTime, setpassedTime] = useState<number>(0)

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        const pickerwidth = PickerStyle.width
        const pickerheight = PickerStyle.height
        const Position = EmojiRef.current.getBoundingClientRect()

        let pickerposition:pickerPositionType = {}

        if(Position.left > window.innerWidth - pickerwidth){
            pickerposition.right = 0 + "px"
        }else{
            pickerposition.left = 0 + "px"
        }
        if(Position.top > window.innerHeight - pickerheight){
            pickerposition.bottom = 40 + "px"
        }else{
            pickerposition.top = 40 + "px"
        }
        setPickerPosition(pickerposition)
    }, [])

    const selectEmoji = (e:BaseEmoji) => {
        if(textAreaRef.current){
            setInputValue(InputValue + e.colons)
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

    const onRecord = (blob:Blob) => {
        voiceSend(blob)
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
                    id: oldState.length >= 1 ? Math.max(...oldState.map((i:any) => i.id)) + 1 : 1,
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
        console.log("SEND")
        sendHandle()
        //TODO ADD SEND FUNCTIONALITY
    }

    function PassedTimeFormat()  {
        var sec_num:number = parseInt(passedTime.toString(), 10);
        var minutes:string | number = Math.floor((sec_num) / 60);
        var seconds:number | string = sec_num - (minutes * 60);
    
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return +minutes+':'+seconds;
    }

    const autoResize = (e:React.KeyboardEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = '55px';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    }

    return (
        <>
        <PreviewsAttach>
            {AttachmentImages ? AttachmentImages.map( (i:AttachmentImagesType) => {
                return (
                    <PreviewAttachmentWrapper key={i.id} >
                        <PreviewAttachment src={i.url} />
                        <AttachmentDelete onClick={() => deleteAttachment(i)}><AttachmentDeleteIcon src={DeleteIcon} alt="Delete" /></AttachmentDelete>
                    </PreviewAttachmentWrapper>
                )
            }): ""}
        </PreviewsAttach>

        <Wrapper>
                <LeftColumn>
                    {isRecording ? 
                        <RecordingWrapper>
                            <RecordingTime>{PassedTimeFormat()}</RecordingTime>
                            <RecordingIcon />
                            <RecordTitle>Recording...</RecordTitle>
                        </RecordingWrapper> : ""}
                        <InputText ref={textAreaRef} onKeyDown={autoResize} onChange={changeInputValue} value={isRecording ? "" : InputValue} placeholder={isRecording ? "" :"Type your message"}></InputText>
                </LeftColumn>
                <Controls>
                    <Recorder setpassedTime={setpassedTime} setisRecording={setisRecording} isRecording={isRecording} succesRecord={onRecord} />

                    <EmojiControl >
                        <EmojiImg ref={EmojiRef} onClick={toogleEmojiOpen} src={EmojiIcon}  />
                        {EmojiStatus ? 
                                <Picker set='apple'
                                onClick={selectEmoji}
                                style={{ 
                                    ...PickerPosition,
                                    position: 'absolute',
                                    width:PickerStyle.width + "px",
                                    height:PickerStyle.height + "px",
                                }}  />
                            : ""}
                    </EmojiControl>

                    <AttachmentWrapper style={{opacity: AttachmentImages.length >= 12 ? 0.5: 1}} >
                        <FileUpload  disabled={AttachmentImages.length >= 12 ? true: false} onChange={uploadAttachmentHandle} type="file" id="Upload8fc44" accept="image/x-png,image/gif,image/jpeg"  multiple />
                        <AttachmentLabel htmlFor="Upload8fc44" ><Attachment src={AttachmentIcon} /></AttachmentLabel>
                    </AttachmentWrapper>
                    
                    <SendButton onClick={onSend}>
                        <img src={SendIcon} />
                    </SendButton>
                </Controls>
        </Wrapper>
        </>
    )
}

export default ChatInput