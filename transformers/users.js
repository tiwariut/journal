module.exports = {
  details: function (data) {
    if (Array.isArray(data)) {
      return data.map((user) => ({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
    } else {
      return {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        dob: data.dob,
        aboutMe: data.aboutMe,
        profilePicture: data.profilePicture,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    }
  }
};
