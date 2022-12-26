const { list, save } = require("../Models/files.model");
async function getFiles(req, res) {
  try {
    const filesList = await list(req.query);
    res.send({ message: "files fetched successfully!", data: filesList });
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
}

async function uploadFile(req, res) {
  try {
    const { file } = req;
    if (file == undefined) {
      res.status(400).send({ message: "Please upload a file!" });
    } else {
      await save(file);
      res.status(200).send({
        message: "Uploaded the file successfully",
      });
    }
  } catch (error) {}
}

module.exports = {
  getFiles,
  uploadFile,
};
