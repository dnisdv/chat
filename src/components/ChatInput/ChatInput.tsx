import React from 'react'
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
import { Picker } from 'emoji-mart'
import Recorder from './Recorder/Recorder'
import {EventTargetFiles} from './ChatInput.container'

export type AttachmentImagesType = {
    id:number,
    name:string,
    url:string,
    file:File
}

export type ChatInputProps = {
    AttachmentImages: AttachmentImagesType[],
    deleteAttachment: (i:AttachmentImagesType) => void,
    isRecording:boolean,
    sendHandle: () => void,
    voiceSend: (blob:Blob) => void,
    recordingPassedTime:() => string,
    autoResize:(e:React.KeyboardEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    changeInputValue:(e:React.ChangeEvent<HTMLTextAreaElement>) => void,
    toogleEmojiOpen:() => void,
    EmojiStatus:boolean,
    onSend:() => void,
    uploadAttachmentHandle:(e:EventTargetFiles) => void,
    selectEmoji:(data:any) => void,
    inputValue:string,
    onRecord:(blob:Blob) => void,
    PassedTimeFormat:() => string,
    setisRecording:React.Dispatch<React.SetStateAction<boolean>>,
    setpassedTime:React.Dispatch<React.SetStateAction<number>>,
    textAreaRef:React.MutableRefObject<HTMLTextAreaElement | null>
}

const ChatInput = ({
    AttachmentImages,
    deleteAttachment,
    isRecording,
    recordingPassedTime,
    autoResize,
    changeInputValue,
    toogleEmojiOpen,
    EmojiStatus,
    onSend,
    uploadAttachmentHandle,
    selectEmoji,
    inputValue,
    onRecord,
    setisRecording,
    setpassedTime,
    textAreaRef
}:ChatInputProps) => {
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
                            <RecordingTime>{recordingPassedTime()}</RecordingTime>
                            <RecordingIcon />
                            <RecordTitle>Recording...</RecordTitle>
                        </RecordingWrapper> : ""}
                        <InputText ref={textAreaRef} onKeyDown={autoResize} onChange={changeInputValue} value={isRecording ? "" : inputValue} placeholder={isRecording ? "" :"Type your message"}></InputText>
                </LeftColumn>
                <Controls>
                    <Recorder setpassedTime={setpassedTime} setisRecording={setisRecording} isRecording={isRecording} succesRecord={onRecord} />

                    <EmojiControl >
                        <EmojiImg onClick={toogleEmojiOpen} src={EmojiIcon}  />
                        {EmojiStatus ? 
                                <Picker set='apple'
                                onClick={selectEmoji}
                                style={{ 
                                    position: 'absolute',
                                    bottom:"100%",
                                    right:0,
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