import {gql} from '@apollo/client'

// HOME ----------------------------------------------------------
export const GET_HOME_PAGE = gql`
   query {
      pageHome {
         cover_images {
            id
            caption
            url
            width
            height
         }
         goal_statement
      }
   }
`

// EVENTS --------------------------------------------------------
export const GET_EVENTS_PAGE = gql`
   query {
      eventsPage {
         id
         created_at
         updated_at
         event_introduction
         published_at
         ContactForm {
            introduction
         }
      }
   }
`

export const GET_EVENTS = gql`
   query {
      events {
         id
         created_at
         updated_at
         title
         description
         beginEvent
         endEvent
         eventCode
         location
         contact
         beginEventTime
         endEventTime
         url
         eventType
      }
   }
`

export const GET_EVENT_BY_ID = gql`
   query Event($id: ID!) {
      event(id: $id) {
         id
         created_at
         updated_at
         title
         description
         beginEvent
         endEvent
         eventCode
         location
         contact
         beginEventTime
         endEventTime
         url
         eventType
      }
   }
`

// ANNOUNCEMENTS -----------------------------------------------
export const GET_ANNOUNCEMENTS = gql`
   query {
      announcements {
         id
         created_at
         updated_at
         title
         content
         author
      }
   }
`
export const GET_ANNOUNCEMENT_BY_ID = gql`
   query Announcement($id: ID!) {
      announcement(id: $id) {
         id
         created_at
         updated_at
         title
         content
         author
      }
   }
`
// NEWSLETTERS -----------------------------------------------
export const GET_NEWSLETTER_PAGE = gql`
   query {
      pageNewsletter {
         id
         created_at
         updated_at
         published_at
         newsletter_introduction
         GuidelinesForAuthors {
            introduction
            guideline_resources {
               url
            }
         }
      }
   }
`

export const GET_NEWSLETTERS = gql`
   query {
      newsletters {
         id
         created_at
         updated_at
         number
         title
         date
         content
         issueEditor
         chiefEditor
         pdf
      }
   }
`
// ABOUT ------------------------------------------------------
export const GET_ABOUT_PAGE = gql`
   query {
      pageAbout {
         id
         created_at
         updated_at
         published_at
         panelMember_introduction
         contactForm_introduction
      }
   }
`

export const GET_RELATED_LINKS = gql`
   query {
      relatedLinks {
         id
         created_at
         updated_at
         published_at
         url
         name
      }
   }
`
export const GET_PANELMEMBERS = gql`
   query {
      panelMembers {
         id
         created_at
         updated_at
         title
         firstName
         lastName
         email
         Institution {
            name
            street
            postalCode
            city
            country
         }
      }
   }
`

// FOOTER -----------------------------------------------------
export const GET_SECURITY = gql`
   query {
      footer {
         security
      }
   }
`

export const GET_PRIVACY = gql`
   query {
      footer {
         privacy
      }
   }
`
export const GET_LEGAL = gql`
   query {
      footer {
         legal
      }
   }
`
