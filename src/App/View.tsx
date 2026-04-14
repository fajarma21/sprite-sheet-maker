import { useState } from 'react';

import Switcher from '@/components/Switcher';
import { IS_DEVELOPMENT } from '@/constants/env';

import CanvasToImage from './components/CanvasToImage';
import HtmlToImage from './components/HtmlToImage';

import css from './View.module.scss';

const App = () => {
  const [tab, setTab] = useState(1);

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        <span>Sprite</span>
        <span>Sheet</span>
        <span>Maker</span>
      </h1>
      {IS_DEVELOPMENT && (
        <Switcher
          data={[
            {
              id: 1,
              label: 'HTML to Image',
            },
            {
              id: 2,
              label: 'Canvas to Image',
            },
          ]}
          activeId={tab}
          onChange={setTab}
        />
      )}
      {tab === 1 ? <HtmlToImage /> : <CanvasToImage />}
    </div>
  );
};

export default App;
