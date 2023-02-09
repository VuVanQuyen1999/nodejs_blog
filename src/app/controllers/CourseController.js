const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
    // [GET] courses/show
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render("../../resources/courses/show.hbs", {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }
    // [GET] courses/Create
    create(req, res, next) {
        res.render("../../resources/courses/create.hbs");
    }

    // [POST] courses/store
    store(req, res, next) {
        const formData = { ...req.body };
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD-FIVd-JVbRkLycgNDndtfoVNCFA`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/me/stored/courses"))
            .catch((err) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("../../resources/courses/edit.hbs", {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        res.json(req.body);
    }
}

module.exports = new CourseController();
