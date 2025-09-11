const jwt = require('jsonwebtoken');

function generateTokens(user, rememberMe=false) {
    const payload = {
        id: user._id,
        name: user.username,
    };
    const accesstoken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    const refreshtoken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: rememberMe?'30d':'7d',
    });
    return { accesstoken, refreshtoken };
}


function setAuthCookies(res, accesstoken, refreshtoken, rememberMe=false) {
    res.cookie('accesstoken', accesstoken, {
        httpOnly: true,
        sameSite:'none',
        secure: true,
        maxAge: 60 * 60 * 1000, 
    });

    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        sameSite:'none',
        secure: true,
        maxAge: (rememberMe)? 30 * 24 * 60 * 60 * 1000:7 * 24 * 60 * 60 * 1000, 
    });
}

module.exports = {generateTokens,setAuthCookies};
