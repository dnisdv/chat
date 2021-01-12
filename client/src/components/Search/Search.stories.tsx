import React, { useState, useRef } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Search, {SearchProps} from './Search';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: { onChange: { action: 'clicked' } },
} as Meta;

const Template: Story<SearchProps> = (args) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const SearchInputRef = useRef<HTMLInputElement | null>(null)

  const onUserSearch = (value:string) => {
    if(value !== ""){
    }else{
        setSearchValue("")
    }
  }
  const changeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onUserSearch(e.target.value)
  }

  const clearSearchValue = () => {
    setSearchValue("");
    onUserSearch("")
    SearchInputRef && SearchInputRef.current?.focus()
  } 
  return(
    <Search 
    SearchInputRef={SearchInputRef}
    searchValue={searchValue}
    changeValue={changeValue}
    clearSearchValue={clearSearchValue}/>
  )
};

export const Base = Template.bind({});
