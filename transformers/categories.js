module.exports = {
  details: function (data) {
    if (Array.isArray(data)) {
      return data.map((category) => ({
        _id: category._id,
        name: category.name,
        description: category.description,
        image: category.image,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }));
    } else {
      return {
        _id: data._id,
        name: data.name,
        description: data.description,
        image: data.image,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    }
  }
};
