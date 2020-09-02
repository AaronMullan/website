import React, { useEffect } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Header from '~components/layout/header'
import SEO from '~components/utils/seo'

export default () => {
  const data = useStaticQuery(graphql`
    {
      contentfulSocialCard(slug: { eq: "ny-vs-fl" }) {
        description {
          description
        }
        image {
          resize(width: 1200) {
            src
          }
        }
      }
    }
  `)
  useEffect(() => {
    setTimeout(() => {
      navigate('/blog/page/6/')
    }, 4000)
  }, [])
  return (
    <>
      <SEO
        title="The COVID Tracking Project"
        socialCard={data.contentfulSocialCard}
      />
      <Header siteTitle="The COVID Tracking Project" noMargin />
      <h1>Test</h1>
    </>
  )
}
