import React, {useMemo, forwardRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import {currencies} from '../config/data';
import {CurrencyType} from '../../type';

interface AppBottomSheetProps {
  handleSheetChanges: (index: number) => void;
  handledismissSheet: () => void;
  handleSelectedCurrency: (item: CurrencyType) => void;
}

const BottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  (props, ref) => {
    // variables
    const snapPoints = useMemo(() => ['85%'], []);

    const renderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          onPress={() => props.handleSelectedCurrency(item)}
          className="flex justify-between  px-2 my-[2vh] py-[0.5px] w-full  ">
          <Text className="text-lg text-white">{item?.country}</Text>
          <Text className="text-lg text-white">{item?.code}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onChange={props.handleSheetChanges}
        handleComponent={() => (
          <View className="w-full items-center py-4">
            <View className="w-[30%] h-[1vh] rounded-full bg-white" />
          </View>
        )}
        style={styles.bottomSheet}
        backgroundStyle={styles.contentContainer}>
        <BottomSheetFlatList
          data={currencies}
          keyExtractor={(item: any, i) => item.code?.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View className="w-full h-[0.5px] bg-white self-center" />
          )}
        />
      </BottomSheetModal>
    );
  },
);
export default BottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#6b7280',
  },
  bottomSheet: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
});
