import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='shortcut icon' href='/images/logo/favicon.ico' />
          <link 
            rel='preload'
            href='/fonts/Roboto/Roboto-Black.ttf' 
            as='font'
            crossOrigin=''
          />
          <link 
            rel='preload'
            href='/fonts/Roboto/Roboto-Bold.ttf' 
            as='font'
            crossOrigin=''
          />
          <link 
            rel='preload'
            href='/fonts/Roboto/Roboto-Medium.ttf' 
            as='font'
            crossOrigin=''
          />
          <link 
            rel='preload'
            href='/fonts/Roboto/Roboto-Regular.ttf' 
            as='font'
            crossOrigin=''
          />
          <link 
            rel='preload'
            href='/fonts/Roboto/Roboto-Light.ttf' 
            as='font'
            crossOrigin=''
          />
          <link 
            rel='preload'
            href='/fonts/Roboto/Roboto-Thin.ttf' 
            as='font'
            crossOrigin=''
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument