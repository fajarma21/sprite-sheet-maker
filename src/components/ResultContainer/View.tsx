import { useCallback, useEffect, useRef, useState } from 'react';

import ViewOption from './components/ViewOption';
import css from './View.module.scss';
import type { ResultContainerProps } from './View.types';

const ResultContainer = ({
  children,
  col,
  row,
  totalImage,
  onUpdateWidth,
}: ResultContainerProps) => {
  const [view, setView] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUpdateWidth = useCallback(
    (w: number) => {
      if (onUpdateWidth) onUpdateWidth(w);
    },
    [onUpdateWidth]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    if (view) {
      handleUpdateWidth(container.clientWidth);
      container.scrollLeft = 0;
    } else {
      handleUpdateWidth(0);
    }
  }, [handleUpdateWidth, totalImage, view, col, row]);

  return (
    <>
      <ViewOption view={String(view)} onChange={setView} />

      <p className={css.info}>
        Sorted by filename, left-to-right then top-to-bottom.
        <br />
        Click the image to remove it.
      </p>

      <div
        ref={containerRef}
        className={css.container}
        data-fit={!!view || undefined}
      >
        {children}
      </div>
    </>
  );
};

export default ResultContainer;
