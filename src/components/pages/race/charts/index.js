import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import Feature from '~components/common/landing-page/feature'
import LandingPageContainer from '~components/common/landing-page/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import chartsStyle from './charts.module.scss'

import CountyTable from './county-table'
import CountyChart from './county-chart'
import CountyChartLegend from './county-chart-legend'

const numberToWord = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

const numberWords = number =>
  typeof numberToWord[number] === 'undefined' ? number : numberToWord[number]

export default () => {
  const [isCasesOpen, setIsCasesOpen] = useState(false)
  const [isDeathsOpen, setIsDeathsOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      allCounties(filter: { demographics: { total: { gt: 0 } } }) {
        nodes {
          id
          name
          state
          current {
            cases
            deaths
          }
          demographics {
            total
            largestRace1
            largestRace2
          }
        }
      }
    }
  `)

  const tableSource = data.allCounties.nodes.map(county => {
    return {
      ...county,
      casesPer100k: (county.current.cases / county.demographics.total) * 100000,
      deathsPer100k:
        (county.current.deaths / county.demographics.total) * 100000,
    }
  })

  const countiesByCases = tableSource
    .sort((a, b) => (a.casesPer100k > b.casesPer100k ? -1 : 1))
    .slice(0, 20)

  const countiesByDeaths = tableSource
    .sort((a, b) => (a.deathsPer100k > b.deathsPer100k ? -1 : 1))
    .slice(0, 20)

  let totalHighestRepresented = 0
  let topRepresented = 0
  let endTopItems = false
  countiesByDeaths.forEach(county => {
    if (
      county.demographics.largestRace1 === 'Black or African American alone'
    ) {
      totalHighestRepresented += 1
      if (endTopItems) {
        topRepresented += 1
      }
    } else {
      endTopItems = true
    }
  })
  return (
    <>
      <LandingPageContainer>
        <Disclosure
          open={isCasesOpen}
          onChange={() => setIsCasesOpen(!isCasesOpen)}
        >
          <Feature
            element={
              <>
                <CountyChart data={[...countiesByCases]} field="casesPer100k" />
                <CountyChartLegend data={countiesByCases} />
              </>
            }
            title="Counties with the 20 highest infection rates"
          >
            This chart shows the 20 counties with the highest level of
            infections per capita, and the largest racial or ethnic group in
            that county. White people represent the largest racial group in most
            of these counties. This is in line with Census statistics, which
            show that more than 60 percent of Americans are White, non-Hispanic
            or Latino.
            <DisclosureButton className={chartsStyle.showChartData}>
              {isCasesOpen ? (
                <>
                  Hide chart data <span aria-hidden>↑</span>
                </>
              ) : (
                <>
                  Show chart data <span aria-hidden>↓</span>
                </>
              )}
            </DisclosureButton>
          </Feature>
          <DisclosurePanel>
            <CountyTable
              defaultSort="casesPer100k"
              tableSource={[...countiesByCases]}
              getRank={county =>
                countiesByCases.findIndex(item => item.id === county.id) + 1
              }
            />
            <CtaLink to="/race/data/covid-county-by-race.csv">
              Download the CSV
            </CtaLink>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure
          open={isDeathsOpen}
          onChange={() => setIsDeathsOpen(!isDeathsOpen)}
        >
          <Feature
            element={
              <>
                <CountyChart
                  data={[...countiesByDeaths]}
                  field="deathsPer100k"
                />
                <CountyChartLegend data={countiesByDeaths} />
              </>
            }
            title="Counties with the 20 highest death rates"
            flip
          >
            When we look at the 20 counties with the highest level of deaths per
            capita, we see a different story. In{' '}
            {numberWords(totalHighestRepresented)} of these 20 counties, Black
            people represent the largest racial group. The top{' '}
            {numberWords(topRepresented)} counties with the highest death rates
            in the nation are all predominantly Black.
            <DisclosureButton className={chartsStyle.showChartData}>
              {isDeathsOpen ? (
                <>
                  Hide chart data <span aria-hidden>↑</span>
                </>
              ) : (
                <>
                  Show chart data <span aria-hidden>↓</span>
                </>
              )}
            </DisclosureButton>
          </Feature>
          <DisclosurePanel>
            <CountyTable
              defaultSort="deathsPer100k"
              tableSource={[...countiesByDeaths]}
              getRank={county =>
                countiesByDeaths.findIndex(item => item.id === county.id) + 1
              }
            />
            <CtaLink to="/race/data/covid-county-by-race.csv">
              Download the CSV
            </CtaLink>
          </DisclosurePanel>
        </Disclosure>
      </LandingPageContainer>
    </>
  )
}