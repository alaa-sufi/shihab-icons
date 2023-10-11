import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';
interface Props {
  lang: string;
}
function MyDocument({ lang }: Props): ReactElement {
  const isRtl = lang === 'ar'; // check if the language is Arabic

  return (
    <Html lang={lang} dir={isRtl ? 'rtl' : 'ltr'}>
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  const lang = ctx?.locale || 'en'; // get the current language from the query string, default to English
  return { ...initialProps, lang };
};

export default MyDocument;