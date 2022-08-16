# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local development

For local development, the environment variable `REACT_APP_IS_LOCAL` is used.

To use it, you need to create a file `.env.local` with defined variable as below:

```env
REACT_APP_IS_LOCAL=true
```

After that all environments will have an access to the specified variable on your local machine.

This functionality may be useful in the case when some new features is not yet ready for testing by QA team.

More information about `.env` usage in CRA can be found [here](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used).
