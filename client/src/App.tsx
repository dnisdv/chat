import React,{useEffect} from 'react';
import AuthPage from './Pages/Auth/Auth'
import Home from './Pages/Home/Home';
import { useDispatch, useSelector } from 'react-redux'
import { fetch_User } from './redux/user/actions'
import { RootState } from './redux/store'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { UserState } from './redux/user/types'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector<RootState>((state:{user:UserState}) => state.user.isAuth)

  useEffect(() => {
    dispatch(fetch_User())
  }, [dispatch]);


  return (
      <Router>
        <div className="App">
          <Route path={["/signin", "/signup", "/forget"]} exact render={() => <AuthPage />} />
          <Route path="/" exact 
            render={() => isAuth ?  <Home /> : <Redirect to="/signin" />} /> 
        </div> 
      </Router>
  );
}

export default App;
