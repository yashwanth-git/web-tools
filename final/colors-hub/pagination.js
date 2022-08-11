function paginate(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < Object.keys(model).length) {
      console.log("First cond");
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      console.log("second cond");
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.colorPalettes = Object.keys(model)
      .slice(startIndex, endIndex)
      .reduce((result, key) => {
        result[key] = model[key];

        return result;
      }, {});
    res.paginatedResults = results;
    next();
  };
}

module.exports = {
  paginate,
};
