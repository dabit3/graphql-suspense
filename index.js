const deepEqual = require('deep-equal');

const fetchCaches = []

const gqlsuspense = (client, input, variables) => {
  const sInput = JSON.stringify(input)
  const sVars = JSON.stringify(variables)
  for (const fetchCache of fetchCaches) {
    if (
      deepEqual(sInput, fetchCache.sInput) &&
      deepEqual(sVars, fetchCache.sVars)
    ) {

      // If an error occurred,
      if (Object.prototype.hasOwnProperty.call(fetchCache, 'error')) {
        throw fetchCache.error;
      }

      // If a response was successful,
      if (Object.prototype.hasOwnProperty.call(fetchCache, 'response')) {
        return fetchCache.response;
      }
      throw fetchCache.fetch;
    }
  }
  const operation = {
    ...input,
    variables: {
      ...variables
    }
  }
  let fetchCache = {
    sVars,
    sInput
  }
  if (!sInput) {
    fetchCache = {
      ...fetchCache,
      fetch:
        client
          .then(response => {
            return response
          })
          .then(response => {
            fetchCache.response = response;
          })
          .catch(e => {
            fetchCache.error = e;
          })
    }
  } else {
    fetchCache = {
      ...fetchCache,
      fetch:
        client(operation)
          .then(response => {
            return response
          })
          .then(response => {
            fetchCache.response = response;
          })
          .catch(e => {
            fetchCache.error = e;
          })
    }
  }
  fetchCaches.push(fetchCache);
  throw fetchCache.fetch;
}

export default gqlsuspense