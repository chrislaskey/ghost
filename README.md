### Setup

Note: Setup directions based on the [Medium post from Kitze](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)

Create react application:

```
npx create-react-app ghost
```

Add electron:

```
yarn add --dev concurrently electron electron-builder wait-on
yarn add electron-is-dev
```

Copy [`electron.js`](https://gist.github.com/kitze/42bfc85e8f41ebe777609c250b183eec#file-electron-js) to `public/electron.js`.

Update entry point in `package.json`:

```
"main": "public/electron.js"
```

Add script to `package.json`:

```
"electron-dev": "concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\""
```

Verify development version runs:

```
$ yarn electron-dev
```

#### Production Build

Update `package.json`:

```
"build": {
  "appId": "com.ghost.electron",
  "files": [
    "build/**/*",
    "node_modules/**/*"
  ],
  "directories":{
    "buildResources": "assets"
  }
}
```

Add scripts to `package.json`:

```
"electron-pack": "build -c.extraMetadata.main=build/electron.js",
"preelectron-pack": "yarn build"
```

Add homepage to `package.json`:

```
"homepage": "./"
```

Build the production version:

```
$ yarn electron-pack
```

Once complete, the prebuilt application files are located in `dist` directory.
