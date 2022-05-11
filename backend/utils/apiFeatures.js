class APIFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {}

    this.query = this.query.find({ ...keyword })
    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr }

    // Removing fields from the query
    const removeFields = ['keyword', 'limit', 'page']
    removeFields.forEach((el) => delete queryCopy[el])

    // Advance filter for price, ratings
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  pagination(pageSize) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = pageSize * (currentPage - 1)

    this.query = this.query.limit(pageSize).skip(skip)
    return this
  }

  sorting() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this
  }
}

export default APIFeatures
