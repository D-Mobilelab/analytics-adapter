# CONTRIBUTING

## Documentation

To create and read the documentation of latest version

```bash
npm run doc:open
```

## Lint

To run Lint validator (ESlint):

```bash
npm run lint
```

## Try the library

To test manually the library, run a development server:

```bash
npm run start
```

It serves files from *example/* folder.

## Test

To run test suites in *single run* mode:

```bash
npm run test
```

To run test suites in *watch* mode:

```bash
npm run test:watch
```

To open coverage files on the browser:

```bash
npm run test:open
```

## Create a new version

To create a new version:

1. create a new build (it also runs lint and tests)

```bash
npm run build
```

2. create a new documentation

```bash
npm run doc
```

3. commit and push **dist/** and **docs/** folders

4. create a new version

```bash
npm version [<newversion> | major | minor | patch]
```