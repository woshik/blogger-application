const bcrypt = require('bcryptjs');

exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(10)
      .then((getSalt) => {
        bcrypt
          .hash(password, getSalt)
          .then((hashPassword) => resolve(hashPassword))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
