export type InputReducerFilterType = 'description' | 'title';

export type InputReducerReturnType = {
  message: string;
  hasError: boolean;
};
export default function <T>(
  value: T,
  type: InputReducerFilterType,
): InputReducerReturnType {
  let message: string = '';
  let hasError = false;

  switch (type) {
    case 'description': {
      if (typeof value !== 'string') {
        hasError = true;
      } else if (value.length <= 5) {
        message = 'The description must be 6 large';
        hasError = true;
      }
      break
    }
    
    case 'title': {
      if (typeof value !== 'string') {
        hasError = true;
      } else if (value.length <= 2) {
        message = 'The title must be 3 large';
        hasError = true;
      }
      break
    }

    default:
      return {
        hasError,
        message,
      };
  }

  return {
    hasError,
    message,
  };
}
