const jwt = require('jsonwebtoken');

module.exports = () => {
  return (req, res, next) => {
    const token = req.header('Authorization');
    const unauthenticated = {
      status: 'unauthenticated',
      message: 'Invalid header token',
    };

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.status(401).json(unauthenticated);

        return next();
      });

      return true;
    }
    return res.status(401).json(unauthenticated);
  };
};
