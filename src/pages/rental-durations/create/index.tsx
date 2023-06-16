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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRentalDuration } from 'apiSdk/rental-durations';
import { Error } from 'components/error';
import { rentalDurationValidationSchema } from 'validationSchema/rental-durations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ToolInterface } from 'interfaces/tool';
import { getTools } from 'apiSdk/tools';
import { RentalDurationInterface } from 'interfaces/rental-duration';

function RentalDurationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RentalDurationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRentalDuration(values);
      resetForm();
      router.push('/rental-durations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RentalDurationInterface>({
    initialValues: {
      duration: 0,
      tool_id: (router.query.tool_id as string) ?? null,
    },
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
            Create Rental Duration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'rental_duration',
  operation: AccessOperationEnum.CREATE,
})(RentalDurationCreatePage);
