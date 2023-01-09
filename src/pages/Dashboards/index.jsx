import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import SideMenu from '../../components/SideMenu'
import caloriesIcon from '../../assets/calories-icon.svg'
import glucidesIcon from '../../assets/glucides-icon.svg'
import lipidesIcon from '../../assets/lipides-icon.svg'
import proteinsIcon from '../../assets/proteines-icon.svg'
import BarChart from '../../components/D3/Barchart'
import ObjectivesChart from '../../components/D3/Linechart'
import RadarChart from '../../components/D3/Radarchart'
import KpiChart from '../../components/D3/KpiChart'
import KeyData from '../../components/D3/KeyData'
import UserHeader from '../../components/UserHeader'
import { getData } from '../../service'
import colors from '../../utils/style/colors.js'
import Error from '../../components/Error'

/**
 * user Dashboard page. contain chart components with fetched or mocked data according to the selector used on the hoùe page
 * 
 * @name Dashboards
 * @returns {ReactElement} the D3 visualization of all user data in D3.js charts
 * @returns {JSX}
 * @component
*/

const DashboardWrapper = styled.main`
  display: grid;
  grid-template-columns: 7.5rem 1fr;
`
const MainContent = styled.section`
  // --gridheight: 880px;
  // --gridwidth: 768px;
  padding: 3rem 5rem;

  // @media (max-width: 1440px) {
  //   padding: 1.5rem 2rem;
  // }
  // @media (max-width: 768px) {
  //   padding: 1rem 2rem;
  // }
`
const ChartsGrid = styled.div`
  // background-color: deepskyblue;
  // height: var(--gridheight);
  display: grid;
  grid-column: 1 / 4;
  grid-column-end: 4;
  grid-row: 1 / 3;
  grid-row-end: 4;
  grid-gap: 2rem;
    // @media (max-width: 968px) {
    //   grid-template-columns: repeat(3, 1fr);
    //   grid-template-rows: repeat(6, 1fr);
    // }
`
const ActivityChartWrapper = styled.div`
  // background-color: grey;
  grid-column: 1 / 4;
  grid-row: 1 / 2;  
  display: grid;
    @media (max-width: 968px) {
      grid-column: 1 / 4;
      grid-row: 1 / 2;  
      justify-items: stretch;
    }
`
const ThreeChartsWrapper = styled.div`
  // background-color: grey;
  height: 258px;
  grid-column: 1 / 3;
  grid-column-end: 4;
  grid-row: 2 / 3;  
  display: grid;
  justify-content: stretch;
    @media (max-width: 968px) {
      height: 774px;
      grid-column: 1 / 3;
      grid-row: 2 / 5;  
      grid-column-end: 4;
      margin: 0;
      padding: 0;
    }
`
const ObjectivesChartTile = styled.div`
  //background-color: gray;
  grid-column: 1;
  grid-row: 1;  
  margin-right: 1rem;
    @media (max-width: 968px) {
      grid-column: 1;
      margin-right: 0;
      margin-bottom: 1rem;
    }
`
const RadarChartTile = styled.div`
  //background-color: purple;
  grid-column: 2;
  grid-row: 1;  
  margin-right: 1rem;
    @media (max-width: 968px) {
      grid-column: 1;
      grid-row: 2;
      margin-right: 0;
      margin-bottom: 1rem;
    }
`
const KpiChartTile = styled.div`
  //background-color: orange;
  grid-column: 3 / 3;
  grid-row: 1;  
  margin: 0;
  // margin-right: 1rem;
    @media (max-width: 968px) {
      grid-column: 1;
      grid-row: 3;
    }
`
const NutritionFactsWrapper = styled.aside`
  // background-color: lightgrey;
  grid-column: 4 ;
  grid-row: 1 / 5;  
  display: grid;
  align-self: start;
  gap: 2.5rem;
    @media (max-width: 968px) {
      grid-column: 1 / 3;
      grid-column-end: 4;
      grid-row: 5 / 7; 
      display: grid;
      justify-content: space-between;
      justify-items: stretch;
      align-items: center;
      margin-top: 0;
      padding: 0;
      // width: var(--gridwidth);
    }
`
const KeyData1 = styled.div`
  // background-color: orange;
  grid-column: 1;
  grid-row: 1;  
  margin: 0;
  padding: 0;
    @media (max-width: 968px) {
      grid-column: 1;
      grid-column-end: 3;
      margin: 0;
      padding: 0;
    }
`
const KeyData2 = styled.div`
  grid-column: 1;
  grid-row: 2;  
  margin: 0;
  padding: 0;
  // background-color: aliceblue;
    @media (max-width: 968px) {
      grid-row: 1; 
      grid-column: 2;
      grid-column-end: 3;
      justify-self: end;
    }
`
const KeyData3 = styled.div`
  // background-color: red;
  grid-column: 1;
  grid-row: 3; 
  margin: 0;
  padding: 0;
  // padding-left: 1rem;
    @media (max-width: 968px) {
      grid-column: 1;
      grid-column-end: 3;
      grid-row: 2;
      justify-self: start;
    }
`
const KeyData4 = styled.div`
  // background-color: green;
  grid-column: 1;
  grid-row: 4;  
  margin: 0;
  padding: 0;
  // padding-left: 1rem;
    @media (max-width: 968px) {
      grid-column: 2;
      grid-column-end: 3;
      grid-row: 2;
      justify-self: end;
    }
`
const initialState = {
  isLoading: true,
  error: null,
  isMockDataLoaded: false,
  data: null,
}

