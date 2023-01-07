import React from 'react'
import styled from 'styled-components'
import { StyledNav } from '../../utils/style/Slinks'

const Navbar = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;
  list-style: none;
  flex-grow: 1;
  // font-size: 1.4em;
  // margin: 3.5%;
  // padding-left: 0;
  padding-right: 50px;

  // li {
  //   padding: 18px 10px;
  // }

  @media (max-width: 768px) {
    // justify-content: flex-end;
    // align-items: flex-start;
    flex-flow: column nowrap;
    background-color: #020203;
    position: fixed;
    transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ open }) => open ? 1 : 0};
    top: 0;
    right: 0;
    height: max-content;
    width: 681.8px;
    margin: 0;
    padding-top: 1.5rem;
    padding-bottom: 10px;
    transition: opacity 0.25s linear;
    }
`

export const RightNav = ({ open }) => {
  return (
    <Navbar open={ open } >
        <StyledNav to="/">Accueil</StyledNav>
        <StyledNav to="#">Profil</StyledNav>
        <StyledNav to="#">Réglage</StyledNav>
        <StyledNav to="#">Communauté</StyledNav>
    </Navbar>
  )
}
