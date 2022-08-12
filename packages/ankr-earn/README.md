# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local development

```sh
yarn start:local
```

For local development, the environment variable `REACT_APP_IS_LOCAL` is used.

To use it, you need to create a file `.env.local` and fill it in by analogy with
`.env.stage` or `.env.dev`, depending on the development environment you need.

The only exception is, you need to specify the `REACT_APP_IS_LOCAL=true`.

This functionality may be useful in the case when some new features is not yet
ready for testing.
