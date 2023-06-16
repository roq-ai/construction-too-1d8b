import axios from 'axios';
import queryString from 'query-string';
import { RentalPriceInterface, RentalPriceGetQueryInterface } from 'interfaces/rental-price';
import { GetQueryInterface } from '../../interfaces';

export const getRentalPrices = async (query?: RentalPriceGetQueryInterface) => {
  const response = await axios.get(`/api/rental-prices${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRentalPrice = async (rentalPrice: RentalPriceInterface) => {
  const response = await axios.post('/api/rental-prices', rentalPrice);
  return response.data;
};

export const updateRentalPriceById = async (id: string, rentalPrice: RentalPriceInterface) => {
  const response = await axios.put(`/api/rental-prices/${id}`, rentalPrice);
  return response.data;
};

export const getRentalPriceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/rental-prices/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRentalPriceById = async (id: string) => {
  const response = await axios.delete(`/api/rental-prices/${id}`);
  return response.data;
};
