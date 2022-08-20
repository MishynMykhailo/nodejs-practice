class Calculator {
  // constructor(operator, numbers) {
  //   this.operator = operator;
  //   this.numbers = numbers;
  // }
  static calc(operator, numbers) {
    console.log("calc", this);
    let res = null;
    switch (operator) {
      case "sum":
        res = numbers.reduce((total, num) => total + num, 0);
        break;
      case "sub":
        res = numbers.reduce((total, num) => total - num);
        break;
      case "mult":
        res = numbers.reduce((total, num) => total * num);
        break;
      case "div":
        res = numbers.reduce((total, num) => total / num);
        break;
      default:
        console.log("Unknown operations action");
        break;
    }
    return res;
  }

  static init(operator, numbers) {
    console.log("init", this);
    return this.calc(operator, numbers);
  }
}
// const { command, numbers } = require("./utils");
module.exports = Calculator;
