const { Schema, model } = require('mongoose');
//imports the date getter function
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getters transform the data every time it's queried, like middleware
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        // In Mongoose, we instruct the parent to keep track of its children
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    //reduce iterates through array to tally up total
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//Creates the Pizza Model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//Exports the model
module.exports = Pizza;