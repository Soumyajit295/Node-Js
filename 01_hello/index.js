/* This is how we import functionlies from any module */
const {add,sub,mul,div} = require('./math')

console.log("Hello from Node js")

console.log(add(2,3))
console.log(sub(2,3))
console.log(mul(2,3))
console.log(div(2,3))

/* What is Node Js : Node js is runtime enviroment which allow us to run javascript outside in browser */

/* console.log(window)  Throws an error window is not defined */

/* Reason behind the error : The window is part of browser it provides DOM,alert and localstorage like functionality but Nodejs is server side runtime and there is no DOM or browser window. Instead of window Nodejs has it's own gloabal object called global */

/* What is the package.json file : The package.json file is the heart of any Node project. It contains the metadata related to the project like the dependecies scripts and configuration of the project */

/* What is Modules in Node js : Modules are building block of Nodejs which we can export and import across the files it makes our code reusable and reduce the code duplicacy */

