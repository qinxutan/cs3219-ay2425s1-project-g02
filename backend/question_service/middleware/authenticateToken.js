const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Token required' });

  try {
    // Verify token with user service
    const response = await fetch('http://localhost:5001/verify-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json(); 
      req.user = userData; // Store user data in request
      next();
    } else {
      const errorData = await response.json(); // Get the error response
      res.status(response.status).json({ message: errorData.message || 'Invalid Token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Question Service Server Error' });
  }
};

module.exports = authenticateToken;
