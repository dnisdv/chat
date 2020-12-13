import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ChatInput from './ChatInput.container';

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

const Template: Story = (args) => (
  <div >
      <ChatInput {...args} ></ChatInput>
  </div>
);

export const Base = Template.bind({});
