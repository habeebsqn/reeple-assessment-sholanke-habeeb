import axios from 'axios';

export const getPairConversion = async ({queryKey}) => {
  const [_key, {base, target}] = queryKey;

  return await axios.get(
    `${process.env.BASE_URL}/${process.env.KEY}/pair/${base}/${target}`,
  );
};

export const getStandardRate = async () => {
  return await axios.get(
    `${process.env.BASE_URL}/${process.env.KEY}/latest/USD`,
  );
};
