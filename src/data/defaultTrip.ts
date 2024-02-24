import { Trip } from '../components/Home/Home';

const date: Date = new Date();
const inFourDays: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 4);
const startDate: string = date.toISOString().split('T')[0];
const endDate: string = inFourDays.toISOString().split('T')[0];

export const defaultTrip: Trip = {
  id: 'default',
  city: 'Berlin',
  imageUrl:
    'https://cdn.pixabay.com/photo/2020/05/01/15/18/brand-front-of-the-brandenburg-gate-5117579_640.jpg',
  startDate,
  endDate,
  owner: '',
};
