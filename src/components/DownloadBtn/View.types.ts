import type { ReactNode } from 'react';

export interface DownloadBtnProps {
  children?: ReactNode;
  display?: boolean;
  error?: string;
  onGenerateUrl: () => Promise<string>;
}
