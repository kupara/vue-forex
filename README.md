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

### Features implemented (within time):
- unidirectional conversion with tests
- chartJS line graph for the last 30 days
   - The historical chart for now only shows data for EUR/USD.
I attempted to fix the reactivity of the chart when changing the base currency but I ran out of time before fixing that part.

Note: 
- I used vue-cli to set up the app since I just learnt Vue for the sake of this test 🙂
- 2 issues fixed outside the 4hr timebox (sorting of data in the chart and making the target input readonly)
