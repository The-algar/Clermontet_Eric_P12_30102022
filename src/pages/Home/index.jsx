import React, { useEffect, useState } from 'react'
import styled from "styled-components"
// import { Loader } from '../../utils/style/Slinks'
import Loader from '../../components/Loader';
import HomeLogo from '../../assets/SportSeeLogo.svg'
import SideMenu from '../../components/SideMenu'
import { getAllDataMocked } from '../../service/mockedAPI/index.js'
import UserProfile from '../../components/UserProfile'
import ToggleSwitch from '../../components/ToggleSwitch'
import colors from '../../utils/style/colors.js'


const HomeWrapper = styled.section`
  display: flex;
`
const Accueil = styled.main`
  min-width: 700px;
  padding-top: 18px;
  padding-left: 57px;
`
const Title = styled.h2`
  margin: 1em 0em;
  min-width: 700px;
`
const WelcomeLogo = styled.img`
  display: inline-block;
  Justify-content: flex-end;
  align-item:center;
  align-content: center;
  height: 70px;
  padding-left: 1rem;
`
const Welcome = styled.h1`
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 3em;
  margin-bottom: 24px;
`
const Intro = styled.p`
  font-size: 1.1em;
  font-weight: 400;
  margin: 11px 0;
  padding-right: 30px;
`
const UserWrapper = styled.div`
  display: flex;
  flex-direction: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 20px;
  margin-left: -57px;
`
const initialState = {
  isLoading: true,
  error: null,
  data: null,
};

function Home () {
  const [state, setState] = useState(initialState);
  const { isLoading, data } = state;
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked, !checked);
  }

  useEffect(() => {
    async function getMockedData() {
      try {
        const userData = await getAllDataMocked();

        setState({
          ...state,
          data: userData,

          error: '',
          isLoading: false,
        });
      } catch (error) {
        setState({ ...state, error, isLoading: false });
      }
    }
    getMockedData();
  }, [state]);

  if (isLoading) {
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

    return (
        <>
            <HomeWrapper>
              <SideMenu />
              <Accueil>
                <Welcome>
                    Bienvenue sur <WelcomeLogo src={HomeLogo} />
                </Welcome>
                <Intro>
                    Projet 12 de la formation OpenClassrooms <em>"Développeur d'application JavaScript React"</em>, création d'un tableau de bord avec React et D3.js.<br />
                    <br />Après avoir sélectionné la source de données, cliquez sur l'icône d'un utilisateur pour afficher son dashboard :
                </Intro>
                <Title>Sélectionnez une source de donnée</Title>
                <ToggleSwitch 
                    id="toggleSwitch"
                    checked={checked}
                    onChange={handleChange}
                />
                <Title>Sélectionnez un utilisateur</Title>
                <UserWrapper>
                  {data?.userMainData?.map((user) => (
                    <UserProfile
                    key={user.userId}
                    userId={user.userId}
                    cover={`/images/${user.userInfos.firstName}.jpg`}
                    data={user}
                    api={checked}
                  />
                  ))}
                </UserWrapper>
              </Accueil>
            </HomeWrapper>
        </>
    )
};

export default Home;