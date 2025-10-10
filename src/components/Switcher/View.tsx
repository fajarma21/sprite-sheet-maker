import css from './View.module.scss';
import type { SwitcherProps } from './View.types';

const Switcher = ({ data, activeId, onChange }: SwitcherProps) => {
  return (
    <div className={css.container}>
      {data.map((item) => (
        <button
          key={item.id}
          type="button"
          className={css.switchBtn}
          data-active={item.id === activeId || undefined}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Switcher;
