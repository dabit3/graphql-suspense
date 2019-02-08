# GraphQL Suspense

Easily add suspense to your GraphQL app.

> Warning, the [React docs](https://reactjs.org/docs/react-api.html#reactsuspense) say that Suspense does not yet support data loading, so in the future there may be breaking changes & better options available. This is experimental, feel free to send prs for improvements.

![](header.jpg)

## Install

```sh
yarn add graphql-suspense

# or

npm install graphql-suspense
```

## Usage ([Apollo](https://www.apollographql.com/docs/react/))

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
  <Suspense fallback={<div>loading...</div>}>
    <Data />
  </Suspense> 
)
```

## Usage ([AWS Amplify](https://aws-amplify.github.io/))

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
  <Suspense fallback={<div>loading...</div>}>
    <Data />
  </Suspense> 
)
```
