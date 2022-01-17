ProviderEvents
===========================

## Usage

- import providerEventsSaga to your root saga
```js
import { providerEventsSaga } from 'provider';
```

- add new fork with params

```js
  yield fork(providerEventsSaga, {
  connectAction: connect.toString(),
  disconnectAction: disconnect.toString(),
  provider: service.getKeyProvider(),
  actions: {
    chainChanged? : fetchChain
    accountsChanged? :
      message ? :
        disconnect ? :
  }
});
```
