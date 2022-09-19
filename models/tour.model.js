const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tour name is required."],
        unique: true,
    },
    type: {
        type: String,
        required: [true, "Must be a tour type."],
        enum: {
            values: ["Independent", "Inclusive", "Escorted", "Business"],
            message: "{VALUE} is not valid package type. Value must be Independent/Inclusive/Escorted/Business."
        },
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: [true, "Must be a tour location."],
    },
    price: {
        type: Number,
        required: [true, "Tour Price is required."],
        min: [1000, "Price can't will be less than 1000."],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Price must be an integer."
    },
    image: {
        type: String,
        required: [true, "Tour package image is required."]
    },
    view: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

tourSchema.pre("save", function () {
    this.view = 0;
});

const model = mongoose.model("Tour", tourSchema);
module.exports = model;