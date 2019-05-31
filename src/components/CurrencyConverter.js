import React, { useEffect, useReducer } from "react";
import { symbols, getLatest } from "../api/currency";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import Loader from "./Loader";

const initialState = {
  bases: {},
  baseValue: 100,
  currentBase: "DKK",
  currentTarget: "GBP",
  error: false,
  errorMessage: "",
  lastEdited: "base",
  loading: false,
  targetValue: 0
};

const updateConversionState = state => {
  if (state.lastEdited === "base") {
    return {
      ...state,
      targetValue: (
        state.baseValue * state.bases[state.currentBase][state.currentTarget]
      ).toFixed(2)
    };
  }

  return {
    ...state,
    baseValue: (
      state.targetValue / state.bases[state.currentBase][state.currentTarget]
    ).toFixed(2)
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "changeBase": {
      return updateConversionState({ ...state, currentBase: action.symbol });
    }
    case "changeBaseValue": {
      return updateConversionState({
        ...state,
        baseValue: action.value,
        lastEdited: "base"
      });
    }
    case "changeTarget": {
      return updateConversionState({ ...state, currentTarget: action.symbol });
    }
    case "changeTargetValue": {
      return updateConversionState({
        ...state,
        targetValue: action.value,
        lastEdited: "target"
      });
    }
    case "receivedBase": {
      return updateConversionState({
        ...state,
        bases: { ...state.bases, [action.symbol]: action.rates },
        loading: false
      });
    }
    case "loading": {
      return { ...state, loading: true };
    }
    case "error": {
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.message
      };
    }
    default: {
      return state;
    }
  }
};

function CurrencyConverter() {
  const [
    {
      bases,
      baseValue,
      currentBase,
      currentTarget,
      error,
      errorMessage,
      loading,
      targetValue
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const handleBaseValueChange = event => {
    const value = event.target.value;

    dispatch({ type: "changeBaseValue", value: value });
  };

  const handleTargetValueChange = event => {
    const value = event.target.value;

    dispatch({ type: "changeTargetValue", value: value });
  };

  const handleChangeBase = async selection => {
    const symbol = selection.value;

    if (!(symbol in bases)) {
      await fetchBase(symbol);
    }

    dispatch({ type: "changeBase", symbol: symbol });
  };

  const handleChangeTarget = selection => {
    dispatch({ type: "changeTarget", symbol: selection.value });
  };

  const fetchBase = async symbol => {
    dispatch({ type: "loading" });

    try {
      const rates = await getLatest(symbol);

      dispatch({
        type: "receivedBase",
        symbol: symbol,
        rates: rates
      });
    } catch (e) {
      dispatch({ type: "error", message: e.message });
    }
  };

  useEffect(() => {
    fetchBase(currentBase);
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <p>
          <span role="img" aria-label="error">
            ❌
          </span>{" "}
          {errorMessage}
        </p>
      )}
      {!loading && !error && (
        <>
          <CurrencySelect
            label="base currency"
            suggestions={symbols.filter(item => item.value !== currentTarget)}
            value={currentBase}
            onChange={handleChangeBase}
          />
          <AmountInput
            id="baseValue"
            label={currentBase}
            onChange={handleBaseValueChange}
            value={baseValue}
          />
          <CurrencySelect
            label="target currency"
            suggestions={symbols.filter(item => item.value !== currentBase)}
            value={currentTarget}
            onChange={handleChangeTarget}
          />
          <AmountInput
            id="targetValue"
            label={currentTarget}
            onChange={handleTargetValueChange}
            value={targetValue}
          />
        </>
      )}
    </div>
  );
}

export default CurrencyConverter;
