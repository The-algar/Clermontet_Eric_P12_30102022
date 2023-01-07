import styled from "styled-components"
import barbell from '../../assets/barbell.svg';
import bike from '../../assets/bike.svg';
import swim from '../../assets/swim.svg';
import yoga from '../../assets/yoga.svg';

const SideMenuLeft = styled.aside`
    position: relative;
    min-width: 117px;
    height: 1024px;
    background-color: black;
    -webkit-filter: drop-shadow(4px 0 4px rgb(0, 0, 0, 25%));
            filter: drop-shadow(4px 0 4px rgb(0, 0, 0, 25%));
`
const NavMenuLeft = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 256px;
    padding-bottom: 361px;
`
const IconMenuLeft = styled.img`
    padding-bottom: 20px;
`
const CopyrightLeft = styled.div`
    transform: rotate(-90deg);

    white-space: nowrap;
    background-color: #020203;

    position: absolute;
    top: 736px;
    right: -10px;

    font-size: 0.8em;
    color: white;
`
const SideMenu = () => {
    return (
        <SideMenuLeft>
            <NavMenuLeft>
                <IconMenuLeft src={yoga} alt="" />
                <IconMenuLeft src={swim} alt="" />
                <IconMenuLeft src={bike} alt="" />
                <IconMenuLeft src={barbell} alt="" />
            </NavMenuLeft>
            <CopyrightLeft>Copyright SportSee 2020</CopyrightLeft>
        </SideMenuLeft>
    )
};

export default SideMenu;
