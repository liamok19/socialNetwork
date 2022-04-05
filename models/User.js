const { use } = require('express/lib/application');
const { Schema, model } = require('mongoose');
// import { isEmail } from 'validator';
const {isEmail} = require('validator');


const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        userName:{
            item: { type: String, required: true, unique: true, trim: true  },
            maxlength: 50,
            minlength: 4,
            default: 'Unnamed user',
        },
        email: {
            item: { type: String, required: true, unique: true, trim: true },
            validate: [ isEmail, 'invalid email' ],
            thoughts: [thoughtSchema],
            friends: [
                {
                    type: Schema.Types.ObjectId, 
                    ref: 'friend', 
                },
            ],
        }
        },
        {
            toJSON: {
                virtuals:true
            },
            id: false,
        })

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
    });

module.exports = userSchema;