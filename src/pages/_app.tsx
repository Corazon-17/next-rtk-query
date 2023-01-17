import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/libs/store";
import { Provider } from "react-redux";

// New method reference: https://github.com/kirill-konshin/next-redux-wrapper/blob/master/packages/demo-redux-toolkit/pages/_app.tsx
export default function App({ Component, ...pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

/** 
 * In RTK Query SSR, we're using wrapper.withRedux instead of ApiProvider.
 * Turns out this is legacy method (no longer supported)
 */
// export default wrapper.withRedux(App);
