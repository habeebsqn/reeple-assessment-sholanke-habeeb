import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import useStandardRate from '../customHooks/GET/useStandardRate';
import {useToast} from 'react-native-toast-notifications';
const Rates = () => {
  const [rates, setRates] = useState<any>([]);
  const toast = useToast();
  const {
    error,
    data,
    isLoading,
    isRefetching,
    isLoadingError,
    isRefetchError,
    refetch,
    isFetching,
  }: any = useStandardRate();

  const renderHistoryItem = ({item}: any) => {
    return (
      <View
        className={
          'flex-row justify-between px-[8vw] my-[2vh] py-[0.5px] w-full '
        }>
        <Text className="text-lg text-black">{item?.code}</Text>
        <Text className="text-lg text-gray">{item?.rate}</Text>
      </View>
    );
  };

  const refresh = () => {
    refetch();
  };

  useEffect(() => {
    if ((isLoadingError && !isLoading) || (isRefetchError && !isRefetching)) {
      if (error?.response === undefined) {
        toast.show('something went wrong check network', {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
        return;
      }
      if (error) {
        toast.show('an error occurred while fetching rates pull to refetch', {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
        return;
      }
      return;
    }

    if (data && !isLoading && !isRefetching) {
      const {conversion_rates} = data?.data;
      const ratesArray = Object.entries(conversion_rates).map(
        ([code, rate]) => ({
          code,
          rate,
        }),
      );
      setRates(ratesArray);
    }
  }, [data, error, isLoadingError, isRefetchError, isLoading, isRefetching]);

  const noHistory = (
    <View className="flex w-full justify-center items-center h-[8vh]">
      <Text className="text-lg gray uppercase font-extrabold">
        <Text className="text-lg text-black uppercase font-extrabold">no</Text>{' '}
        Rates{' '}
        <Text className="text-lg  text-black uppercase font-extrabold">
          history yet
        </Text>
      </Text>
    </View>
  );

  return (
    <View className="flex-1 justify-center pt-[4vh]">
      <Text className="text-center font-bold text-2xl">USD RATE</Text>
      <FlatList
        data={rates ? rates : []}
        keyExtractor={(item, i) => item?.code?.toString()}
        renderItem={renderHistoryItem}
        contentContainerStyle={{rowGap: 15, paddingBottom: 15}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isRefetching}
            tintColor={'#EB7824'}
            onRefresh={refresh}
          />
        }
        ItemSeparatorComponent={() => (
          <View className="w-full h-[0.5px] bg-gray-700 self-center" />
        )}
        ListEmptyComponent={noHistory}
      />
    </View>
  );
};

export default Rates;
