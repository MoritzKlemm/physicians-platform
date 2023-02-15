import React from 'react'
import IconEmail from '../../Icons/IconEmail'
import {PanelMemberType} from './About.types'

interface PanelMemberProps {
   key: number
   panelMember: PanelMemberType
}
export const PanelMember: React.FC<PanelMemberProps> = ({key, panelMember}) => {
   return (
      <tr className="d-flex" key={key}>
         <td className="col-2">
            <span className="ab-table-cell">
               {panelMember.firstName + ' ' + panelMember.firstName}
            </span>
         </td>
         <td className="col-3">
            <span className="ab-table-cell">
               <a className="ab-table-cell-email" href={panelMember.email}>
                  {panelMember.email}
               </a>{' '}
               <IconEmail /> <IconEmail />{' '}
            </span>
         </td>
         <td className="col-2">
            <span className="ab-table-cell">{panelMember.Institution.name}</span>
         </td>
         <td className="col-3">
            <span className="ab-table-cell">{panelMember.Institution.street}</span>
         </td>
         <td className="col-2">
            <span className="ab-table-cell">{panelMember.Institution.country}</span>
         </td>
      </tr>
   )
}
