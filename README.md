`node.js` `#assembler-school` `#master-in-software-engineering`

# Assembler School: Node.js Intro Workshop <!-- omit in toc -->

In this workshop you will learn how to build backend apps with Node.js.

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
- [Contents and Branches Naming Strategy](#contents-and-branches-naming-strategy)
- [Workshop Material](#workshop-material)
- [What is Node.js?](#what-is-nodejs)
- [Our First Node App](#our-first-node-app)
- [nodemon](#nodemon)
- [Modules in Node.js](#modules-in-nodejs)
- [How Modules are Loaded](#how-modules-are-loaded)

## Getting Started

### The repo

First, you will need to clone the repo:

```bash
$ git clone https://github.com/assembler-school/nodejs-intro-workshop.git
```

### System Dependencies

Before we can get started you will need to make sure that all the necessary dependencies are installed in your system. For this project we need Node.js. You can install it by following the instructions [in the official docs](https://nodejs.org/en/) (we recommend that you install the version that is named _Current_).

To verify that you have installed it correctly, you can run the following command from the terminal that should output the version installed:

```bash
$ node --version
v15.5.0
```

### Project Dependencies

Then, you will have to install all the project dependencies with npm in the root folder:

```bash
$ npm install
```

## Contents and Branches Naming Strategy

The repository is made up of several branches that include the contents and exercises of each section.

The branches follow a naming strategy like the following:

- `{NN}-exercise`: includes the main contents and the instructions of the exercises
- `{NN}-exercise-solution`: includes the solution of the exercises

### Fetch all Branches

In order to fetch all the remote branches in the repository you can use the following command:

```bash
$ git fetch --all

# List both remote-tracking branches and local branches
$ git branch --all
```

Then, you can create a local branch based on a remote branch with the following command:

```bash
$ git checkout -b <new_branch_name> <remote_branch_name>
```

## Workshop Material

- [Slides](https://docs.google.com/presentation/d/1pLpAkMyX5NUx_0EyPNb-1BzjzUEtLaBaNA_1Qdsx-EM/edit?usp=sharing)

## What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

Node.js allows us to easily develop network applications such as web servers, web scrapers, cli tools and more. It uses Chrome's V8 JavaScript engine to communicate with a library written in C called `libuv` which is a multi-platform support library with a focus on asynchronous I/O that was primarily developed for use by Node.js, but it’s also used by other tools.

### Why Node.js?

One of the main advantages of Node.js is that since it is written in JavaScript, many front end developers that are used to coding in JavaScript can easily transition to a more back end role to develop services such as apis or cli tools.

## Our First Node App

Since we can use Node.js to execute javascript, if you create a script you will then be able to run it using node.

Create a `hello-world.js` inside the `src/utils` folder with the following code:

```js
console.log("hello-world from node.js");
```

And then run it with node:

```bash
$ node src/utils/hello-world.js
# it should output the following text
hello-world from node.js
```

## nodemon

The `nodemon` package makes it possible to automatically reload your program when you modify any file in the source code. If you run a script using just node it won't pick up any new changes you made to the file. On the other hand, you if run it using nodemon, every time you save the file, nodemon will execute the script again with the latest changes.

To install it run:

```bash
# Installing nodemon globally
npm install -g nodemon

# Installing nodemon locally
npm install --save-dev nodemon
```

### Using nodemon

To use nodemon, we can either run it from the terminal or as an npm script.

Run nodemon from the terminal

```bash
$ nodemon script_name.js
```

Run nodemon as an npm script:

```json
"scripts": {
    "start": "nodemon script_name.js"
}
```

## Modules in Node.js

In programming, modules are **self-contained** units of functionality that can be **shared** and **reused** across projects.

They make our lives as developers easier, as we can use them to augment our applications with functionality that we haven’t had to write ourselves. They also allow us to **organize and decouple** our code, leading to applications that are **easier to understand**, **debug** and **maintain**.

### CommonJS

Node.js by default uses CommonJS as its module system. In the latest versions we can also use ES Modules, but by default, all modules in Node.js will be imported using `require('path-to-module')` and exported using `module.exports = {}`.

If we want to use ES Modules with node we can either use Babel, a `*.mjs` file extension or add the following entry in the `package.json` file:

```json
{
  "type": "module"
}
```

### Converting our `hello-world.js` File to a Module

Node.js provides the `module.exports` interface to expose functions and variables to other files. The most simple way to do so is to export only one object (function or variable).

```js
module.exports = function (subject) {
  console.log("Hello " + subject);
};
```

### Other Ways of Exporting Modules in Node.js

Modules can also be declared outside of the `module.exports` object and then referenced inside it.

```js
// src/utils/first-modules.js
function hello(subject) {
  console.log("Hello " + subject);
}

module.exports = { hello: hello };
```

Or we can declared the modules as methods of the exported object:

```js
// src/utils/first-modules.js
module.exports = {
  hello: function (subject) {
    console.log("hello " + subject);
  },
  bye: function (subject) {
    console.log("goodbye " + subject);
  },
};
```

### Importing Modules

In order to import modules that we have created, we can use the `require('/path')` method of node.js.

```js
// src/utils/first-imports.js
const utils = require("./first-modules");

// { hello: [Function: hello], bye: [Function: bye] }
console.log(utils);

// hello Ana
utils.hello("Ana");
```

### Different Ways of Importing Modules in Node.js

We can import both our own modules and ones built into node.js or those that we have installed with npm.

```js
// import all the exported modules from utils.js
const utils = require("./utils");

// using destructuring to chose the modules we want
const { bye, hello } = require("./utils");

// importing built-in node modules
const http = require("http");

// importing modules from npm
const bcrypt = require("bcrypt");
```

### Every Module is Injected Only Once

Node.JS executes the module only the first time you require it. Any further require functions will re-use the same Object, loading it from the require cache, thus not executing the code in the module another time.
This reduces the number of file reads and helps to speed up the application.

```js
// not recommended, but it works
const bcrypt1 = require("http");
const bcrypt2 = require("http");
const bcrypt3 = require("http");
const bcrypt4 = require("http");
const bcrypt5 = require("http");
```

### Module Loading From node_modules

Modules can be required without using relative paths by putting them in a special directory called `node_modules`. For example, to require a module called foo from a file `index.js`, you can use the following directory structure:

```bash
index.js
└── node_modules
    └── foo
        ├── foo.js
        └── package.json
```

### Modules

Modules should be placed inside a directory, along with a `package.json` file. The main field of the `package.json` file should point to the entry point for your module —this is the file that is imported when users execute `require('your-module')`.

`main` defaults to `index.js` if not provided. Alternatively, you can refer to files relative to your module simply by appending the relative path to the require call: `require('your-module/path/to/file')`.

## How Modules are Loaded

### Global Modules

If you installed Node using the default directory, while in the global mode, NPM installs packages into `/usr/local/lib/node_modules`. If you type the following in the shell, NPM will search for, download, and install the latest version of the package named sax inside the directory `/usr/local/lib/node_modules/express`

```bash
$ npm install -g express
```

### Local Modules

In local mode installation NPM will download and install modules in the current working folders by creating a new folder called `node_modules`.

For example, if you are in `/home/user/apps/my_app` a new folder will be created that is called `node_modules` `/home/user/apps/my_app/node_modules` if does not already exist.

```bash
$ npm install bcrypt
```

### Loading Modules

When we reference a module, if the module is not a core module of node.js, node will try to find it in the `node_modules` folder of the current directory. If it doesn’t find it there, it will try to find it in the `node_modules` folder of the parent directory, and so on, until it finds it or fails.

```bash
../node_modules/module.js
../../node_modules/module.js
../../../node_modules/module.js
```

### 01-exercise

Open the `01-exercise.js` file inside the `src/exercises/01-exercise` folder and solve the exercise by following the instructions. Then, you can check if your solution is correct by running from the terminal the following command:

```bash
$ npm run test:ex:01
```

For this part you have 15 minutes to solve it. If you get stuck you can find the solution inside the `01-exercise-solution` branch. Once the time has passed the instructor will solve the exercise.

## Author <!-- omit in toc -->

[Dani Lucaci](https://github.com/danilucaci)

## License <!-- omit in toc -->

[MIT](https://choosealicense.com/licenses/mit/)
