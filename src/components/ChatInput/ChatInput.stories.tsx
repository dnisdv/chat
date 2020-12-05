import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ChatInput, { ChatInputProps } from './ChatInput';

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

const Template: Story<ChatInputProps> = (args) => <ChatInput {...args} ></ChatInput>;

export const Base = Template.bind({});
Base.args = {
  sendHandle:() => {},
  voiceSend:() => {},
};