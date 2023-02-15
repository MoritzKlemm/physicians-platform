export interface Newsletter {
   id: string
   created_at: string | Date
   updated_at: string | Date
   number: number
   title: string
   date: string | Date
   pdf: string
   content: string
   issueEditor: string
   chiefEditor: string
}

export interface GuidelinesAndTemplates {
   guidelinesAndTemplate: GuidelinesAndTemplate
}

interface GuidelinesAndTemplate {
   explanation: string
   updated_at: string | Date
   pdf: string
}
