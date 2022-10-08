const Library = require('../model/librarySchema.js');

// Fetches all followed artists from db for a specific user

exports.getFollowedArtists = async (req, res) => {
  try {
    const limit = parseInt(req.query.pageSize);
    const slicePosition = parseInt(req.query.pageIndex) * limit;
    const library = await Library
      .find( {}, { artists: { $slice: [ slicePosition, limit ] } } )
    console.log(library);
    res.send(library[0].artists);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Fetches queried artist from db for a specific user

exports.getArtist = async (req, res) => {
  try {
    const id = req.params.artistId;
    const artistData = await Library.findOne({username: req.params.username}, {artists: 1, artists: {$elemMatch: {id: id}}});
    res.send(artistData.artists[0]);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
