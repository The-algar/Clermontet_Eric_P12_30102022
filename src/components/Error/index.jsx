import styled from 'styled-components'
import { ErrorLink } from '../../utils/style/Slinks'
import colors from '../../utils/style/colors'

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.backgroundLight};
  min-width: 395px;
  align-items: center;
  padding: 0!important;
  margin: 0 10px 0;
  @media screen and (min-width: 991px) {
    max-width: 1240px;
    margin: 0 100px 0;
  }
`
const Big404 = styled.h1`
  font-weight: 700;
  font-size: 288px;
  color: ${colors.secondary};
  margin:0!important;
  padding-top: 169px !important;
    @media screen and (max-width: 768px) {
        font-size: 96px;
        padding-top: 195px;
    }
`
const ErrorMessage = styled.h2`
  font-weight: 500;
  font-size: 36px;
  color: ${colors.secondary};
  padding-top: 66px;
  margin:0!important;
    @media screen and (max-width: 768px) {
        font-size: 18px;
        padding-top: 11px;
    }
`

function Error() {
  return (
    <ErrorWrapper>
      <Big404>404</Big404>
      <ErrorMessage>
        Oups... Il semblerait que la page que vous cherchez n’existe pas
      </ErrorMessage>
      <ErrorLink to="/" $isErrorLink>
          Retourner sur la page d'accueil 
      </ErrorLink>
        
    </ErrorWrapper>
  )
}

export default Error