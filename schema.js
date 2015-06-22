{
  type: Object,
  "schema": {
    "totalRecords": {
      type: String
    },
    "skip": {
      type: Number
    },
    "take": {
      type: Number
    },
    "payload": {
      type: Array,
      "schema": {
        type: Object,
        "schema": {
          "country": {
            type: String
          },
          "description": {
            type: String
          },
          "drm": {
            type: Boolean
          },
          "episodeCount": {type: Number},
          "genre": {
            type: String
          },
          "image": {
            type: Object,
            "schema": {
              "showImage": {
                type: String
              }
            }
          },
          "language": {
            type: String
          },
          "nextEpisode": {
            type: Object,
            "schema": {
              "channel": {
                type: String
              },
              "channelLogo": {type: String},
              "date": {type: String},
              "html": {type: String},
              "url": {
                type: String
              }
            }
          },
          "primaryColour": {
            type: String
          },
          "seasons": {
            type: Array,
            "schema": {
              type: Object,
              "schema": {
                "slug": {
                  type: String,
                  required: false
                }
              }
            }
          },
          "slug": {
            type: String,
            required: false
          },
          "title": {
            type: String,
            required: false
          },
          "tvChannel": {type: String}
        }
      }
    }
  }
}