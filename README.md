# GraphQL Suspense

Easily add suspense to your GraphQL app.

> Warning, the [React docs](https://reactjs.org/docs/react-api.html#reactsuspense) say that Suspense does not yet support data loading, so in the future there may be breaking changes & better options available.

![](header.jpg)

## Install

```sh
yarn add graphql-suspense

# or

npm install graphql-suspense
```

## Usage (Apollo)

```js
import React, { Component, Suspense } from 'react'
import gqlsuspense from 'graphql-suspense'

// Define Apollo client
const client = new ApolloClient({
  uri: "<SOMEURI>"
})

class Data extends React.Component {
  render() {
    const data = gqlsuspense(client.query, { query: listTodos })
    return data.data.listTodos.items.map((t, i) => <p key={i}>Yo! {t.name}</p>)
  }
}

const App = () => (
  <Suspense fallback={<div>loading single...</div>}>
    <Data />
  </Suspense> 
)
```

## Usage (AWS Amplify)

```js
import React, { Component, Suspense } from 'react'
import gqlsuspense from 'graphql-suspense'
import { API, graphqlOperation } from 'aws-amplify'

class Data extends React.Component {
  render() {
    const data = gqlsuspense(API.graphql(graphqlOperation(listTodos)))
    return data.data.listTodos.items.map((t, i) => <p key={i}>Yo! {t.name}</p>)
  }
}

const App = () => (
  <Suspense fallback={<div>loading single...</div>}>
    <Data />
  </Suspense> 
)
```
