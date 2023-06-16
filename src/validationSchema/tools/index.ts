import * as yup from 'yup';

export const toolValidationSchema = yup.object().shape({
  name: yup.string().required(),
  availability_status: yup.boolean().required(),
  company_id: yup.string().nullable().required(),
});
