const Library = require('../model/librarySchema.js');

// Fetches all followed artists from db for a specific user

exports.getFollowedArtists = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize ?? 30) ;
    const pageNum = parseInt(req.query.pageIndex ?? 0);
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const pipeline = [
      { $match: { username: req.params.username}},
      { $unwind: '$artists'},
    ];

    if (tags && tags.length > 0) {
      pipeline.push({ $match: { 'artists.artistTags.name': {$in: tags} }})
    }
    pipeline.push(
      { $sort:
        { 'artists.name': 1 }
      },
      { $skip: pageNum * pageSize },
      { $limit: pageSize },
      {
        $group: {
          _id: '$_id',
          artists: {
            $push: '$artists'
          }
        }
      },
    );
    const library = await Library.aggregate(pipeline);
    res.send(library[0] ? library[0].artists : []);
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
