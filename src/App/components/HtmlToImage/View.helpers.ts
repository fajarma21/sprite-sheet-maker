import type { GetColRowParams } from './View.types';

export const getColRow = ({ col, row, imagesLen }: GetColRowParams) => {
  let newCol = col;
  let newRow = row;

  if (imagesLen) {
    if (!col && !row) {
      newCol = Math.ceil(Math.sqrt(imagesLen));
      newRow = Math.ceil(imagesLen / newCol);
    } else if (col) {
      newCol = Math.min(col, imagesLen);
      newRow = Math.ceil(imagesLen / newCol);
    } else if (row) {
      newRow = Math.min(row, Math.ceil(imagesLen / newCol));
      newCol = Math.ceil(imagesLen / newRow);
    }
  }

  return { col: newCol, row: newRow };
};
