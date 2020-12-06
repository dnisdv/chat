import React from 'react';
import Dialog from './components/Dialog/Dialog';
import Search from './components/Search/Search';

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

const App: React.FC = () => {

  const changeSearchInput = (value:string) =>{
    console.log(value)
  } 
  return (
    <div className="App">
      {/* <Dialog active={false} room={roomExample} /> */}
      <Search onChange={changeSearchInput} />
    </div>
  );
}

export default App;
