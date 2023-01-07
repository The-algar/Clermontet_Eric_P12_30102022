import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useParams } from 'react-router';
import { Api } from '../../service/API';
import Loader from '../../components/Loader';
import SideMenu from '../../components/SideMenu'
import { getAllDataMocked } from '../../service/mockedAPI'
import UserHeader from '../../components/UserHeader'
import colors from '../../utils/style/colors.js'
// import Error from '../../components/Error'

const DashboardWrapper = styled.main`
  display: grid;
  grid-template-columns: 7.5rem 1fr;
`
const MainContent = styled.section`
  padding: 3rem 5rem;

  @media (max-width: 1340px) {
    padding: 1.5rem 2rem;
  }
`
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1340px) {
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

  @media (max-width: 1340px) {
    grid-template: 18rem 14rem / repeat(3, 1fr);
    gap: 1rem;
  }
  @media (max-width: 968px) {
    grid-template: 16rem 11rem / repeat(3, 1fr);
    gap: 0.75rem;
  }

  > * {
    border-radius: 0.25rem;
    overflow: hidden;
  }
`
const WeightChartWrapper = styled.div`
  grid-column: 1/4;
  background-color: ${colors.backgroundLight};
`
const ObjectivesChartWrapper = styled.div`
  grid-column: 2/4;
  background: ${colors.backgroundLight};
`;
const RadarChartWrapper = styled.div`
  grid-column: 3/4;
  background: ${colors.backgroundLight};
`
const KpiChartWrapper = styled.div`
  grid-column: 4/4;
  background: ${colors.backgroundLight};
`
const NutritionFactsWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 2rem;
  > * {
    border-radius: 0.25rem;
    overflow: hidden;
  }
  @media (max-width: 1340px) {
    gap: 1.25rem;
  }
  @media (max-width: 968px) {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    justify-content: center;
  }
  @media (max-width: 788px) {
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
  isApiLoading,
  errorApi,
  } = Api(userId);
  // console.log('userApi :', userApi);
  // console.log('isApiLoading  ', isApiLoading, errorApi);

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
        <DashboardWrapper>
          <SideMenu />
          <MainContent>
            <UserHeader
              userId={userId}
              message={
                api ? errorApi : ' :-( who the fuck are you? '
              }
              isLoading={isLoading}
              data={mockedData}
            />
          </MainContent>
        </DashboardWrapper>
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
                <WeightChartWrapper />
                <ObjectivesChartWrapper/>
                <RadarChartWrapper/>
                <KpiChartWrapper/>
              </ChartsGrid>
              <NutritionFactsWrapper/>
            </ContentGrid>
          </MainContent>
        </DashboardWrapper>
      </>
    );
  }
}

export default Dashboards;