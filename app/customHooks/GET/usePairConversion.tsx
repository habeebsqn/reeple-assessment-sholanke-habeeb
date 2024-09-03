import {useQuery} from '@tanstack/react-query';
import {getPairConversion} from '../../config/api';
const usPairConversion = ({base, target}: {base: string; target: string}) => {
  return useQuery({
    queryKey: ['getPairConversion', {base, target}],
    queryFn: getPairConversion,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default usPairConversion;
