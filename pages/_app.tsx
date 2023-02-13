import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'uikit/dist/css/uikit.min.css';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// loads the Icon plugin
UIkit.use(Icons);
// components can be called from the imported UIkit reference
//UIkit.notification('Hello world.');

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
