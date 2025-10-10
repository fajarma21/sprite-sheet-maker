import type { ChangeEvent } from 'react';

import css from './View.module.scss';
import type { ViewOptionProps } from './View.types';
import { VIEW_OPTIONS } from './View.constants';

const ViewOption = ({ view, onChange }: ViewOptionProps) => {
  const handleSelectView = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={css.viewOption}>
      <select id="view" value={view} onChange={handleSelectView}>
        {VIEW_OPTIONS.map(({ value, text }, index) => (
          <option key={`view-${index}`} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ViewOption;
