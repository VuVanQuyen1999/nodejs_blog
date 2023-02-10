const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

// newsController.index

router.get("/Create", courseController.create);
router.post("/store", courseController.store);
router.post("/handle-form-actions", courseController.handleFormActions);
router.get("/:id/edit", courseController.edit);
router.patch("/:id/restore", courseController.restore);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);
router.delete("/:id/force", courseController.forceDelete);
router.get("/:slug", courseController.show);

module.exports = router;
