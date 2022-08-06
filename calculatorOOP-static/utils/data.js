const [, , command, ...arg] = process.argv;

const numbers = arg.map((num) => Number(num));

module.exports = {
  command,
  numbers,
};
