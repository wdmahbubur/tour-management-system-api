const { addNewTourService, getToursService, getTourByIdService, updateTourByIdService, remove, incrementTourViewService } = require("../services/tour.service");

exports.addTour = async (req, res) => {
    try {
        const tour = await addNewTourService(req.body);

        res.status(201).json({
            message: "New Tour Added Successful",
            tour,
        })

    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getTours = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ["sort", "fields", "limit", "page"];

        excludeFields.forEach(field => delete filters[field]);

        let options = {};

        if (req.query.limit) {
            const limit = req.query.limit;
            options.limit = limit;
        }

        if (req.query.page) {
            const skip = parseInt(req.query.page - 1) * parseInt(req.query.limit);
            options.skip = skip;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            options.fields = fields;
        }

        if (req.query.sort) {
            const sort = req.query.sort.split(",").join(" ");
            options.sort = sort;
        }

        const tours = await getToursService(filters, options);
        res.status(200).json({
            tours
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


exports.getTourById = async (req, res) => {
    try {
        const id = req.params.id;
        const tour = await incrementTourViewService(id);
        res.status(200).json({
            tour
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

exports.updateTourById = async (req, res) => {
    try {
        const id = req.params.id;

        const exist = await getTourByIdService(id);
        if (!exist) {
            return res.status(400).json({
                message: "No tour found for this id!",
            })
        }

        const tour = await updateTourByIdService(id, req.body);

        res.status(200).json({
            message: "Tour update successful",
            tour
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
};

exports.getTrendingTours = async (req, res) => {
    try {
        const filters = {};
        const options = {
            sort: "-view",
            limit: 3
        };
        const tours = await getToursService(filters, options);
        res.status(200).json({
            tours
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
};


exports.getCheapestTours = async (req, res) => {
    try {
        const filters = {};
        const options = {
            sort: "price",
            limit: 3
        };
        const tours = await getToursService(filters, options);
        res.status(200).json({
            tours
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
};