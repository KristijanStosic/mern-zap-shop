const createPublisher = async (req, res) => {
  res.send('createPublisher')
}

const deletePublisher = async (req, res) => {
  res.send(' deletePublisher')
}
const getAllPublishers = async (req, res) => {
  res.send('getAllPublishers')
}

const getPublisherById = async (req, res) => {
  res.send('getPublisherById')
}

const updatePublisher = async (req, res) => {
  res.send('updatePublisher')
}

export {
  createPublisher,
  deletePublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
}
