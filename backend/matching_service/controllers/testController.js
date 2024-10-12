const test = (req, res) => {
  res.status(200).json({ message: "Matching Service Connected" });
};

module.exports = { test };
