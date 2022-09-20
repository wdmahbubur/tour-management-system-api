const Tour = require("../models/tour.model");

exports.addNewTourService = async (data) => {
    try {
        const tour = new Tour(data);
        const result = await tour.save();
        return result;
    } catch (err) {
        if (err.code === 11000) {
            if (err.keyValue?.name) {
                throw new Error("Tour name already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
};

exports.getToursService = async (filters, options) => {
    try {
        const results = await Tour
            .find(filters)
            .skip(options.skip)
            .limit(options.limit)
            .sort(options.sort)
            .select(options.fields);
        return results;
    }
    catch (err) {
        throw new Error(err.message);
    }
};

exports.getTourByIdService = async (id) => {
    try {
        const tour = await Tour.findById(id);
        return tour;
    }
    catch (err) {
        throw new Error(err.message);
    }
};

exports.incrementTourViewService = async (id) => {
    try {
        const tour = await Tour.findByIdAndUpdate(id, { $inc: { view: 1 } }, {
            runValidators: true,
            new: true
        });
        return tour;
    }
    catch (err) {
        throw new Error(err.message);
    }
};

exports.updateTourByIdService = async (id, document) => {
    try {
        const tour = await Tour.findByIdAndUpdate(id, document, {
            runValidators: true,
            new: true
        });
        return tour;
    }
    catch (err) {
        if (err.code === 11000) {
            if (err.keyValue?.name) {
                throw new Error("Name already exist");
            }
        }
        else {
            throw new Error(err.message.split(":")[2]);
        }
    }
};

