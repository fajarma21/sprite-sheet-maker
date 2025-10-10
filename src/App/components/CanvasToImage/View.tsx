import { useRef, useState } from 'react';

import DownloadBtn from '@/components/DownloadBtn';
import Form from '@/components/Form';
import useOptions from '@/hooks/useOptions';
import type { ImageData } from '@/types';

const CanvasToImage = () => {
  const [error, setError] = useState('');

  const maxW = useRef(0);
  const maxH = useRef(0);
  const images = useRef<ImageData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { options, handleChangeOption } = useOptions();

  const handleProcessImages = (newImgs: ImageData[]) => {
    setError('');

    images.current = [...images.current, ...newImgs].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        let newMaxW = maxW.current;
        let newMaxH = maxH.current;

        const cols = Math.ceil(Math.sqrt(images.current.length));
        const rows = Math.ceil(images.current.length / cols);

        images.current.forEach((img, index) => {
          newMaxW = Math.max(newMaxW, img.width);
          newMaxH = Math.max(newMaxH, img.height);

          const x = (index % cols) * newMaxW;
          const y = Math.floor(index / cols) * newMaxH;

          const image = new Image();
          image.src = img.url;
          image.onload = () => {
            ctx.drawImage(
              image,
              x + (newMaxW - img.width) / 2,
              y + (newMaxH - img.height) / 2,
              img.width,
              img.height
            );
          };
        });

        maxW.current = newMaxW;
        maxH.current = newMaxH;

        canvas.width = cols * newMaxW;
        canvas.height = rows * newMaxH;
      }
    }
  };

  const handleGenerateUrl = async () => {
    if (!images.current.length || !canvasRef.current) {
      setError('No images to process');
      return '';
    }

    return canvasRef.current.toDataURL('image/png');
  };

  return (
    <>
      <Form
        options={options}
        onProcessImages={handleProcessImages}
        onChangeOptions={handleChangeOption}
      />

      <canvas ref={canvasRef} />

      <DownloadBtn display error={error} onGenerateUrl={handleGenerateUrl} />
    </>
  );
};

export default CanvasToImage;
