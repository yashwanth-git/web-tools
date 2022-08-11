function paginate(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < Object.keys(model).length) {
      results.next = page + 1;
    }

    results.lastPage = Math.floor(Object.keys(model).length / limit) + 1;

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
