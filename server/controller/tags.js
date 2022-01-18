const Library = require('../model/librarySchema.js');

// Get all tags in the account

exports.getTags = async (req, res) => {
  try {
    const tags = await Library.find({username: req.params.username}, { tags: 1 });
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
    const tag = await Library.findOneAndUpdate({username: req.params.username}, {
      $push: {
        "tags": {name: name}
      }
    })
    res.send(tag)
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Add new tag to artist

exports.tagArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    const {name} = req.body;
    const tag = await Library.updateOne({
      "username": "mavienajera"
    },
    {
      $push: {
        "artists.$[i].artistTags": {
          name: name
        }
      }
    },
    {
      arrayFilters: [
        {
          "i.id": id
        }
      ]
    });
    res.send(tag);
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Untag artist

exports.untagArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    const {name} = req.body;
    const tag = await Library.updateOne({
      "username": "mavienajera"
    },
    {
      $pull: {
        "artists.$[i].artistTags": {
          name: name
        }
      }
    },
    {
      arrayFilters: [
        {
          "i.id": id
        }
      ]
    })
    res.send(tag);
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
