module.exports = (data) => {
  let text = '';

  for (let i = 0; i < data.length; i++) {
    text += `Value of ${i} is ${data[i]} | `;
  }

  return text;
};
