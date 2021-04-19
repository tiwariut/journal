module.exports = {
  details: function (data) {
    if (Array.isArray(data)) {
      return data.map((post) => ({
        _id: post._id,
        title: post.title,
        summary: post.summary,
        image: post.image,
        type: post.type,
        user: {
          _id: post.user._id,
          fullName: post.user.fullName,
          email: post.user.email,
          profilePicture: post.user.profilePicture
        },
        category: {
          _id: post.category._id,
          name: post.category.name,
          image: post.category.image
        },
        subcategory: {
          _id: post.subcategory._id,
          name: post.subcategory.name,
          image: post.subcategory.image
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }));
    } else {
      return {
        _id: data._id,
        title: data.title,
        summary: data.summary,
        content: data.content,
        image: data.image,
        type: data.type,
        user: data.user,
        category: data.category,
        subcategory: data.subcategory,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    }
  }
};
