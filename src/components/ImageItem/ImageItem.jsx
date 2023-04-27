import { ThumbDiv, Img } from './ImageItem.styled';
import PropTypes from 'prop-types';

const ImageItem = ({ demoImg, largeImg, clickHandler }) => {
  return (
    <ThumbDiv
      bgImage={'http... - опциональна передача ссылки например пропсом в стили'}
    >
      <Img
        onClick={() => clickHandler(largeImg)}
        src={demoImg}
        alt="description-info"
      />
    </ThumbDiv>
  );
};

export default ImageItem;

ImageItem.propTypes = {
  demoImg: PropTypes.string,
  largeImg: PropTypes.string,
  clickHandler: PropTypes.func,
};
