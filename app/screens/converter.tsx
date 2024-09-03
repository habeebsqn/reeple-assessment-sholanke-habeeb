import {faCaretDown, faRetweet} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ConvertType, RootType, CurrencyType} from '../../type';
import {convertSliceAction} from '../store/convertSlice';
import BottomSheet from '../components/bottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import usPairConversion from '../customHooks/GET/usePairConversion';
import {useToast} from 'react-native-toast-notifications';

const Convert = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [input, setInput] = useState<string>('base');
  const {conversion_rate, baseCurrency, targetCurrency} = useSelector(
    (state: RootType) => state.convert,
  );

  const {
    error,
    data,
    isLoading,
    isRefetching,
    isLoadingError,
    isRefetchError,
    refetch,
    isFetching,
  }: any = usPairConversion({
    base: baseCurrency?.code,
    target: targetCurrency?.code,
  });

  const handleSwap = async () => {
    await dispatch(convertSliceAction.swap());
    refetch();
  };

  const handleSelectedCurrency = (Currency: CurrencyType) => {
    if (input === 'base') {
      dispatch(convertSliceAction.upDateBaseCurrency(Currency?.code));
    } else {
      dispatch(convertSliceAction.upDateTargetCurrency(Currency?.code));
    }
    handleDismissBottomSheet();
  };

  const baseAmtChange = (text: any) => {
    const amt = parseInt(text === '' ? 0 : text);
    dispatch(convertSliceAction.upDateBaseCurrencyAmt(amt));
  };

  const TargetAmtChange = (text: any) => {
    const amt = parseInt(text === '' ? 0 : text);
    dispatch(convertSliceAction.upDateTargetCurrencyAmt(amt));
  };

  const openBottomSheet = (input: string) => {
    setInput(input);
    bottomSheetRef.current?.present();
  };

  const handleDismissBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

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
        toast.show('an error occurred while fetching rate try again', {
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
      const {conversion_rate, result} = data?.data;
      if (result === 'success') {
        dispatch(convertSliceAction?.updateRate(conversion_rate));
      }
    }
  }, [
    data,
    error,
    isLoadingError,
    isRefetchError,
    isLoading,
    isRefetching,
    baseCurrency?.code,
    targetCurrency?.code,
  ]);

  return (
    <View className="flex-1 justify-start  px-[3vw] py-[10vh] gap-y-6 bg-white">
      <Text className="text-center text-lg uppercase text-blue-600">
        Currency Converter
      </Text>
      <View className="flex-col items-center w-full space-y-[30vh]">
        <View className="flex-row justify-between items-center rounded-full border-[1px] border-gray-600 p-[1rem] w-full h-[7vh]">
          <TouchableOpacity
            className="flex-row items-center justify-center h-full rounded-full w-[40vw] space-x-2"
            onPress={() => openBottomSheet('base')}>
            <Text className="font-bold text-3xl text-black">
              {baseCurrency?.code}
            </Text>
            <FontAwesomeIcon icon={faCaretDown} />
          </TouchableOpacity>
          <View className="h-[80%] w-[1px] bg-gray-500" />
          <TextInput
            className=" h-full w-[40vw] rounded-full text-lg truncate"
            placeholder="0.0"
            keyboardAppearance="dark"
            inputMode="numeric"
            enterKeyHint="previous"
            onChangeText={baseAmtChange}
            value={`${baseCurrency?.amt}`}
            numberOfLines={1}
            maxLength={12}
          />
        </View>

        <TouchableOpacity
          className="flex justify-center rounded-full border-[1.5px] border-black p-2"
          onPress={handleSwap}>
          <FontAwesomeIcon icon={faRetweet} />
        </TouchableOpacity>

        <View className="flex-row justify-between items-center rounded-full border-[1px] border-gray-600 p-[1rem] w-full h-[7vh]">
          <TouchableOpacity
            className="flex-row items-center justify-center h-full rounded-full w-[40vw]"
            onPress={() => openBottomSheet('target')}>
            <Text className="font-bold text-3xl text-black">
              {targetCurrency?.code}
            </Text>
            <FontAwesomeIcon icon={faCaretDown} />
          </TouchableOpacity>
          <View className="h-[80%] w-[1px] bg-gray-500" />
          <TextInput
            className=" h-full w-[40vw] rounded-full text-lg "
            placeholder="0.0"
            keyboardAppearance="dark"
            inputMode="numeric"
            enterKeyHint="previous"
            value={`${targetCurrency?.amt}`}
            onChangeText={TargetAmtChange}
            numberOfLines={1}
            maxLength={12}
          />
        </View>
      </View>

      {isFetching ? (
        <Text className="text-center">Updating rates...</Text>
      ) : (
        <Text className="text-center mt-4">
          Rate 1 {baseCurrency?.code} = {conversion_rate} {targetCurrency?.code}
        </Text>
      )}

      {error && !isLoading && !isRefetching && (
        <Button
          title="Refetch Rates"
          color={'black'}
          onPress={() => refetch()}
        />
      )}
      <BottomSheet
        handleSelectedCurrency={handleSelectedCurrency}
        ref={bottomSheetRef}
        handledismissSheet={handleDismissBottomSheet}
        handleSheetChanges={handleSheetChanges}
      />
    </View>
  );
};

export default Convert;
