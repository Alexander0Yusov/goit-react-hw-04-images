import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onLoad }) => {
  return (
    <button onClick={() => onLoad()} className={css.Button} type="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoad: PropTypes.func,
};
