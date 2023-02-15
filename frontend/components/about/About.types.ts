export interface PanelMemberType {
   id: number
   title: string
   firstName: string
   lastName: string
   email: string
   Institution?: {
      name: string
      street: string
      postalCode: number
      city: string
      country: string
   }
}
