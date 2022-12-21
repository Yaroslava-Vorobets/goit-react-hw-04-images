import PropTypes from 'prop-types';

import { Button } from './ButtonStyled';

export const LoadMore = ({ onClick }) => {
  return <Button onClick={onClick}>Load More</Button>;
};

Button.propTypes = {
  onclick: PropTypes.func,
};