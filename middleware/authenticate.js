const authenticate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid authorization header format' });
    }

    req.accessToken = tokenParts[1]; 
    next();  
};

export default authenticate;
