'use strict';

// TODO: code redundant for registration.

const { hashPassword } = require('../../../helpers/global');
const getDB = require('../getDB');

exports.registration = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _commenter = await getDB().collection('commenter');
      let commenter = await _commenter.findOne(
        {
          $or: [
            {
              email: userInfo.email,
            },
          ],
        },
        {
          projection: {
            _id: 1,
          },
        }
      );

      if (!!commenter) {
        return resolve({
          success: false,
          info: 'Blogger already registered.',
        });
      }

      let hashedPassword = await hashPassword(userInfo.password);

      _commenter.insertOne({
        name: userInfo.name,
        mobile: userInfo.mobile_number,
        email: userInfo.email,
        password: hashedPassword,
        account_create_date: new Date(),
      });

      return resolve({
        success: true,
        info: {
          email: userInfo.email,
        },
      });
    } catch (error) {
      return reject(error);
    }
  });
};
