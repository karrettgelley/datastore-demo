This repo demonstrates the DataStore error related to syncing. Follow the steps below to reproduce. I have recorded to terminal session of my demonstration which can be found in /output.txt.

To reproduce:

1. npx create-react-app datastore-demo
2. cd datastore-demo
3. npx amplify-app@latest
4. amplify init
5. change schema.graphql to

type User @model {
id: ID!
firstName: String!
lastName: String!
}

6. amplify codegen models
7. amplify push
8. npm i @aws-amplify/datastore @aws-amplify/core
9. Change App.js to

import React from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { User } from './models';

function App() {
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

10. npm start
11. Click the button to add a User
12. Check the console, and you will see:
    1. new user: [Model] 0: {firstName: ‘aws’, lastName: ‘datastore’, id:’x’, \_version: undefined, \_lastChangedAt: undefined, \_deleted: undefined}
    2. (Some minutes later) failed to add user:
13. (More importantly) check the User dynamodb table and you will not find any new items
