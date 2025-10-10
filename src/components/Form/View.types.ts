import type { ImageData } from '@/types';
import type { OptionsProps } from './components/Options/View.types';

export interface FormProps {
  options: OptionsProps['data'];
  onChangeOptions: OptionsProps['onChange'];
  onProcessImages: (list: ImageData[]) => void;
}
