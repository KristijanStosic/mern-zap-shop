const createTokenUser = (user) => {
  return {
    userId: user._id,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  }
}

export default createTokenUser
