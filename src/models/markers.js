import mongoose from "mongoose";

export const MarkersModel = mongoose.model('markers', {
    name: String,
    location: [Number]
})