module.exports = (data) => {
  let text = '';

  const loop = data.map((value, index) => {
    const result = `Value of ${index} is ${value} | `;
    text += `Value of ${index} is ${value} | `;
    return result;
  });

  const result = {
    loop,
    text,
  };

  return result;
};
