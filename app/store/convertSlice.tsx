import {createSlice} from '@reduxjs/toolkit';

const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    baseCurrency: {code: 'USD', amt: 0},
    targetCurrency: {code: 'NGN', amt: 0},
    conversion_rate: 1500,
  },

  reducers: {
    upDateBaseCurrency(currentState, actions) {
      currentState.baseCurrency.code = actions.payload;
    },
    upDateBaseCurrencyAmt(currentState, action) {
      const newBaseAmt = action.payload;
      const updatedBaseCurrency = {
        ...currentState.baseCurrency,
        amt: newBaseAmt,
      };
      const updatedTargetAmt = currentState.conversion_rate * newBaseAmt;
      return {
        ...currentState,
        baseCurrency: updatedBaseCurrency,
        targetCurrency: {...currentState.targetCurrency, amt: updatedTargetAmt},
      };
    },

    upDateTargetCurrencyAmt(currentState, action) {
      const newTargetAmt = action.payload;
      const updatedTargetCurrency = {
        ...currentState.targetCurrency,
        amt: newTargetAmt,
      };
      const updatedBaseAmt = newTargetAmt / currentState.conversion_rate;
      return {
        ...currentState,
        targetCurrency: updatedTargetCurrency,
        baseCurrency: {...currentState.baseCurrency, amt: updatedBaseAmt},
      };
    },

    upDateTargetCurrency(currentState, actions) {
      currentState.targetCurrency.code = actions.payload;
    },
    swap(currentState) {
      const tempBase = currentState.baseCurrency.code;
      currentState.baseCurrency.code = currentState.targetCurrency.code;
      currentState.targetCurrency.code = tempBase;
    },
    updateRate(currentState, actions) {
      currentState.conversion_rate = actions.payload;
      const updatedTargetAmt =
        currentState.conversion_rate * currentState.baseCurrency.amt;
      const target = {...currentState.targetCurrency, amt: updatedTargetAmt};
      currentState.targetCurrency = target;
    },
  },
});

export const convertSliceAction = convertSlice.actions;

export default convertSlice;
