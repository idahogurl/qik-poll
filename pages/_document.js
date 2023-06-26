import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" type="text/css" href="/stylesheets/main.css"></link>
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
