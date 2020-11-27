const manipulate = (data) => {
  const result = {
    firstname: data.firstname,
    all: data,
  };

  return result;
};

const merge = function (data, input) {
  return data.concat(input);
};

const insert = (data, input) => {
  data.push(input);
};

module.exports = {
  manipulate,
  merge,
  add: insert,
};
