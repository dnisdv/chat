import React, { useState, useRef, } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ChatInput, { ChatInputProps, AttachmentImagesType } from './ChatInput';
import { EventTargetFiles } from './ChatInput.container'

export default {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: {
  backgrounds: {
    default: 'lightGray',
    values: [
      {
        name: 'lightGray',
        value: '#F7F6FC',
      },
    ],
  },
}
} as Meta;

const Template: Story = (args:Partial<ChatInputProps>) => {
    const [EmojiStatus, setEmojiStatus] = useState<boolean>(false)
    const [InputValue, setInputValue] = useState<string>("")
    const [AttachmentImages, setAttachmentImages] = useState<AttachmentImagesType[]>([])
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const deleteAttachment = ({id}:AttachmentImagesType) => {
      setAttachmentImages((prevProps:AttachmentImagesType[]) => prevProps.filter( (i:AttachmentImagesType) => i.id !== id))
    }
    const onSend = () => {
      console.log("SEND")
    }
    const autoResize = (e:React.KeyboardEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      e.currentTarget.style.height = '55px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    }
    const changeInputValue = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value)
      autoResize(e)
    }
    const toogleEmojiOpen = () => {
      setEmojiStatus(!EmojiStatus)
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

  const selectEmoji = (data:{colons:string}) => {
    if(textAreaRef.current){
        setInputValue(InputValue + data.colons)
        textAreaRef.current.style.height = '55px';
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }

  const KeyPressHandle = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter"){
        e.preventDefault()
        onSend()
    }
}


  return(
    <div >
        <ChatInput 
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
            />
    </div>
  )
}

export const Base = Template.bind({});
