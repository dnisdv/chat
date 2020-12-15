import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Search from './Search.container';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: { onChange: { action: 'clicked' } },
} as Meta;

const Template: Story = (args) => <Search {...args} ></Search>;

export const Base = Template.bind({});
