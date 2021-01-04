import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Profile, { ProfileProps } from './Profile';

export default {
  title: 'Components/Profile',
  component: Profile,
} as Meta;

const Template: Story<ProfileProps> = (args) => <Profile {...args} />;

// export const Base = Template.bind({});
// Base.args = {
//     user:{
//       firstName:"Denis",
//       lastName:"Gradinaru",
//       avatar:"https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/280x178_2"
//     }
// };