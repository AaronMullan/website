/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react'
import { graphql } from 'gatsby'
import ReCaptcha from 'react-recaptcha'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import { Form, FormInput } from '~components/common/form'
import { AlertInfobox } from '~components/common/infobox'

const reasons = [
  '-- Select a reason --',
  'I have questions about the state data grades',
  'I have feedback on the COVID Racial Data Tracker',
  'I’m a journalist with a media question',
  'I want to report an issue with the website or web accessibility',
  'I want to report an issue with your data',
  'Something else!',
]

const defaultReason = '-- Select a reason --'

export default ({ data }) => {
  const [name, setName] = useState('')
  const [reason, setReason] = useState(defaultReason)

  return (
    <Layout
      title="Contact"
      socialCard={{
        description:
          'The COVID Tracking Project runs on the effort and diligence of hundreds of volunteers, and we welcome your contribution.',
      }}
      narrow
      textHeavy
    >
      <ContentfulContent
        content={
          data.contentfulSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.contentfulSnippet.contentful_id}
      />
      <Form
        method="POST"
        name="fa-form-1"
        action="https://webhook.frontapp.com/forms/c3c09a5603c02d2b7f86/KU--_qKvaSkUZHR2T92KQZ8hy5TatxTkRexeSE4NtpFltSVYROQxxbkIdSNH3RcHlZUI4RGGlHL7NwDr00Ki8WMFSOoBBMmgZ28PppSbXx-SQVi51ogAj28bbn6M"
        encType="multipart/form-data"
        acceptCharset="utf-8"
        referrerpolicy="unsafe-url"
      >
        <FormInput
          htmlFor="contact-reason"
          isRequired
          label="What are you contacting us about?"
          inputtype="select"
          id="contact-reason"
          name="reason"
          aria-required
          optionsArray={reasons}
          onChange={event => setReason(event.target.value)}
          value={reason}
        />
        <FormInput
          htmlFor="contact-name"
          isRequired
          label="Your name"
          inputtype="input"
          type="text"
          name="name"
          id="contact-name"
          aria-required
          onChange={event => setName(event.target.value)}
          value={name}
        />
        <FormInput
          htmlFor="contact-email"
          isRequired
          inputtype="input"
          label="Your email adress"
          type="email"
          name="email"
          aria-required
          id="contact-email"
        />
        <FormInput
          inputtype="text"
          htmlFor="contact-message"
          label="Message"
          name="body"
          aria-required
          id="contact-message"
        />
        {typeof window !== 'undefined' && (
          <ReCaptcha
            sitekey={data.site.siteMetadata.recaptchaKey}
            elementID="contact-form-captcha"
          />
        )}

        {reason === defaultReason && (
          <AlertInfobox>
            Please let us know{' '}
            <a href="#contact-reason">why you are contacting us</a> so we can
            route your message to the right team.
          </AlertInfobox>
        )}
        <br />
        <button
          type="submit"
          disabled={reason === defaultReason}
          aria-disabled={reason === defaultReason}
        >
          Contact us
        </button>
      </Form>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        recaptchaKey
      }
    }
    contentfulSnippet(slug: { eq: "contact-page-form" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
