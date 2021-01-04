import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Dialog, { DialogProps } from './Dialog';

export default {
  title: 'Components/Dialog',
  component: Dialog,
} as Meta;

const userExample = {
    firstName: "Dwight ",
    lastName: "Schrute",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  }
  
const roomExample = {
    partner:userExample,
      lastMessage:{
      message:"Agreed joy vanity regret met may ladies oppose who",
      date:new Date()
    },
    notReadedCount:2,
}

const Template: Story<DialogProps> = (args) => <Dialog {...args} ></Dialog>;

// export const Base = Template.bind({});
// Base.args = {
    // active:false,
    // user:userExample,
    // lastMessage:{
    //   message:"Hello From last message :)",
    //   date:new Date()
    // },
    // notReadedCount:1,
// };

