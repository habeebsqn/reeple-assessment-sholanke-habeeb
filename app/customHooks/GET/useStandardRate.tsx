import {useQuery} from '@tanstack/react-query';
import {getStandardRate} from '../../config/api';
const useStandardRate = () => {
  return useQuery({
    queryKey: ['getStandardRate'],
    queryFn: getStandardRate,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export default useStandardRate;
