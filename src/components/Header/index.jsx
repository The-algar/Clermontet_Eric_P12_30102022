import styled from 'styled-components'
import sportSeeIcon from '../../assets/SportSeeIcon.svg'
import { Burger } from './Burger'
import { Link } from 'react-router-dom';

const SportSeeHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
  min-width: 700px !important;
  background-color: #020203;
  color: white;
  filter: drop-shadow(0 4px 4px rgb(0, 0, 0, 25%));
`
const SportSeeLogo = styled.img`
  padding: 10px 28px 0 28px;
  cursor: pointer;
`
const Header = () => {
    return (
        <SportSeeHeader>
            <Link to="/">
                <SportSeeLogo src={sportSeeIcon} alt=""/>
            </Link>
            <Burger />
        </SportSeeHeader>
    )
}

export default Header;