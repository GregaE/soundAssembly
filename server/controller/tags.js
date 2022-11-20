const Library = require('../model/librarySchema.js');

exports.getTags = async (req, res) => {
  try {
    const tagsData = await Library.aggregate([
      { $match: { username: req.params.username}},
      { $unwind: '$tags'},
      { $sort: { 'tags.name': 1}},
      { $group: {
          _id: "$_id",
          tags: {
            $push: "$tags"
          }
        }
      }
    ])
    res.send(tagsData[0].tags);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

exports.createTag = async (req, res) => {
  try {
    const {name} = req.body;
    const tag = await Library.findOneAndUpdate({username: req.params.username}, {
      $push: {
        "tags": { name }
      }
    })
    res.send(tag)
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.body;
    const tag = await Library.updateOne({
      "username": req.params.username
    },
    {
      "$pull": {
        "tags": {
          "_id": id
        }
      }
    })
    res.send(tag)
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

exports.tagArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    const {name} = req.body;
    const tag = await Library.updateOne({
      "username": req.params.username
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

exports.untagArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    const {name} = req.body;
    const tag = await Library.updateOne({
      "username": req.params.username
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
