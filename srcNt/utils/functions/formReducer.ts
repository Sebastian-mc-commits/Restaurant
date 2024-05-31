import React from 'react';
import inputReducer, {InputReducerFilterType} from './inputReducer';

type DispatcherProps = {
  type: string;
  payload: {
    name: InputReducerFilterType;
    data: {
      message: string;
      hasError: boolean;
      isTouched: boolean;
      value: string | boolean;
    };
  };
};

const onDispatchFormReducer = (
  isTouched: boolean,
  dispatcherType: string,
  text: string | number,
  payloadType: InputReducerFilterType,
  dispatcher: React.Dispatch<DispatcherProps>,
  //   dispatcher: (dispatcherProps: DispatcherProps<PayloadType, TextType>) => void,
) => {
  const {hasError, message} = inputReducer<typeof text>(text, payloadType);
  dispatcher({
    type: dispatcherType,
    payload: {
      name: payloadType,
      data: {
        hasError,
        message,
        isTouched,
        value: text,
      },
    },
  });
};

export default onDispatchFormReducer;
