const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLibrarySchema = new Schema({
  username: String,
  tags: [{
    name: String,
  }],
  artists: [
    {
      external_urls: {
        spotify: String,
      },
      followers: {
        href: Schema.Types.Mixed,
        total: Number,
      },
      genres: [String],
      href: String,
      id: String,
      images: [
        {
          height: Number,
          url: String,
          width: Number,
        }
      ],
      name: String,
      popularity: Number,
      type: String,
      uri: String,
      artistTags: [{
        name: String,
      }],
    },
  ]
},
  // Necessary for mongoose not to try to convert object type into string
  { typeKey: '$type' },
);

module.exports = mongoose.model('UserLibrary', UserLibrarySchema)