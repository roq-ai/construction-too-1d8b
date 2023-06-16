import * as yup from 'yup';

export const rentalPriceValidationSchema = yup.object().shape({
  price: yup.number().integer().required(),
  tool_id: yup.string().nullable().required(),
});
