const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  account: {
    artists: {
      items: [
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
        },
      ]
    }
  }
});

module.exports = mongoose.model('Account', AccountSchema)