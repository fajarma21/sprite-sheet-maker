import type { ReactNode } from 'react';

export interface ResultContainerProps {
  children: ReactNode;
  col: number;
  row: number;
  totalImage?: number;
  onUpdateWidth?: (width: number) => void;
}
