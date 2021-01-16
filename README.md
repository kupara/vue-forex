## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Features implemented:

- unidirectional conversion with tests
- chartJS line graph for the last 30 days
  - The historical chart for now only shows data for EUR/USD.

### Improvements:

- remove duplicate state in form
- move chart data to computed property in app
- fix reactivity in chart when currencies are updated.
