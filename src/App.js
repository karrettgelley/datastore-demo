import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { User } from './models';

function App() {
  useState(() => {
    const subscription = DataStore.observe().subscribe(console.log);

    return () => subscription.unsubscribe();
  }, [])
  const handleAddUser = async () => {
    try {
      const newUser = await DataStore.save(
        new User({ firstName: 'aws', lastName: 'datastore' }),
      );
      console.log('new user :', newUser);
    } catch (e) {
      console.error('failed to add user: ', e);
    }
  };

  return (
    <div className="App">
      <button onClick={handleAddUser}>add a user</button>
    </div>
  );
}

export default App;
