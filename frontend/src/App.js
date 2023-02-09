import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Splash from './components/Splash';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='app-main'>
      <Navigation />
      
      <Switch>
        <Route path='/'>
          <Splash />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
