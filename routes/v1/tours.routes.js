const router = require("express").Router();

const { addTour, getTours, getTourById, updateTourById, getTrendingTours, getCheapestTours } = require("../../controllers/tour.controller");

router
    .route("/tours/")
    .post(addTour)
    .get(getTours);


router
    .route("/tour/trending")
    .get(getTrendingTours);

router
    .route("/tour/cheapest")
    .get(getCheapestTours);


router
    .route("/tours/:id")
    .get(getTourById);

router
    .route("/tour/:id")
    .patch(updateTourById);


module.exports = router;
