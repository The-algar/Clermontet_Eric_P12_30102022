import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import colors from '../../utils/style/colors.js';

/**
 * Component for showing  User welcome introduction
 *
 * @component UserProfile
 * @param   {string}  userId  User Id
 * @param   {string}  cover   User Thumbnail (from P6)
 * @param   {boolean}  api    is Api available?
 * @param   {Object}  data    User data from Api
 * @return {JSX.Element}
 */

const UserCard = styled.div`
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  a:link {
    text-decoration: none;
  }
`
const UserName = styled.h2`
  color: ${colors.secondary};
  font-size: 2rem;
  letter-spacing: -1px;
  font-weight: normal;
`
// const UserDescription = styled.p`
//   font-size: 18px;
//   // color: ${colors.primary};
// `
const UserLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const UserImage = styled.img`
  object-fit: cover;
  border-radius: 10em;
  border: 10px solid ${colors.secondary};
  padding: 5px;
  width: 200px;
  height: 200px;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #2F2E41;
  }
`

function UserProfile({ userId, cover, data, api }) {
  return (
      <UserCard>
        <UserLink 
          href={api ? `/user/${userId}/${api}` : `/user/${userId}`}
        >
          <UserImage src={cover} />
          <UserName>
            {api
              ? data?.userInfos?.firstName.split('-Mocked') //.join('')
              : data?.userInfos?.firstName}
          </UserName>
        </UserLink>
        {/* <UserDescription>{data?.userInfos?.age} ans</UserDescription> */}
      </UserCard>
  );
}

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
};

export default UserProfile;
