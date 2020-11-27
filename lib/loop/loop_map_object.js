const object_loop = (data) => {
  let text = '';

  data.forEach((val) => {
    text += `${val.name} | `;
  });

  return text;
};

module.exports = object_loop;
