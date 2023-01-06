import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../../dataExport/User.js';
import styled from 'styled-components';
import colors from '../../utils/style/colors.js'

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 500;

  @media (max-width: 1340px) {
    font-size: 2.5rem;
  }
  @media (max-width: 968px) {
    font-size: 1.5rem;
  }
`
const FirstName = styled.span`
  color: ${colors.secondary};
`
const Message = styled.p`
  margin: 2rem 0 4rem 0;
  font-size: 1.1rem;
  @media (max-width: 1340px) {
    margin: 0.5rem 0 2rem 0;
    font-size: 1.05rem;
  }
`

/**
 * Component for showing  User Message
 *
 * @component UserHeader
 * @param   {string}  userId  User Id
 * @param   {string}  message    message
 * @param   {boolean}  isLoading

 * @param   {boolean}  api   is Api available?
*  @param   {boolean}  data   User data from Api and MockedData
 * @return {JSX.Element}
 */
function UserHeader({userId, message, isLoading
, data})  { // j'ai oté api = false devenu inutile
  const firstName = new User(userId, data)._firstName || 'Unknown User';

  return (
    <>
      <Title>
        Bonjour{' '}
        <FirstName>
          {/* {!isLoading && api ? userApi?.userInfos?.firstName : firstName} */}
          {/* {!isLoading && api ? data?.userInfos?.firstName : firstName} */}
          {!isLoading && firstName}
        </FirstName>
      </Title>
      <Message>
        <span>{!isLoading || firstName === 'Unknown User' ? message : 'User Unknown, Please register'}</span>
      </Message>
    </>
  );
}

UserHeader.propTypes = {
  userId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isLoading
: PropTypes.bool.isRequired,
  data: PropTypes.object,
  api: PropTypes.string,
};

export default UserHeader;