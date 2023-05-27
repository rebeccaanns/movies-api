module.exports = (mongoose) => {
  const Movies = mongoose.model(
    "movies",
    mongoose.Schema({
      title: {
        type: String
      },
      director: {
        type: [String]
      },
      stars: {
        type: [
          String
        ]
      },
      releaseDate: {
        type: Date
      },
      genre: {
        type: String
      },
      rating: {
        type: String
      },
      animated: {
        type: Boolean
      },
      audienceScore: {
        type: String
      }
    })
  );

  return Movies;
};
