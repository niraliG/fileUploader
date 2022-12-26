require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const db = require("../Database/Models");
async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { sub, email } = ticket.getPayload();
  const [created] = await db.user.upsert(
    { googleId: sub, email: email },
    { raw: true, nest: true }
  );
  return created;
}

module.exports = {
  verifyToken,
};
