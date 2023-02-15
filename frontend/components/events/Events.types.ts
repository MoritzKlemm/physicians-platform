export interface EventPageType {
   eventsPrefetched: EventType[]
   events: EventType[]
   pageContent: {
      ContactForm: {information: string}
      event_introduction: string
      id: string
   }
}

export interface GuidelinesAndTemplatesForEvents {
   header: string
   introduction: string
   GuidelinesAdvancedBeamDynamicsWorkshops: string
   GuidelinesMiniWorkshop: string
}

export interface EventType {
   title: string
   id: number | string
   updated_at: string
   description: string
   beginEvent: string
   endEvent: string
   eventCode: string
   location: string
   published_at: string
   url: string
   eventType: string
   beginEventTime: string
   endEventTime: string
   contact: string
}
export interface EventComponentType {
   event: EventType
   key: string | number
}
