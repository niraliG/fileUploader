require("dotenv").config();
const { user: userSchema } = require("../Database/Models");
async function googleAuthorization(req, res, next) {
  try {
    const googleId = req.headers.google_id;
    if (!googleId) {
      res.status(400).send({ message: "No Token Provided" });
    }
    const user = await userSchema.findOne({
      where: {
        googleId: googleId,
      },
    });
    if (user) {
      next();
    } else {
      res.status(401).send({ message: "Please Login" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = googleAuthorization;
