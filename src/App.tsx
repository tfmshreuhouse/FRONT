import { Fragment } from 'react';

import { RouterProvider } from "react-router-dom";
import router from './Router';
import { RecoilRoot } from 'recoil';

function App() {

  return (
    <Fragment>
      <RecoilRoot>
        <main>
          <RouterProvider router={router} />
        </main>
      </RecoilRoot>
    </Fragment>
  );
}

export default App;
