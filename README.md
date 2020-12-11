# BOILERPLATE

## CLONE CODE DIRECTORY
```
cd ..
cp -r boilerplate-fe/. #NEW_PROJECT_DIR#
cd #NEW_PROJECT_DIR#
rm -r .git
rm -r node_modules
git init
git remote add origin git@bitbucket.org:Bisshr/xxxx.git
```

## UPDATE README & CONFIG
find "BOILERPLATE" keyword and replace with your new project name.

Update readme

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
./server-build.sh
```

### Compiles and minifies for biss.lab
```
./server-build.sh lab
```


### Compiles and minifies for stage (client env)
```
./server-build.sh stage
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
