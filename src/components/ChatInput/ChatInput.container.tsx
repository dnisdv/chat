import React,{useRef, useState} from 'react'
import ChatInputComponent, {AttachmentImagesType} from './ChatInput'

export type EventTargetFiles = React.ChangeEvent<HTMLInputElement> & {
    target:{
        files:[FileList]
    }
}

const ChatInput = () => {
    const [EmojiStatus, setEmojiStatus] = useState<boolean>(false)
    const [InputValue, setInputValue] = useState<string>("")
    const [isRecording, setisRecording] = useState<boolean>(false)
    const [AttachmentImages, setAttachmentImages] = useState<AttachmentImagesType[]>([])
    const [passedTime, setpassedTime] = useState<number>(0)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const selectEmoji = (data:any) => {
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

    const onRecord = (blob:Blob) => {
        console.log(blob)
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
        console.log("SEND")
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

    return(
        <ChatInputComponent
            AttachmentImages={AttachmentImages}
            deleteAttachment={deleteAttachment}
            isRecording={isRecording}
            sendHandle={onSend}
            voiceSend={onSend}
            recordingPassedTime={PassedTimeFormat}
            autoResize={autoResize}
            changeInputValue={changeInputValue}
            toogleEmojiOpen={toogleEmojiOpen}
            EmojiStatus={EmojiStatus}
            onSend={onSend}
            selectEmoji={selectEmoji}
            inputValue={InputValue}
            PassedTimeFormat={PassedTimeFormat}
            uploadAttachmentHandle={uploadAttachmentHandle}
            onRecord={onRecord}
            setisRecording={setisRecording}
            setpassedTime={setpassedTime}
            textAreaRef={textAreaRef}
        />
    )
}

export default ChatInput