const router = require("express").Router();

const { addTour, getTours, getTourById, updateTourById, getTrendingTours, getCheapestTours } = require("../../controllers/tour.controller");

router
    .route("/")
    .post(addTour)
    .get(getTours);


router
    .route("/trending")
    .get(getTrendingTours);

router
    .route("/cheapest")
    .get(getCheapestTours);


router
    .route("/:id")
    .get(getTourById)
    .patch(updateTourById);


module.exports = router;
