const Library = require('../model/librarySchema.js');

// Fetches all followed artists from db for a specific user

exports.getFollowedArtists = async (req, res) => {
  try {
    const {username} = req.body;
    const artists = await Library.find({username: "username"});
    res.send(artists);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