const user_message = 'Félicitations ! Vous avez explosé vos objectifs hier ! 👏'

function Dashboards() {
  const [state, setState] = useState(initialState)
  const { userId, api } = useParams()

  const { isLoading, isMockDataLoaded, data, error } = state

  useEffect(() => {
    async function getMockedData() {
      try {
        // console.log('Api data loaded = ', userId, api)

        const data = await getData(+userId, api)

        // console.log('get data', data)

        setState({
          ...state,
          data,
          isMockDataLoaded: true,
          error: '',
          isLoading
: false,
        })
      } catch (error) {
        setState({ ...state, error, isLoading
: false })
      }
    }
    getMockedData()

    setState({ ...state, isLoading
: false })

    // console.log('state: ', state)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading
) {
    return (
      <>
        <Loader
          type={'spinningBubbles'}
          color={colors.secondary}
          width={200}
          height={200}
        />
      </>
    )
  }
  if (error) {
    return (
      <div>
        <Error />
      </div>
    )
  }
  if (isMockDataLoaded) {

    // console.log('not err', data) 

    return (
      <>
        <DashboardWrapper>
          <SideMenu />
          <MainContent>
            <UserHeader userId={userId} message={user_message} isLoading={isLoading} data={data} api={api} />
              <ChartsGrid>
                <ActivityChartWrapper>
                  <BarChart userId={userId} data={data} api={api} />
                </ActivityChartWrapper>
                <ThreeChartsWrapper>
                  <ObjectivesChartTile>
                    <ObjectivesChart userId={userId} data={data} api={api} />
                  </ObjectivesChartTile>
                  <RadarChartTile>
                    <RadarChart userId={userId} data={data} api={api} />
                    {/* <ObjectivesChart userId={userId} data={data} api={api} /> */}
                  </RadarChartTile>
                  <KpiChartTile> 
                    <KpiChart userId={userId} data={data} api={api} />
                    {/* <ObjectivesChart userId={userId} data={data} api={api} /> */}
                  </KpiChartTile>
                </ThreeChartsWrapper>
                <NutritionFactsWrapper>
                  <KeyData1>
                    <KeyData
                      isLoading={isLoading}
                      data={data}
                      api={api}
                      icon={caloriesIcon}
                      info={`${data?.user.keyData.calorieCount}kCal`}
                      text="Calories"
                    />
                  </KeyData1>
                  <KeyData2>
                    <KeyData
                      isLoading={isLoading}
                      data={data}
                      api={api}
                      icon={proteinsIcon}
                      info={`${data?.user.keyData.proteinCount}g`}
                      text="Proteines"
                    />
                  </KeyData2>
                  <KeyData3>
                    <KeyData
                      isLoading={isLoading}
                      data={data}
                      api={api}
                      icon={glucidesIcon}
                      info={`${data?.user.keyData.carbohydrateCount}g`}
                      text="Glucides"
                    />
                  </KeyData3>
                  <KeyData4>
                    <KeyData
                      isLoading={isLoading}
                      data={data}
                      api={api}
                      icon={lipidesIcon}
                      info={`${data?.user.keyData.lipidCount}g`}
                      text="Lipides"
                    />
                  </KeyData4>
                </NutritionFactsWrapper>
              </ChartsGrid>
          </MainContent>
        </DashboardWrapper>
      </>
    )
  }
}

export default Dashboards
