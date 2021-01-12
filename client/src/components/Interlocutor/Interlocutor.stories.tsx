import React, {useState} from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Interlocutor, { InterlocutorProps } from './Interlocutor';

export default {
  title: 'Components/Interlocutor',
  component: Interlocutor,
  argTypes: { 
    actions:{
      handles: ['click'],
    }
   },
} as Meta;

const Template: Story<InterlocutorProps> = (args) => {
  const [menuStatus, setmenuStatus] = useState<boolean>(false)
  const toggleMenu = () => {
    setmenuStatus( prevProps => !prevProps)
}
  return(
    
    <Interlocutor {...args} toggleMenu={toggleMenu} isMenuOpen={menuStatus}  />
  )
};

export const Base = Template.bind({});
Base.args = {
    isMenuOpen:false,
    deleteChat: (e:React.MouseEvent<HTMLLIElement>) => {},
    user:{
        firstname:"uh oh buh",
        lastname: "Hellboy",
        avatar:{
          filename:"",
          path:"https://i.ytimg.com/vi/yq5SOqjb32s/maxresdefault.jpg"
        },
        last_seen: "2020-12-31T07:36:42.439Z",
        isOnline:false
    }
};