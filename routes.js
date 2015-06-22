var _ = require('underscore');

module.exports = function (app) {
    app.post('/*', function (req, res) {

        var schema={
            type: Object,
            "schema":
            {
                "totalRecords": {type:Number},
                "skip": {type:Number},
                "take": {type:Number},
                "payload":
                {
                    type: Array,
                    "schema":
                    {type:Object,
                        "schema":
                        {
                            "country": {type:String},
                            "description": {type:String},
                            "drm" :{type:Boolean},
                            "episodeCount" :{type:Number},
                            "genre" :{type:String},
                            "image" :
                            {type:Object,
                                "schema":
                                {
                                    "showImage":{type:String}
                                }
                            },
                            "language" :{type:String},
                            "nextEpisode" :
                            {type:Object,
                                "schema":
                                {
                                    "channel": { type: String },
                                    "channelLogo": { type: String },
                                    "date": { type: String },
                                    "html": { type: String },
                                    "url": { type: String }
                                }
                            },
                            "primaryColour" :{type:String},
                            "seasons":
                            {
                                type:Array,
                                "schema":
                                {type:Object,
                                    "schema":
                                    {
                                        "slug" :{type:String, required: false}
                                    }
                                }
                            },
                            "slug" :{type:String, required: false},
                            "title":{type:String, required: false},
                            "tvChannel":{type:String}
                        }
                    }
                }
            }

        };
        var isvalid = require('isvalid');
        var validJson=true;
        isvalid(req.body,schema
            , function(err, validObj) {
                if (!validObj) {
                    validJson = false;
                }
                handleRequest(validJson,res,err,req);
            });
    })

    function handleRequest(validJson,res,err,req){
        if (!validJson) {
            res.setHeader('content-type', 'application/json');
            res.status(400);
            res.json({
                "error": "Could not decode request: JSON parsing failed"
            });
            console.log(new Date());
            console.log('------------------payload body:--------------------')
            console.log(req.body);
            console.log('------------------end payload body:--------------------')
            console.log('----------------------payload with error--------------------------------------')
            console.log(err);
            console.log('------------------end payload with error--------------------')

        }
        else
        {
            var resp = _.filter(_.where(req.body.payload, {drm: true}), function (item) {
                return item.episodeCount > 0
            });

            var newArray = [];
            resp.forEach(function (item) {
                var newItem = _.pick(item, 'image', 'slug', 'title');
                newItem.image = _.propertyOf(newItem.image)('showImage');
                newArray.push(newItem);
            })

            res.setHeader('content-type', 'application/json');
            res.status(200);
            res.json({response: newArray});


            console.log(new Date());
            console.log('------------------Fine after valid jsonschema--------------------')
        }
    }

}