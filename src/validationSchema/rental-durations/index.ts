import * as yup from 'yup';

export const rentalDurationValidationSchema = yup.object().shape({
  duration: yup.number().integer().required(),
  tool_id: yup.string().nullable().required(),
});
