const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Course = new Schema(
    {
        name: { type: String, default: "", maxLength: 255, required: true },
        description: { type: String, default: "", maxLength: 600 },
        videoId: { type: String, default: "", required: true, maxLength: 255 },
        level: { type: String, default: "", maxLength: 255 },
        image: { type: String, default: "", maxLength: 255 },
        slug: { type: String, slug: "name", unique: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", Course);
