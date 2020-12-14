import React from 'react';
import AuthPage from './Pages/Auth/Auth'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route path={["/signin", "/signup", "/forget"]} exact render={() => <AuthPage />} />
        <Route path="/" render={() => <Home />} /> 
      </div>
    </Router>
  );
}

export default App;
