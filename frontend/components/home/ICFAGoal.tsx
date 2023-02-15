import React from 'react'
import IconChevronRight from '../../Icons/IconChevronRight'
import IconChevronLeft from '../../Icons/IconChevronLeft'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ICFAGoal: React.FC<any> = () => {
   return (
      <div className="home-goal-wrapper">
         <Container fluid>
            <Row>
               <Col className="home-goal-chevron-col justify-content-end">
                  <IconChevronRight />
               </Col>
               <Col md={10} xs={12} className="home-goal-content-wrapper">
                  <p className="home-goal-content">
                     To encourage and promote international collaboration on beam dynamics studies
                     for present and future accelerators via Workshops and Newsletters.
                  </p>
               </Col>
               <Col className="home-goal-chevron-col">
                  <IconChevronLeft />
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default ICFAGoal
