import { useState, useEffect } from 'react'
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { getUserData } from '../../service/getUserData.js'
// import './Home.css'
import HomeLogo from '../../assets/SportSeeLogo.svg'
import SideMenu from '../../components/SideMenu'
import ToggleSwitch from '../../components/ToggleSwitch'

const HomeWrapper = styled.section`
  display: flex;
  min-width: 700px;
`

const Accueil = styled.main`
    flex-grow: 1;
    padding-top: 18px;
    padding-left: 57px;
`
const Title = styled.h2`
  margin: 1em 0em;
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
const UserLink = styled.p`
	margin-top: ${({marginTop}) => marginTop};
`
const Home = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setUserData(getUserData());
    }, []);
    console.log(userData);

    return (
        <>
            <HomeWrapper>
                <SideMenu />
                <Accueil>
                    <Welcome>
                        Bienvenue sur <WelcomeLogo src={HomeLogo} />
                    </Welcome>
                    <Intro>
                        Projet 12 de la formation OpenClassrooms <em>"Développeur d'application - JavaScript React"</em>, création d'un tableau de bord avec React et D3.js.<br />
                        <br />Cliquez sur l'identifiant d'un utilisateur pour voir ses données :
                    </Intro>
                    <Title>Sélectionnez une source de donnée</Title>
                    <ToggleSwitch />
                    <Title>Sélectionnez un utilisateur</Title>
                    <UserLink marginTop="1rem">
			            <NavLink to="/user/12">User 12</NavLink>
		            </UserLink>
                    <div>&nbsp;</div>
                    <UserLink marginTop="1rem">
                        <NavLink to="/user/18">User 18</NavLink>
                    </UserLink>
                </Accueil>
                {/* <div></div> */}
            </HomeWrapper>
        </>
    )
};

export default Home;