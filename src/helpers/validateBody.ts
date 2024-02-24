import { Trip } from '../components/Modal/Modal';

export const validateBody = (formData: Trip): boolean => {
  const values: string[] = Object.values(formData);

  const isValid = values.every(value => value !== '');
  return isValid;
};
