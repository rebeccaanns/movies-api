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
      },
      username: {
        type: String
      },
      password: {
        type: String
      },
      googleId: {
        type: String
      }
    })
  );

  return Experience;
}
