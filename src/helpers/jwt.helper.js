const JWT = require("jsonwebtoken");
const responseHelper = require("./response.helper");

module.exports.signAccessToken = async (user) => {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const token = await JWT.sign(payload, process.env.JWT_SECRETE);
  return token;
};

module.exports.generateToken = async (user) => {
  return JWT.sign({
    _id: user._id,
    fisrtName: user.fisrt_name,
    lastName: user.last_name,
    email: user.email,
}, 
process.env.JWT_SECRETE || "IAmASecret05dev@@crack",
{
    expiresIn: '40m',
}
)
}

module.exports.verifyJWTToken = async (authToken) => {
  const token = authToken.split(" ")[1];
  const payload = await JWT.verify(token, process.env.JWT_SECRETE);
  return payload;
};
module.exports.verificationToken = async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return responseHelper.requestfailure(res, "Token is required");
  }
  try {
    const user = JWT.verify(token, process.env.JWT_SECRETE);
    req.user = user;
    next();
  } catch (error) {
    return responseHelper.requestfailure(res, error);
  }
};