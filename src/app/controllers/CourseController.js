const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class CourseController {
    // [GET] /show
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("../../resources/courses/show.hbs");
            })
            .catch(next);
    }
}

module.exports = new CourseController();
