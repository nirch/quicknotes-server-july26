const { noteSchema } = require("../data/noteSchema");

function noteValidation(req, res, next) {
  const result = noteSchema.safeParse(req.body);

  if (result.success) {
    next();
  } else {
    const error = new Error("Note Validation Error");
    error.status = 400;
    error.message = result.error.issues[0].message;
    next(error);
  }
}

module.exports = { noteValidation };
