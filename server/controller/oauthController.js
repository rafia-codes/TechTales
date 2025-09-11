const { generateTokens, setAuthCookies } = require("../utils/tokenmanager");

module.exports.oauthsuccess = async (req, res) => {
  if (!req.user) res.status(401).json({ message: "Authentication failed" });
  const { accesstoken, refreshtoken } = generateTokens(req.user);
  setAuthCookies(res, accesstoken, refreshtoken);
  console.log("Cookies:", req.cookies.accesstoken);
  console.log("AccessToken:", req.cookies.refreshtoken);
  res.redirect("https://techtalesapp.netlify.app/discover");
};
