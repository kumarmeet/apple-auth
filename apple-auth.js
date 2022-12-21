const path = require("path");

const appleAuth = async (res, token) => {
  const appleConfig = require("../../config/apple.config.json");
  
  //download the p8 file from apple sign setup
  const appleKeyPath = path.join(
    __dirname,
    "..",
    "..",
    "apple-login-key",
    "AuthKey_SXSFU4WV3V.p8"
  );

  const clientSecret = appleSignIn.getClientSecret({
    ...appleConfig,
    privateKeyPath: appleKeyPath,
    expAfter: 15777000,
  });

  const options = {
    clientID: appleConfig.clientID,
    redirectUri: appleConfig.redirectUri,
    clientSecret: clientSecret,
  };

  try {
    return await appleSignIn.verifyIdToken(token, options);
  } catch (err) {
    console.error(err);
    return res.status(498).json({
      status: false,
      message: "Not authorized due to invalid token!!",
    });
  }
};

//controller
appleLogin: async function (req, res) {
  const payload = await appleAuth("your apple signin token", res)
  return res.status(200).json(payload);
}
