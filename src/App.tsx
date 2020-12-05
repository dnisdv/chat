import React,{useState} from 'react';
import ChatInput from './components/ChatInput/ChatInput';
import Message from './components/Message/Message'

const userExample = {
  firstName: "Dwight ",
  lastName: "Schrute",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
}


const App: React.FC = () => {

  const sendHandle = () => {

  }
  const voiceSend = (blob:Blob) => {
    console.log(blob)
  }


  return (
    <div className="App">
      {/* <Message 
        attachments={[
        {
          filename:"Image1",
          url:"https://images.unsplash.com/photo-1602784648782-c9e96b8d29c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        {
          filename:"Image2",
          url:"https://images.unsplash.com/photo-1503342669531-2557c49cde04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
          filename:"Image3",
          url:"https://images.unsplash.com/photo-1606363099649-9675e44138d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        {
          filename:"Image4",
          url:"https://images.unsplash.com/photo-1599839839843-7ae7701e0548?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80"
        },
        {
          filename:"Image5",
          url:"https://images.unsplash.com/photo-1606312321098-190837c01672?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=729&q=80"
        }
        ]}
        user={userExample}
      >Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </Message>

      <Message user={userExample} isMe readed>His exquisite sincerity education shameless  </Message>
      <Message audio={{
        audioname:"Shanson",
        url:"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
      }} user={userExample} isMe readed>The European languages are members of the same family. Their separate existence is a myth.</Message>
      <Message 
        attachments={[
        {
          filename:"Image1",
          url:"https://images.unsplash.com/photo-1602784648782-c9e96b8d29c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        ]}
        user={userExample}
      >Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</Message>
            <Message 
        attachments={[
        {
          filename:"Image1",
          url:"https://images.unsplash.com/photo-1606312321098-190837c01672?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=729&q=80"
        },
        ]}
        isMe
        user={userExample}
      ></Message> */}
    

        
      <ChatInput voiceSend={voiceSend} sendHandle={sendHandle} />
    </div>
  );
}

export default App;
