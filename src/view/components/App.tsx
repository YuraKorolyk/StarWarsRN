import React from 'react';
import {Provider} from 'react-redux';
import RootNavigation from '../navigation/RootNavigation';
import {store} from '../../redux/store';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

function App() {
  const BASE_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

  const client = new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
  });
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <RootNavigation />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
