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
import KeyData from '../../components/D3/KeyData'
import UserHeader from '../../components/UserHeader'
import { getData } from '../../service'
import colors from '../../utils/style/colors.js'
import Error from '../../components/Error'

const DashboardWrapper = styled.main`
  display: grid;
  grid-template-columns: 7.5rem 1fr;
`
const MainContent = styled.section`
  padding: 3rem 5rem;

  @media (max-width: 1440px) {
    padding: 1.5rem 2rem;
  }
  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  @media (max-width: 1240px) {
    gap: 1rem;
  }
  @media (max-width: 968px) {
    grid-template-row: repeat(3, 1fr);
  }
`
const ChartsGrid = styled.div`
  display: grid;
  grid-column: 1/4;
  grid-template: 20rem 16rem / repeat(3, 1fr);
  gap: 2rem;

  // @media (max-width: 1440px) {
  //   grid-template: 18rem 14rem / repeat(3, 1fr);
  //   gap: 1rem;
  // }
  // @media (max-width: 968px) {
  //   grid-template: 16rem 11rem / repeat(3, 1fr);
  //   gap: 0.75rem;
  // }

  > * {
    border-radius: 0.25rem;
    overflow: hidden;
  }
`
const ActivityChartWrapper = styled.div`
  grid-column: 1/4;
  background-color: aliceblue;
  align-items: strecht;
  justify-content: center;
  width: 100%;
  height: max-content;
`
const ObjectivesChartWrapper = styled.div`
  grid-column: 1/2;
  background-color: aliceblue;
`
const RadarChartWrapper = styled.div`
  grid-column: 2/3;
  background-color: aliceblue;
`
const KpiChartWrapper = styled.div`
  height: 100%;
  grid-column: 3/4;
  background-color: aliceblue;
`
const NutritionFactsWrapper = styled.div`
  display: grid;
  grid-column: 4/4;
  grid-template-column: repeat(1, 1fr);
  background-color: transparent; // aliceblue
  gap: 2rem;
  > * {
    border-radius: 0.25rem;
    overflow: hidden;
  }
  @media (max-width: 1440px) {
    gap: 1.25rem;
  }
  @media (max-width: 968px) {
    grid-column: 1/4;
    grid-row: 3/4;
    display: flex;
    justify-content: flex-start;
    flex-direction: row, wrap !important;
    min-height: 256px;
    margin-top: 1rem;
    gap: 5.7rem;
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
        console.log('user and isApi data loaded ? = ', userId, api)
        const data = await getData(+userId, api)
        console.log('get data', data)

        setState({
          ...state,
          data,
          isMockDataLoaded: true,
          error: '',
          isLoading: false,
        })
      } catch (error) {
        setState({ ...state, error, isLoading: false })
      }
    }
    getMockedData()

    setState({ ...state, isLoading: false })
    console.log('state: ', state)
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
    );
  }
  if (isMockDataLoaded) {
    console.log('not err', data)
    return (
      <>
        <DashboardWrapper>
          <SideMenu />
          <MainContent>
            <UserHeader
              userId={userId}
              message={user_message}
              isLoading={isLoading}
              data={data}
              api={api}
            />
            <ContentGrid>
              <ChartsGrid>
                <ActivityChartWrapper>
                  <BarChart userId={userId} data={data} api={api} />
                  {/* <BarChart data={data} /> */}
                </ActivityChartWrapper>
                <ObjectivesChartWrapper userId={userId} data={data} api={api} />
                <RadarChartWrapper userId={userId} data={data} api={api} />
                <KpiChartWrapper userId={userId} data={data} api={api} />
              </ChartsGrid>
              <NutritionFactsWrapper>
                <aside>
                  <KeyData
                    isLoading={isLoading}
                    data={data}
                    api={api}
                    icon={caloriesIcon}
                    // keyDataApi={activityApi?.keyData}
                    info={`${data?.user?.keyData.calorieCount}kCal`} //data.data.user.keyData.
                    text="Calories"
                  />
                  <KeyData
                    isLoading={isLoading}
                    data={data}
                    api={api}
                    icon={proteinsIcon}
                    info={`${data?.user?.keyData.proteinCount}g`}
                    text="Proteines"
                  />
                  <KeyData
                    isLoading={isLoading}
                    data={data}
                    api={api}
                    icon={glucidesIcon}
                    info={`${data?.user?.keyData.carbohydrateCount}g`}
                    text="Glucides"
                  />
                  <KeyData
                    isLoading={isLoading}
                    data={data}
                    api={api}
                    icon={lipidesIcon}
                    info={`${data?.user?.keyData.lipidCount}g`}
                    text="Lipides"
                  />
                </aside>
              </NutritionFactsWrapper>
            </ContentGrid>
          </MainContent>
        </DashboardWrapper>
      </>
    )
  }
}

export default Dashboards
