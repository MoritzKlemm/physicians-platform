import {GET_PANELMEMBERS} from '../graphql/queries'
import {useQuery} from 'react-query'
import request from 'graphql-request'
import {endpointGraphql} from './QueryProvider'
import {PanelMemberType} from '../components/about/About.types'

export const usePanelMembers = (initialData: PanelMemberType[]) => {
   return useQuery<Array<PanelMemberType>, Error>(
      'panelMembers',
      async () => {
         const {panelMembers} = await request(endpointGraphql, GET_PANELMEMBERS)
         return panelMembers
      },
      {
         initialData: initialData
      }
   )
}
