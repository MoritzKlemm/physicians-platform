import Document, {Html, Head, Main, NextScript} from 'next/document'
import {useUser} from '../context/UserProvider'
import {ServerStyleSheets} from '@material-ui/core/styles'
// import theme from '../Styles/theme'
import React from 'react'

export default class MyDocument extends Document {
   render() {
      return (
         <Html lang="en">
            <Head>
               {/* PWA primary color */}
               {/*<meta name="theme-color" content={theme.palette.primary.main} />*/}
               <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
               />
               {/* eslint-disable-next-line */}
               <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Staatliches" />
               <link
                  rel="stylesheet"
                  href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
               />
               {/* imports bootstrap styles */}
               <link
                  rel="stylesheet"
                  href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                  crossOrigin="anonymous"
               />
               <script
                  src="https://unpkg.com/react/umd/react.production.min.js"
                  crossOrigin="anonymous"
               ></script>

               <script
                  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                  crossOrigin="anonymous"
               ></script>

               <script
                  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                  crossOrigin="anonymous"
               ></script>

               <script
                  async
                  src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
               />
               <script
                  async
                  src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js"
               />
               <script async src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
   // Resolution order
   //
   // On the server:
   // 1. app.getInitialProps
   // 2. page.getInitialProps
   // 3. document.getInitialProps
   // 4. app.render
   // 5. page.render
   // 6. document.render
   //
   // On the server with error:
   // 1. document.getInitialProps
   // 2. app.render
   // 3. page.render
   // 4. document.render
   //
   // On the client
   // 1. app.getInitialProps
   // 2. page.getInitialProps
   // 3. app.render
   // 4. page.render

   // Render app and page and get the context of the page with collected side effects.
   const sheets = new ServerStyleSheets()
   const originalRenderPage = ctx.renderPage

   ctx.renderPage = () =>
      originalRenderPage({
         enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
      })

   const initialProps = await Document.getInitialProps(ctx)

   return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
   }
}
