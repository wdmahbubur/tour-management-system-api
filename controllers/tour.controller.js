const { create, gets, getById, update, remove } = require("../services/tour.service");

exports.createTour = async (req, res) => {
    try {
        const document = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone
        }
        const newUser = await create(document);

        res.status(201).json({
            message: "New User Created Successful",
            user: newUser
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getTours = async (req, res) => {
    try {
        const query = req.query;
        const users = await gets(query);
        res.status(200).json({
            users
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}


exports.getTourById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getById(id);
        res.status(200).json({
            user
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.updateTourById = async (req, res) => {
    try {
        const id = req.params.id;

        const exist = await getById(id);
        if (!exist) {
            return res.status(404).json({
                message: "No user found!",
            })
        }

        const document = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone
        };
        const options = { new: true };

        const user = await update(id, document, options);
        res.status(200).json({
            message: "User update successful",
            user
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getTrendingTours = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getById(id);
        res.status(200).json({
            user
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}


exports.getCheapestTours = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getById(id);
        res.status(200).json({
            user
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}