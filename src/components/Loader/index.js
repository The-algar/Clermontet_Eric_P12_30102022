import React from 'react';
import ReactLoading from 'react-loading';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

/**
 * Component displaying a Loader
 *
 * @param   {string}  type   type of  loader
 * @param   {string}  color  loader color
 * @param   {string}  width   Dimensions
 * @param   {string}  height  Dimensions
 *
 * @return {JSX.Element}
 */

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function Loader({ type, color, width, height }) {
  return (
    <LoaderWrapper>
      <ReactLoading type={type} color={color} width={width} height={height} />
    </LoaderWrapper>
  );
}

Loader.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.any || 200,
  height: PropTypes.any || 200,
};

export default Loader;