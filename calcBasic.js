//sum

//sub

//mult

//div
const [, , command, ...arg] = process.argv;
const numbers = arg.map((num) => Number(num));
let res = null;
switch (command) {
  case "sum":
    res = numbers.reduce((total, num) => total + num, 0);
    console.log(res);
    break;
  case "sub":
    res = numbers.reduce((total, num) => total - num);
    console.log(res);
    break;
  case "mult":
    res = numbers.reduce((total, num) => total * num);
    console.log(res);
    break;
  case "div":
    res = numbers.reduce((total, num) => total / num);
    console.log(res);
    break;
  default:
    console.log("Unknown operations action");
    break;
}
