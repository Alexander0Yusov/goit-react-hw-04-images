import { useState } from 'react';
import ImageItem from 'components/ImageItem/ImageItem';
import css from './ImageGallery.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const ImageGallery = ({ hits }) => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [debugSource, setDebugSource] = useState([
  //   {
  //     id: '1',
  //     webformatURL: 'https://i.ibb.co/MSKpsNk/1466665.jpg',
  //     largeImageURL: 'https://i.ibb.co/MSKpsNk/1466665.jpg',
  //   },
  //   {
  //     id: '2',
  //     webformatURL: 'https://i.ibb.co/MSKpsNk/1466665.jpg',
  //     largeImageURL: 'https://i.ibb.co/MSKpsNk/1466665.jpg',
  //   },
  // ]);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const selectPicture = link => {
    setSelectedPicture(link);
    toggleModal();
  };

  return (
    <>
      <ul className={css.gallery}>
        {hits.map(({ id, webformatURL, largeImageURL }) => (
          <li key={id}>
            <ImageItem
              demoImg={webformatURL}
              largeImg={largeImageURL}
              clickHandler={selectPicture}
            />
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectedPicture} alt={'pic preview'} />
        </Modal>
      )}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
};
