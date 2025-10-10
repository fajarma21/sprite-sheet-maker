import type { OptionData } from '@/types';

export interface OptionsProps {
  data: OptionData;
  onChange: (data: Partial<OptionData>) => void;
}
