const User = require('../models/User');

module.exports = {
  createSuperAdmin: async () => {
    let superAdmin = {
      firstName: process.env.SUPER_ADMIN_FIRST_NAME,
      lastName: process.env.SUPER_ADMIN_LAST_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'admin'
    };
    superAdmin.fullName = `${superAdmin.firstName} ${superAdmin.lastName}`;

    let user = await User.findOne({ email: superAdmin.email });

    if (!user) {
      await User.create(superAdmin);
      console.log('Supper admin created successfully.'.green.bold);
    } else {
      user.firstName = superAdmin.firstName;
      user.lastName = superAdmin.lastName;
      user.fullName = superAdmin.fullName;
      user.password = superAdmin.password;

      await user.save();
      console.log('Super admin updated successfully.'.gray.bold);
    }
  },

  // Get token from model, create cookie and send response
  sendTokenResponse: (user, statusCode, message, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      message,
      data: {},
      token
    });
  }
};
