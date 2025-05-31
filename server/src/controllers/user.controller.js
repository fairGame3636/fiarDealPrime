const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      wallet: user.wallet,
      role: user.role,
      deviceId: user.deviceId,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMe
}; 