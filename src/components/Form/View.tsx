import Options from './components/Options';
import Uploader from './components/Uploader';

import css from './View.module.scss';
import type { FormProps } from './View.types';

const Form = ({ options, onChangeOptions, onProcessImages }: FormProps) => {
  return (
    <div className={css.container}>
      <Uploader onProcessImages={onProcessImages} />
      <Options data={options} onChange={onChangeOptions} />
    </div>
  );
};

export default Form;
