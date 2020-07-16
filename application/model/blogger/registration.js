'use strict';

const { hashPassword } = require('../../../helpers/global');
const getDB = require('../getDB');

exports.registration = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _blogger = await getDB().collection('blogger');
      let bloggerData = await _blogger.findOne(
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

      if (!!bloggerData) {
        return resolve({
          success: false,
          info: 'Blogger already registered.',
        });
      }

      let hashedPassword = await hashPassword(userInfo.password);

      _blogger.insertOne({
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
          rd: rd,
          token: token,
        },
      });
    } catch (error) {
      return reject(error);
    }
  });
};
