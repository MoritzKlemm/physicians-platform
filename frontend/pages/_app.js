import App from "next/app";
import Head from "next/head";
import "../Styles/App.css";
import { createContext, useEffect } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { QueryProvider } from "../hooks/QueryProvider";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import theme from "../Styles/Theme";

import { FilterProvider } from "../context/FilterProvider";
import { AuthProvider } from "../context/AuthProvider";
import { UserProvider, useUser } from "../context/UserProvider";
import { AuthApp } from "../components/AuthApp";
// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({Component, pageProps}) => {
   const {global} = pageProps
   const user = useUser()

   function handleRender(req, res) {
      const sheets = new ServerStyleSheets()

      // Render the component to a string.
      const html = ReactDOMServer.renderToString(
         sheets.collect(
            // <ThemeProvider theme={null}>
            <App />
            // </ThemeProvider>
         )
      )

      // Grab the CSS from the sheets.
      const css = sheets.toString()

      // Send the rendered page back to the client.
      res.send(renderFullPage(html, css))
   }

   // snippet to fix material-ui X next.js clash
   useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
         jssStyles.parentElement.removeChild(jssStyles)
      }
   }, [])

   return (
      <ApolloProvider client={apolloClient}>
         <QueryProvider>
            <AuthProvider>
               <UserProvider>
                  <FilterProvider>
                     <Head>
                        <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
                     </Head>
                     <GlobalContext.Provider value={global}>
                        <ThemeProvider theme={theme}>
                           <AuthApp Components={Component} props={pageProps} />
                        </ThemeProvider>
                     </GlobalContext.Provider>
                  </FilterProvider>
               </UserProvider>
            </AuthProvider>
         </QueryProvider>
      </ApolloProvider>
   )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
   // Calls page's `getInitialProps` and fills `appProps.pageProps`
   const appProps = await App.getInitialProps(ctx)
   // Fetch global site settings from Strapi
   const global = await fetchAPI('/global')
   // Pass the data to our page via props
   return {...appProps, pageProps: {global}}
}

export default MyApp
