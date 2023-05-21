module.exports = (mongoose) => {
  const Experience = mongoose.model(
    "experiences",
    mongoose.Schema({
      seen: {
        type: Boolean
      },
      liked: {
        type: Boolean
      },
      personalRating: {
        type: String
      }
    })
  );

  return Experience;
}
