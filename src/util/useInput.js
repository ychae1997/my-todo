//이 곳에 input custom hook을 만들어 보세요.
//return 해야 하는 값은 배열 형태의 값이어야 합니다.
import { useCallback, useState } from 'react';

function useInput(initialValue) {
  // value
  const [value, setValue] = useState(initialValue);
  const bind = {
    value, // "value" : value,
    onChange: useCallback(e => {
      setValue(e.target.value);
    }, [])
  };

  // reset
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  // return
  return [bind, setValue, reset];
}

export default useInput;
