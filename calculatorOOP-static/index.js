// const { calc } = require("./app");
const Calculator = require("./Calculator");
const { command, numbers } = require("./utils");
// console.log(Calculator);
// console.log(Calculator.calc(command, numbers));
// const calc = new Calculator(command, numbers);
// console.log(calc.init());
console.log(Calculator.init(command, numbers));
