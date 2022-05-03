const createProduct = async (req, res) => {
  res.send('createProduct')
}

const getAllProducts = async (req, res) => {
  res.send('getAllProducts')
}

const getProductById = async (req, res) => {
  res.send('getProductById')
}

const updateProduct = async (req, res) => {
  res.send('updatePublisher')
}

const deleteProduct = async (req, res) => {
  res.send(' deletePublisher')
}

const uploadImage = async (req, res) => {
  res.send('uploadImage')
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadImage,
}
