import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useNavigate, useParams } from 'react-router';
import { Api } from '../../service/API';
import Loader from '../../components/Loader';
import SideMenu from '../../components/SideMenu'
import { getAllDataMocked } from '../../service/mockedAPI'
import UserHeader from '../../components/UserHeader'
import colors from '../../utils/style/colors.js'
import Error from '../../components/Error'
import BarChart from '../../components/D3/Barchart';

const data = [
  {year: 1980, efficiency: 24.3, sales: 8949000},
  {year: 1985, efficiency: 27.6, sales: 10979000},
  {year: 1990, efficiency: 28, sales: 9303000},
  {year: 1991, efficiency: 28.4, sales: 8185000},
  {year: 1992, efficiency: 27.9, sales: 8213000},
  {year: 1993, efficiency: 28.4, sales: 8518000},
  {year: 1994, efficiency: 28.3, sales: 8991000},
  {year: 1995, efficiency: 28.6, sales: 8620000},
  {year: 1996, efficiency: 28.5, sales: 8479000},
  {year: 1997, efficiency: 28.7, sales: 8217000},
  {year: 1998, efficiency: 28.8, sales: 8085000},
  {year: 1999, efficiency: 28.3, sales: 8638000},
  {year: 2000, efficiency: 28.5, sales: 8778000},
  {year: 2001, efficiency: 28.8, sales: 8352000},
  {year: 2002, efficiency: 29, sales: 8042000},
  {year: 2003, efficiency: 29.5, sales: 7556000},
  {year: 2004, efficiency: 29.5, sales: 7483000},
  {year: 2005, efficiency: 30.3, sales: 7660000},
  {year: 2006, efficiency: 30.1, sales: 7762000},
  {year: 2007, efficiency: 31.2, sales: 7562000},
  {year: 2008, efficiency: 31.5, sales: 6769000},
  {year: 2009, efficiency: 32.9, sales: 5402000},
  {year: 2010, efficiency: 33.9, sales: 5636000},
  {year: 2011, efficiency: 33.1, sales: 6093000},
  {year: 2012, efficiency: 35.3, sales: 7245000},
  {year: 2013, efficiency: 36.4, sales: 7586000},
  {year: 2014, efficiency: 36.5, sales: 7708000},
  {year: 2015, efficiency: 37.2, sales: 7517000},
  {year: 2016, efficiency: 37.7, sales: 6873000},
  {year: 2017, efficiency: 39.4, sales: 6081000},
]

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
    grid-template-columns: repeat(1, 1fr);
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
const WeightChartWrapper = styled.div`
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
`;
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
  grid-template-rows: repeat(4, 1fr);
  background-color: aliceblue;
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
    min-height: 256px;
    margin-top: 1rem;
    gap: 5.7rem;
  }
`
const initialState = {
  isLoading: true,
  error: null,
  isDataLoaded: false,
  data: null,
};

const user_message =
  'Félicitations ! Vous avez explosé vos objectifs hier ! 👏';

function Dashboards () {
  const [state, setState] = useState(initialState);
  const { userId, api } = useParams();
  // console.log('UserParams : ', api, userId);

  const {
  userApi,
  // weightApi,	
  // radarApi,				
  // objectivesApi,				
  isApiLoading,
  errorApi,
  } = Api(userId);
  console.log('userApi :', userApi);
  // console.log('weightApi :', weightApi);
  // console.log('radarApi :', radarApi);
  // console.log('objectivesApii :', objectivesApi);
  console.log('isApiLoading  ', isApiLoading, errorApi);

  const navigate = useNavigate();
  if (!['12', '18'].includes(userId)) {
    navigate('/404');
  }

  const { isLoading, isDataLoaded, data: mockedData, error } = state;

  useEffect(() => {
    async function getMockedData() {
      try {
        const userData = await getAllDataMocked();

        setState({
          ...state,
          data: userData,
          isDataLoaded: true,
          error: '',
          isLoading: false,
        });
      } catch (error) {
        setState({ ...state, error, isLoading: false });
      }
    }
    getMockedData();
    setState({ ...state, isLoading: false });
    // console.log('state: ', state);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isApiLoading) {
  // if (isLoading) {
    return (
      <>
        <Loader
          type={'spinningBubbles'}
          color={colors.secondary}
          width={200}
          height={200}
        />
      </>
    );
  }
  if (errorApi || error) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  if (isDataLoaded) {
    return (
      <>
        <DashboardWrapper>
          <SideMenu />
          <MainContent>
            <UserHeader
              userId={userId}
              message={user_message}
              isLoading={isLoading}
              data={mockedData}
              api={api}
              userApi={userApi}
            />
            <ContentGrid>
              <ChartsGrid>
                <WeightChartWrapper>
                  {/* <DailyActivity
                    userId={userId}
                    data={mockedData}
                    dailyActivityApi={weightApi?.sessions}
                    api={api}
                  /> */}
                  <BarChart data={data} />
                </WeightChartWrapper>
                <ObjectivesChartWrapper
                  // userId={userId}
                  // data={mockedData}
                  // averageApi={averageApi}
                  // api={api}
                />
                <RadarChartWrapper
                  // userId={userId}
                  // data={mockedData}
                  // radarApi={radarApi}
                  // api={api}
                />
                <KpiChartWrapper
                  // userId={userId}
                  // data={mockedData}
                  // userApiScore={userApi.score}
                  // api={api}
                />
              </ChartsGrid>
              <NutritionFactsWrapper
                // userId={userId}
                // data={mockedData.userMainData}
                // nutritionFactData={userApi?.keyData}
                // api={api}
              />
            </ContentGrid>
          </MainContent>
        </DashboardWrapper>
      </>
    );
  }
}

export default Dashboards;