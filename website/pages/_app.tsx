import '@/styles/globals.css';
import { appWithTranslation } from "next-i18next";
import type { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
        <meta charSet="UTF-8" />
        <title>shihab icons | أيقونات شهاب</title>
        <meta name="description" content="shihab-icons for React and figma,  230 icons in 2 different styles,24px grid-based " />
        <meta name="keywords" content="icons,react,icon,components,shihab" />
        <meta name="author" content="Work on it with love By Programming: Alaa Sufi & Design: Obeida amin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />

        {/* ============================================================================== */}
        {/* ==================================== IMAGES ================================== */}
        {/* Multiple og:image definitions are ok. The platform will find the one it needs. */}
        {/* ============================================================================== */}
        {/* ================ Safe generic defaults ================ */}
        {/* Use one of these at the very least. */}
        <meta property="og:image" content="1024x512.png" />
        {/* Generic safe dimension (Landscape). */}
        <meta property="og:image:width" content={'1024'} />
        <meta property="og:image:height" content={'512'} />
        <meta property="og:image" content="800x1200.png" />
        {/* Generic safe dimension (Portrait). */}
        <meta property="og:image:width" content={'800'} />
        <meta property="og:image:height" content={'1200'} />
        {/* ================ Facebook ================ */}
        {/* Facebook will give the user the choice to choose one of the og:image thumbnails. */}
        <meta property="og:image" content="1200x630.png" />
        {/* Recommended image for Facebook. (Max. 8MB)*/}
        <meta property="og:image:width" content={'1200'} />
        {/* Scales down to 470 */}
        <meta property="og:image:height" content={'630'} />
        {/* Scales down to 246 */}
        {/*  ================ Linkedin ================ */}
        <meta property="og:image" content="180x110.png" />
        {/* 180x110 Image for Linkedin - Do not exceed. */}
        <meta property="og:image:width" content={'180'} />
        <meta property="og:image:height" content={'110'} />
        {/* ================ Pinterest ================ */}
        <meta property="og:image" content="736x1128.png" />
        {/* Optimum Image for Pinterest. */}
        <meta property="og:image:width" content={'736'} />
        {/* Try to keep this width. */}
        <meta property="og:image:height" content={'1128'} />
        {/* Optimal size but can be any height. Aspect ratio between 2:3 and 1:3.5 recommended. */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/*[if lt IE 9]>

    <![endif]*/}


    </Head>
    <Component {...pageProps} />
  </>
}

export default appWithTranslation(App);
