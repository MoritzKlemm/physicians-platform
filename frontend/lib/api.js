import axios from 'axios'

export function getStrapiURL(path = '') {
   return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, body) {
   const requestUrl = getStrapiURL(path)
   const response = await fetch(requestUrl) // TODO: cant handle empty data - error
   const data = await response.json()
   return data
}

export async function subscriptionAPI(data) {
   const endpointREST = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}` || 'http://localhost:1337'
   // const url = new URL(endpointREST)
   try {
      const response = await axios.get(endpointREST + '/subscribe', {
         params: {email: data}
      })
      return response
   } catch (e) {
      return e
   }
}

export async function contactFormAPI(data) {
   const endpointREST = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}` || 'http://localhost:1337'
   // const url = new URL(endpointREST)
   try {
      const response = await axios.post(endpointREST + '/contact_request', {
         email: data.email,
         fullName: data.fullName,
         message: data.message,
         formType: data.formType
      })
      return response
   } catch (e) {
      return e
   }
}

// Get site data from Strapi (metadata, navbar, footer...)
// Fetch global site settings from Strapi

export async function getGlobalData(locale) {
   // const globalLocales = await fetchAPI(`/global?_locale=${locale}`)
   const global = await fetchAPI('/global')

   return global
}
