# observatori-web

Visit https://flowmaps.life.bsc.es/observatori/


## Project setup

This website has been created using Vue.js (@vue/cli 4.5.13), Node.js and npm.


### First, install Node.js and npm

Instructions for Ubuntu: https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/

Instructions for other systems: https://nodejs.org/en/download/package-manager/


### Install dependencies

The website uses a list of javascript dependencies (listed on package.json). To install them, run the following command from the root directory of the cloned repository:  

```
npm install
```

### Development server

The following command compiles the project and starts a local development server:

```
npm run serve
```

### Deploy

The following command compiles the project and minifies it for production:


```
npm run build
```

After finishes, look for the index.html inside the dist/ folder. 


### Lints and fixes files

```
npm run lint
```

### Project structure

Vue.js uses a system of components, each of which is defined in a .vue file, and combines html, css and javascript. The components are listed in the *src/components/* folder. Examples of this components are the map, the calendar, the plots.

The main Vue application is defined in *src/App.vue*. It defines the main structure of the website (header, position of the different components, etc), coordinates the interaction between the components, and serves as data storage: once a new region is selected in the map, or a new date range is selected in the calendar, the main app performs asyncronous requests to the API, and stores the results (mainly the time series) as computed properties. The components (plots) detects the changes of this properties, and perform the needed visual changes.


See the [Vue Configuration Reference](https://cli.vuejs.org/config/).
