const { file } = require("../Database/Models");
async function list(query) {
  const { currentPage, pageSize } = query;
  const pagination = {
    offset: (currentPage - 1) * pageSize || 0,
    limit: parseInt(pageSize),
  };
  const filesList = await file.findAndCountAll({
    ...pagination,
    order: [["fileName", "DESC"]],
  });
  return filesList;
}
async function save(fileObj) {
  const { filename, mimetype } = fileObj;
  const createFile = await file.create({
    fileName: filename,
    type: mimetype,
  });
  return createFile;
}
module.exports = {
  list,
  save,
};
