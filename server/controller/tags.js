const Library = require('../model/librarySchema.js');

// Get all tags in the account

exports.getTags = async (req, res) => {
  try {
    const tags = await Library.find({username: "mavienajera"}, { tags: 1 });
    res.send(tags[0].tags);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Create a new tag

exports.createTag = async (req, res) => {
  try {
    const {name} = req.body;
    const tag = await Library.findOneAndUpdate({username: "mavienajera"}, {
      $push: {
        "tags": name
      }
    })
    res.send(tag);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// // Get all tags for the artist

// exports.getArtistTags = async (req, res) => {
//   try {
//     const tags = await Library.find({username: "mavienajera"}, { tags: 1 });
//     res.send(tags[0].tags);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// }

// exports.tagArtist = async (req, res) => {
//   try {
//     const {name} = req.body;
//     const tag = await Tag.create({name})
//     res.status(201);
//     res.send(tag);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// }

// exports.getTags = async (req, res) => {
//   try {
//     const tags = await Tag.find();
//     res.send(tags);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// }

// exports.createTag = async (req, res) => {
//   try {
//     const {name} = req.body;
//     const event = await Tag.create({name})
//     res.status(201);
//     res.send(event);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// }
