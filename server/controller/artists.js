const Library = require('../model/librarySchema.js');

// Fetches all followed artists from db for a specific user

exports.getFollowedArtists = async (req, res) => {
  try {
    const limit = parseInt(req.query.pageSize ?? 20) ;
    const offset = parseInt(req.query.pageIndex ?? 0);
    const { tags } = req.body;
    const library = await Library
      .aggregate([
        { $match: { username: req.params.username}},
        { $unwind: '$artists'},
        { $sort: { 'artists.name': 1}},
        { $skip: offset * limit },
        { $limit: limit },
        { $match: {
          "$or": [
            { tags: [] },
            { 'artists.artistTags.name': {$in: tags} }
          ]}
        },
        {
          $group: {
            _id: "$_id",
            artists: {
              $push: "$artists"
            }
          }
        }
      ])
    res.send(library);
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
