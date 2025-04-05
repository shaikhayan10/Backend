// backend/controllers/schoolController.js

const SchoolSchema = require("../model/SchoolModel");

const createSchool = async (req, res) => {
  const School = req.body;
  const savedSchool = await SchoolSchema.create(School);

  res.status(200).json({
    message: "School Created Successfully",
    data: savedSchool,
  });
};

const getSchool = async (req, res) => {
  const getSchool = await SchoolSchema.find();
  if (getSchool) {
    res.status(200).json({
      message: "School Fetched Successfully",
      data: getSchool,
    });
  } else {
    res.status(400).json({
      message: "Error In Fetching School",
    });
  }
};

module.exports = {
  createSchool,
  getSchool,
};