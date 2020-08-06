import React, { useState } from 'react'

import Layout from '~components/layout'

import styles from './pooled-testing.module.scss'

// these next two can only be loaded clientside
import { Scrollama, Step } from '~utilities/react-scrollama'

const copy = [
  'In this example, we’ll test 25 people.',
  'In the pooled testing method, people are divided into groups.',
  'Instead of being tested individually, their samples are combined and tested all at once.',
  'Each group gets a result. If a group tests negative, everyone in that group is negative.',
  'If a group tests positive, all samples are tested individually. The lab keeps leftover samples so there is no need for the individuals to go back to testing sites.',
  'Pooled testing significantly cuts down supplies and testing wait times. In this example, 25 people were tested, but only 10 tests were used. ',
  'If everyone had been tested individually, 25 tests would have been needed.',
]

export default ({ images }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = props => setCurrentStepIndex(props.data)

  return (
    <Layout
      title="Pooled Testing"
      socialCard={{
        description: 'Our most up-to-date data on COVID-19 in the US.',
      }}
      path="/data"
    >
      <div>
        <div className={styles.stickyImage}>
          {currentStepIndex !== null && (
            <img src={images[currentStepIndex]} alt="test" />
          )}
        </div>
        <div>
          <Scrollama onStepEnter={onStepEnter} offset={0.55}>
            {images.map((data, index) => (
              <Step data={index} key={JSON.stringify(data)}>
                <div className={styles.stepInner}>
                  <span className={styles.text}>{copy[index]}</span>
                </div>
              </Step>
            ))}
          </Scrollama>
          <div className={styles.stepInner} />
        </div>
      </div>
    </Layout>
  )
}
