interface IBody {
  [key: string]: string;
}

export const validateBody = (body: IBody): boolean => {
  const values: string[] = Object.values(body);
  const check = values.some(value => value === '');
  if (check) return false;
  return true;
};
