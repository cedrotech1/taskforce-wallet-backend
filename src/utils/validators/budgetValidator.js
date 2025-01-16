import Joi from "joi";

const budgetSchema = Joi.object({
  limit: Joi.number().positive().required().messages({
    "any.required": "Budget limit is required",
    "number.base": "Budget limit must be a number",
    "number.positive": "Budget limit must be a positive number",
  }),
  currentSpending: Joi.number().min(0).optional().default(0).messages({
    "number.base": "Current spending must be a number",
    "number.min": "Current spending cannot be negative",
  }),
});

const editBudgetSchema = Joi.object({
  limit: Joi.number().positive().optional().messages({
    "number.base": "Budget limit must be a number",
    "number.positive": "Budget limit must be a positive number",
  }),
  currentSpending: Joi.number().min(0).optional().messages({
    "number.base": "Current spending must be a number",
    "number.min": "Current spending cannot be negative",
  }),
});

export const validateBudgetPayload = (payload) => {
  const { error, value } = budgetSchema.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(", "));
  }

  return value;
};

export const validateEditPayload = (payload) => {
  const { error, value } = editBudgetSchema.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(", "));
  }

  return value;
};
