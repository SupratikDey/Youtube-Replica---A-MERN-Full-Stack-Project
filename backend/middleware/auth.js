const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Please login first!' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to the request so routes can use it
        req.user = decoded;
        next(); 
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { authenticate };