import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getRentalDurationById, updateRentalDurationById } from 'apiSdk/rental-durations';
import { Error } from 'components/error';
import { rentalDurationValidationSchema } from 'validationSchema/rental-durations';
import { RentalDurationInterface } from 'interfaces/rental-duration';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ToolInterface } from 'interfaces/tool';
import { getTools } from 'apiSdk/tools';

function RentalDurationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RentalDurationInterface>(
    () => (id ? `/rental-durations/${id}` : null),
    () => getRentalDurationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RentalDurationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRentalDurationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/rental-durations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RentalDurationInterface>({
    initialValues: data,
    validationSchema: rentalDurationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Rental Duration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="duration" mb="4" isInvalid={!!formik.errors?.duration}>
              <FormLabel>Duration</FormLabel>
              <NumberInput
                name="duration"
                value={formik.values?.duration}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.duration && <FormErrorMessage>{formik.errors?.duration}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<ToolInterface>
              formik={formik}
              name={'tool_id'}
              label={'Select Tool'}
              placeholder={'Select Tool'}
              fetcher={getTools}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'rental_duration',
  operation: AccessOperationEnum.UPDATE,
})(RentalDurationEditPage);
