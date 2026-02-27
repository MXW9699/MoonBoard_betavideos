const { z } = require("zod");

/** Zod schema for Problem (create/update validation) */
const problemCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  vGrade: z.string().optional().nullable(),
  fontGrade: z.string().optional().nullable(),
  board: z.string().optional().nullable(),
});

const problemUpdateSchema = problemCreateSchema.partial();

/** Parse and validate input for creating a problem. Throws ZodError if invalid. */
function validateProblemCreate(input) {
  return problemCreateSchema.parse(input);
}

/** Parse and validate input for updating a problem. Throws ZodError if invalid. */
function validateProblemUpdate(input) {
  return problemUpdateSchema.parse(input);
}

module.exports = {
  problemCreateSchema,
  problemUpdateSchema,
  validateProblemCreate,
  validateProblemUpdate,
};
