module.exports = {
  details: function (data) {
    if (Array.isArray(data)) {
      return data.map((subcategory) => ({
        _id: subcategory._id,
        name: subcategory.name,
        description: subcategory.description,
        image: subcategory.image,
        category: {
          _id: subcategory.category._id,
          name: subcategory.category.name,
          image: subcategory.category.image
        },
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt
      }));
    } else {
      return {
        _id: data._id,
        name: data.name,
        description: data.description,
        image: data.image,
        category: data.category,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    }
  }
};
