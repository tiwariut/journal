const Q = require('q');

const advancedResults = (model, transformer, populate) => async (
  req,
  res,
  next
) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Convert query string to object
  queryStr = JSON.parse(queryStr);

  // Add search
  if (req.query.search) {
    queryStr.$or = [];
    const search = req.query.search.replace(/\\/g, ' ');
    const searchExp = new RegExp(search, 'i');

    queryStr.$or.push({ fullName: searchExp });
    queryStr.$or.push({ email: searchExp });
    queryStr.$or.push({ nameEN: searchExp });
    queryStr.$or.push({ nameIT: searchExp });
    queryStr.$or.push({ transactionId: searchExp });
  }

  // Finding resource
  query = model.find(queryStr);

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await Q.all([model.countDocuments(queryStr), query]);

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  // Get resource name
  const modelName = model.collection.collectionName;

  res.advancedResults = {
    success: true,
    message: `All ${modelName} found.`,
    count: results[1].length,
    pagination,
    data: transformer ? transformer(results[1], req.user.language) : results[1],
    total: results[0]
  };

  next();
};

module.exports = advancedResults;
