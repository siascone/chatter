import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Splash from './components/Splash';
import Navigation from './components/Navigation';
import Room from './components/Room';
import RoomsIndex from './components/Room/RoomsIndex';

function App() {
  const currentUser = useSelector(state => {
    let user;
    if (state.session.user) {
      user = state.users[state.session.user.id]

    }
    return user;
  })

  return (
    <div className='app-main'>
      <Navigation />
      
      <Switch>

        <Route path='/rooms' render={routeProps => (
          <section className='home'>
            <RoomsIndex {...routeProps} />
            {currentUser && 
              <Route path='/rooms/:id' component={Room} />
            }
          </section>
        )} />

        <Route exact path='/' component={Splash} />
      </Switch>
    </div>
  );
}

export default App;
