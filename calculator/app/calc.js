const calc = (operator, numbers) => {
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
};

module.exports = calc;
