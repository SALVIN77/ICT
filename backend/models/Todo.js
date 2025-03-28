const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    status: { type: String, enum: ["ongoing", "completed"], required: true },
});

module.exports = mongoose.model("Todo", TodoSchema);
