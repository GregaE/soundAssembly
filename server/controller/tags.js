const Tag = require('../model/tagSchema.js');

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.send(tags);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

exports.createTag = async (req, res) => {
  try {
    const {name} = req.body;
    const event = await Tag.create({name})
    res.status(201);
    res.send(event);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}