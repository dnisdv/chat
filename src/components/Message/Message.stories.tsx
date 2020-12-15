import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Message, { MessageProps } from './Message';

export default {
  title: 'Components/Message',
  component: Message,
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

const Template: Story<MessageProps> = (args) => <Message {...args} />;

export const Base = Template.bind({});
Base.args = {
    isMe : true,
  user: {
      firstName:"Dwight ",
      lastName:"Schrute",
      avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  },
  readed:false,
  text:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born",
};


export const Audio = Template.bind({});
Audio.args = {
  isMe : true,
  user: {
    firstName: "Dwight ",
    lastName: "Schrute",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  },
  readed:false,
  audio:{
    audioname:"Sample audio",
    url: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
  }
};

export const Attachments = Template.bind({});
Attachments.args = {
  text:"",
  isMe : true,
  user: {
    firstName: "Dwight ",
    lastName: "Schrute",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  },
  readed:false,
  attachments:[
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
    ],
}

export const Attachment = Template.bind({});
Attachment.args = {
  isMe : true,
  user: {
    firstName: "Dwight ",
    lastName: "Schrute",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  },
  readed:false,
  attachments:[
    {
      filename:"Image1",
      url:"https://images.unsplash.com/photo-1602784648782-c9e96b8d29c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }]
}

export const AttachemntWithText = Template.bind({});
AttachemntWithText.args = {
  text:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
  isMe : true,
  user: {
    firstName: "Dwight ",
    lastName: "Schrute",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  },
  readed:false,
  attachments:[
    {
      filename:"Image1",
      url:"https://images.unsplash.com/photo-1602784648782-c9e96b8d29c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }]
}