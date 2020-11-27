module.exports = (data) => {
  const { length } = data;
  const result = {
    length,
    first: data[0],
    second: data[1],
    last: data[length - 1],
    all: data,
  };

  return result;
};
