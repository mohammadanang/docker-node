module.exports = (data) => {
  let text = '';

  const loop = data.forEach((value, index) => {
    text += `Value of ${index} is ${value} | `;
  });

  const result = {
    loop,
    text,
  };

  return result;
};
