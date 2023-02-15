import {NewsletterItem} from './NewsletterItem'
import React, {useEffect, useState} from 'react'
import {isEmpty} from 'lodash'
import {Newsletter} from './Newsletters.types'
import {PaginationControlled} from '../SearchComponent/Pagination'
import {SearchBar} from '../SearchComponent/SearchBar'

interface NewsletterTableWithSearchType {
   newsletters: Newsletter[]
}
export const NewsletterTableWithSearch: React.FC<NewsletterTableWithSearchType> = ({
   newsletters
}) => {
   const updateNewsletterOnPageChange = (pageChange) => {
      setCurrentPage(pageChange)
   }
   const calcTotalPages = () => {
      return Number(filteredNewsletters.length / pageSize) ===
         filteredNewsletters.length / pageSize && (filteredNewsletters.length / pageSize) % 1 !== 0
         ? Math.floor(filteredNewsletters.length / pageSize + 1)
         : filteredNewsletters.length / pageSize
   }

   const [filteredNewsletters, setFilteredNewsletters] = useState(newsletters)
   const [pageSize, setPageSize] = useState(3)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)

   useEffect(() => {
      setTotalPages(calcTotalPages())
   }, [filteredNewsletters])
   console.log(filteredNewsletters)
   //TODO: ADD some sort of sorting (decending or ascending)
   return (
      <div className="gen-wrapper-newsletter newsletters-past-newsletters-background">
         <h1 className="gen-subheading-rest">PAST NEWSLETTERS</h1>
         <SearchBar
            searchType="NEWSLETTERS"
            updateResults={setFilteredNewsletters}
            data={newsletters}
         />
         <div className="sb-results-outer-box">
            {!isEmpty(filteredNewsletters) ? (
               filteredNewsletters
                  .slice(pageSize * currentPage - pageSize, pageSize * currentPage)
                  .map((newsletterItem) => (
                     <NewsletterItem key={newsletterItem.id} item={newsletterItem} />
                  ))
            ) : (
               <div className="sb-no-results-box">
                  <p className="sb-no-results-paragraph text-center my-5">
                     No Newsletters available yet.
                  </p>
               </div>
            )}
         </div>
         <PaginationControlled
            totalPages={totalPages}
            color="primary"
            pageUpdate={updateNewsletterOnPageChange}
         />
      </div>
   )
}
