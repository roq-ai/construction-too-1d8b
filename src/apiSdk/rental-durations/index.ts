import axios from 'axios';
import queryString from 'query-string';
import { RentalDurationInterface, RentalDurationGetQueryInterface } from 'interfaces/rental-duration';
import { GetQueryInterface } from '../../interfaces';

export const getRentalDurations = async (query?: RentalDurationGetQueryInterface) => {
  const response = await axios.get(`/api/rental-durations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRentalDuration = async (rentalDuration: RentalDurationInterface) => {
  const response = await axios.post('/api/rental-durations', rentalDuration);
  return response.data;
};

export const updateRentalDurationById = async (id: string, rentalDuration: RentalDurationInterface) => {
  const response = await axios.put(`/api/rental-durations/${id}`, rentalDuration);
  return response.data;
};

export const getRentalDurationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/rental-durations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRentalDurationById = async (id: string) => {
  const response = await axios.delete(`/api/rental-durations/${id}`);
  return response.data;
};
