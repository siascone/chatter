import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        {/* Routes and components go here */}
      </Switch>
    </div>
  );
}

export default App;
