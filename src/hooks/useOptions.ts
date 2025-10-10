import type { OptionData } from '@/types';
import { useState } from 'react';

const useOptions = () => {
  const [options, setOptions] = useState({
    row: '0',
    col: '0',
  });

  const handleChangeOption = (data: Partial<OptionData>) => {
    setOptions((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return { options, handleChangeOption };
};

export default useOptions;
