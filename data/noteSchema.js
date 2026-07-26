const { z } = require("zod");

const noteSchema = z.object({
  id: z.string().optional(),
  text: z.string().max(500),
  title: z.string().max(30),
  date: z.string().datetime().optional(),
});

module.exports = { noteSchema };
