import React, {useEffect, useState} from 'react'
import {isEmpty} from 'lodash'
import Skeleton from '@material-ui/lab/Skeleton'
import {PaginationControlled} from '../SearchComponent/Pagination'
import {PanelMemberType} from './About.types'
import {SearchBar} from '../SearchComponent/SearchBar'
import PanelMemberCard from './PanelMemberCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'

interface PanelMemberWithSearch {
   panelMembers: Array<PanelMemberType>
   panelMember_introduction: string
}
export const PanelMembersWithSearch: React.FC<PanelMemberWithSearch> = ({
   panelMembers,
   panelMember_introduction
}) => {
   const updateNewsletterOnPageChange = (pageChange) => {
      setCurrentPage(pageChange)
   }
   const calcTotalPages = () => {
      return Number(filteredPanelMembers.length / pageSize) ===
         filteredPanelMembers.length / pageSize &&
         (filteredPanelMembers.length / pageSize) % 1 !== 0
         ? Math.floor(filteredPanelMembers.length / pageSize + 1)
         : filteredPanelMembers.length / pageSize
   }
   const [filteredPanelMembers, setFilteredPanelMembers] = useState(panelMembers)
   const [pageSize, setPageSize] = useState(6)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)

   useEffect(() => {
      setTotalPages(calcTotalPages())
   }, [filteredPanelMembers])

   // TODO: is loading
   if (false) return <Skeleton variant={'rect'}>Data elements are loading</Skeleton>
   return (
      <div className="gen-wrapper-about about-members-background  ">
         <h1 className="gen-subheading-first" style={{color: 'white'}}>
            PANEL MEMBERS
         </h1>
         <div className="ab-search-outer-box">
            <SearchBar
               searchType="PANELMEMBERS"
               updateResults={setFilteredPanelMembers}
               data={panelMembers}
            />
            <Container>
               <Row className="panel-members-with-search-cards-row p-5">
                  {!isEmpty(filteredPanelMembers) ? (
                     filteredPanelMembers
                        .sort(function (a, b) {
                           if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
                              return 1
                           }
                           if (b.lastName.toLowerCase() > a.lastName.toLowerCase()) {
                              return -1
                           }
                           return 0
                        })
                        .slice(pageSize * currentPage - pageSize, pageSize * currentPage)
                        .map((item, index) => (
                           <Col md={4} sm={6} className="ab-cols" key={index}>
                              <PanelMemberCard panelMember={item} />
                           </Col>
                        ))
                  ) : (
                     <PanelMemberCard panelMember={null} key={2} />
                  )}
               </Row>
            </Container>
            <PaginationControlled
               color={'primary'}
               totalPages={totalPages}
               pageUpdate={updateNewsletterOnPageChange}
            />
            <p className="gen-subheading-subtext-white mt-4">
               <Markdown>{panelMember_introduction}</Markdown>
            </p>
         </div>
      </div>
   )
}
