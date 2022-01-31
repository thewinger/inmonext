import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html
        lang='es'
        className='h-screen bg-fixed bg-right-bottom bg-cover bg-[url("../public/background.png")]'
      >
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body className=''>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
