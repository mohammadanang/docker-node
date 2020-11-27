const isString = (input) => {
  return typeof input === 'string';
};

const task1 = (data1, data2) => {
  const result = [];
  const check1 = isString(data1);
  const check2 = isString(data2);

  if (check1 === true && check2 === true) {
    result.push(data1);
    result.push(data2);

    return result;
  }
  return 'Failed';
};

const task2 = (name, email) => {
  const result = {
    name,
    email,
  };

  return result;
};

module.exports = {
  task1,
  task2,
};
