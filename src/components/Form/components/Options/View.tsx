import { type ChangeEvent } from 'react';

import css from './View.module.scss';
import type { OptionsProps } from './View.types';

const Options = ({ data: { col, row }, onChange }: OptionsProps) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: Number(value) });
  };

  return (
    <div className={css.container}>
      <label htmlFor="row">Row</label>
      <input
        type="number"
        id="row"
        name="row"
        min={0}
        value={Number(row) || ''}
        placeholder="Auto"
        onChange={handleChangeInput}
      />
      <label htmlFor="col">Column</label>
      <input
        type="number"
        id="col"
        name="col"
        min={0}
        value={Number(col) || ''}
        placeholder="Auto"
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default Options;
