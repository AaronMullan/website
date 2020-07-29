import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Row, Col } from '~components/common/grid'
import DownloadData from '~components/pages/state/download-data'
import { LargeStateGrade } from '~components/pages/state/state-grade'
import StateLinks from '~components/pages/state/state-links'
import preambleStyle from './preamble.module.scss'

export default ({ state, covidState }) => {
  const { contentfulSnippet } = useStaticQuery(
    graphql`
      query {
        contentfulSnippet(slug: { eq: "state-grades-preamble" }) {
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    `,
  )
  // todo make state grade wrap as a circle with the grade description
  return (
    <div className={preambleStyle.wrapper}>
      <Row>
        <Col width={[4, 3, 6]}>
          <h4 className={preambleStyle.header}>Where this data comes from</h4>
          <StateLinks
            twitter={state.twitter}
            covid19Site={state.covid19Site}
            covid19SiteSecondary={state.covid19SiteSecondary}
            covid19SiteTertiary={state.covid19SiteTertiary}
            stateName={state.name}
          />
        </Col>
        <Col width={[4, 3, 6]}>
          <h4 className={preambleStyle.header}>Current data quality grade</h4>
          <div className={preambleStyle.gradeWrapper}>
            <div
              className={preambleStyle.gradeDescription}
              dangerouslySetInnerHTML={{
                __html: contentfulSnippet.content.childMarkdownRemark.html,
              }}
            />
            <LargeStateGrade letterGrade={covidState.dataQualityGrade} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col width={[4, 6, 6]}>
          <div className={preambleStyle.lastUpdatedContainer}>
            <p className={preambleStyle.lastUpdated}>
              State’s last reported update time: {covidState.lastUpdateEt} ET
            </p>
          </div>
        </Col>
        <Col width={[4, 6, 6]}>
          <DownloadData state={state} />
        </Col>
      </Row>
    </div>
  )
}