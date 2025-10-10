import { useRef, type ChangeEvent, type DragEvent } from 'react';
import { FaImage } from 'react-icons/fa6';

import type { ImageData } from '@/types';

import { ACCEPTED_FORMAT } from './View.constants';
import css from './View.module.scss';
import type { UploaderProps } from './View.types';

const Uploader = ({ onProcessImages }: UploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const getImageData = (file: File): Promise<ImageData> => {
    return new Promise((resolve) => {
      const imgUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        resolve({
          id: Date.now(),
          url: imgUrl,
          name: file.name,
          lastmodified: file.lastModified,
          width: img.width,
          height: img.height,
        });
      };
    });
  };

  const getMuliImageData = (
    files: FileList,
    length: number
  ): Promise<ImageData[]> => {
    return new Promise((resolve) => {
      const newImgs: ImageData[] = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        getImageData(file).then((res) => {
          newImgs.push(res);
          if (newImgs.length === length) resolve(newImgs);
        });
      }
    });
  };

  const handleUpload = async (files: FileList) => {
    try {
      const newImgs = await getMuliImageData(files, files.length);
      onProcessImages(newImgs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleUpload(files);
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>, isDrop = false) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDrop) {
      const data = e.dataTransfer;
      const files = data.files;

      if (files) handleUpload(files);
    }
  };

  const handleClickUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <>
      <button
        type="button"
        className={css.uploader}
        onDragEnter={handleDrop}
        onDragOver={handleDrop}
        onDragLeave={handleDrop}
        onDrop={(e) => handleDrop(e, true)}
        onClick={handleClickUpload}
      >
        <FaImage size={40} className={css.icon} />
        <p>
          Drop your images here
          <br />
          or click to upload
        </p>
      </button>
      <input
        ref={inputRef}
        multiple
        hidden
        type="file"
        accept={ACCEPTED_FORMAT}
        onChange={handleChangeUpload}
      />
    </>
  );
};

export default Uploader;
