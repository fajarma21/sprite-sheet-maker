import css from './View.module.scss';
import type { ImageProps } from './View.types';

const Image = ({ onClick, ...rest }: ImageProps) => {
  return (
    <div className={css.container} onClick={onClick}>
      <img {...rest} />
      <div className={css.overlay} />
    </div>
  );
};

export default Image;
