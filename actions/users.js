const User = require('../models/user.model');

const create = async (req) => {
  const { name, email, phone } = req.body;
  const insert_data = {
    name,
    email,
    phone: parseInt(phone, 10),
  };

  const data = new User(insert_data);
  await data.save();

  return data;
};

const getAll = async () => {
  const query = await User.find({}).exec();
  const data = query.map((v) => {
    return {
      name: v.name,
      email: v.email,
      phone: v.phone,
    };
  });

  return data;
};

const getDetail = async (id) => {
  const query = await User.findOne({
    _id: id,
  }).exec();

  return query;
};

const update = async (id, updated_data) => {
  const { name, email, phone, fresh } = updated_data;
  const opts = {
    new: fresh === 'true',
  };
  const data = {
    name,
    email,
    phone,
  };

  const query = await User.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    opts
  ).exec();

  return query;
};

const destroy = async (id) => {
  const query = await User.findOneAndDelete({
    _id: id,
  }).exec();

  return query;
};

module.exports = {
  create,
  getAll,
  getDetail,
  update,
  destroy,
};
