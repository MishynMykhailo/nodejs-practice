class Calculator {
  constructor(operator, numbers) {
    this.operator = operator;
    this.numbers = numbers;
  }
  calc(operator, numbers) {
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
  // calc = (operator, numbers) => {
  //   let res = null;
  //   switch (operator) {
  //     case "sum":
  //       res = numbers.reduce((total, num) => total + num, 0);
  //       console.log(res);
  //       break;
  //     case "sub":
  //       res = numbers.reduce((total, num) => total - num);
  //       console.log(res);
  //       break;
  //     case "mult":
  //       res = numbers.reduce((total, num) => total * num);
  //       console.log(res);
  //       break;
  //     case "div":
  //       res = numbers.reduce((total, num) => total / num);
  //       console.log(res);
  //       break;
  //     default:
  //       console.log("Unknown operations action");
  //       break;
  //   }
  //   return res;
  // };
  init() {
    return this.calc(this.operator, this.numbers);
  }
  // init = () => {
  //   return this.calc(this.operator, this.numbers);
  // };
}
// const { command, numbers } = require("./utils");
module.exports = Calculator;
