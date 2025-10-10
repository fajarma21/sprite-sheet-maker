import css from './View.module.scss';
import type { DownloadBtnProps } from './View.types';

const DownloadBtn = ({
  children,
  display,
  error,
  onGenerateUrl,
}: DownloadBtnProps) => {
  const handleDownload = async () => {
    const url = await onGenerateUrl();

    if (url) {
      const link = document.createElement('a');
      link.download = 'sprite-sheet.png';
      link.href = url;
      link.click();
      link.remove();
    }
  };

  return (
    <div className={css.container} data-display={display || undefined}>
      <div className={css.content}>
        {error && <p>{error}</p>}
        {children}
        <button type="button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadBtn;
