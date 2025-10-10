import { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

import DownloadBtn from '@/components/DownloadBtn';
import Form from '@/components/Form';
import Img from '@/components/Image';
import ResultContainer from '@/components/ResultContainer';
import useOptions from '@/hooks/useOptions';
import type { ImageData } from '@/types';

import { getColRow } from './View.helpers';
import css from './View.module.scss';

const HtmlToImage = () => {
  const [maxSize, setMaxSize] = useState({
    w: 0,
    h: 0,
  });
  const [images, setImages] = useState<ImageData[]>([]);
  const [wrapperScale, setWrapperScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const { options, handleChangeOption } = useOptions();
  const { row, col } = getColRow({
    col: Number(options.col),
    row: Number(options.row),
    imagesLen: images.length,
  });

  const handelRemove = (id: number) => {
    const newImages = images.filter((item) => item.id !== id);

    setMaxSize(() =>
      newImages.reduce(
        (acc, img) => ({
          w: Math.max(acc.w, img.width),
          h: Math.max(acc.h, img.height),
        }),
        { h: 0, w: 0 }
      )
    );

    setImages(newImages);
  };

  const handleProcessImages = async (newImages: ImageData[]) => {
    setImages((prev) => {
      return [...prev, ...newImages].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });

    setMaxSize((prev) =>
      newImages.reduce(
        (acc, img) => ({
          w: Math.max(acc.w, img.width),
          h: Math.max(acc.h, img.height),
        }),
        prev
      )
    );
  };

  const handleGenerateUrl = async () => {
    if (!images.length || !containerRef.current) return '';

    const url = await toPng(containerRef.current, { pixelRatio: 1 });
    return url;
  };

  const handleUpdateScale = useCallback((parentWidth: number) => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    if (parentWidth && parentWidth < containerWidth) {
      setWrapperScale(parentWidth / containerWidth);
    } else setWrapperScale(1);
  }, []);

  return (
    <>
      <Form
        onProcessImages={handleProcessImages}
        options={options}
        onChangeOptions={handleChangeOption}
      />

      {!!images.length && (
        <ResultContainer
          row={row}
          col={col}
          totalImage={images.length}
          onUpdateWidth={handleUpdateScale}
        >
          <div
            className={css.imagesOuter}
            style={{
              transformOrigin: 'top left',
              scale: wrapperScale,
            }}
          >
            <div
              ref={containerRef}
              className={css.imagesContainer}
              style={
                {
                  '--col': col,
                  '--row': row,
                  '--w': `${maxSize.w}px`,
                  '--h': `${maxSize.h}px`,
                } as React.CSSProperties
              }
            >
              {images.map((item, index) => (
                <Img
                  key={`img-${index}`}
                  src={item.url}
                  alt={item.name}
                  onClick={() => handelRemove(item.id)}
                />
              ))}
            </div>
          </div>
        </ResultContainer>
      )}

      <DownloadBtn
        display={images.length > 1}
        onGenerateUrl={handleGenerateUrl}
      >
        <div className={css.info}>
          sprite-sheet.png
          <br />
          {` Row: ${row} Col: ${col}`}
          <br />
          {`${col * maxSize.w}x${row * maxSize.h}`}
        </div>
      </DownloadBtn>
    </>
  );
};

export default HtmlToImage;
