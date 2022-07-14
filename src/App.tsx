import React from 'react';
import './App.css';
import Main from './components/Main';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

function App() {
  const client = new ApolloClient({
    uri: 'https://graphqlzero.almansi.me/api',
    cache: new InMemoryCache(),
  });
  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <Main></Main>
      </ApolloProvider>
    </div>
  );
}

export default App;
