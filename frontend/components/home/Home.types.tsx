export interface PageHome {
   cover_images: Array<cover_images>
   goal_statement: string
}

export interface cover_images {
   id: number
   caption: string
   url: string
   width: number
   height: number
}
