import type { ImageData } from '@/types';

export interface UploaderProps {
  onProcessImages: (list: ImageData[]) => void;
}
