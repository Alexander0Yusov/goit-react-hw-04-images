import { useEffect, useRef, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import { ApiService } from 'scripts';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

const statusCode = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  ERROR: 'error',
  DONE: 'done',
};

const App = () => {
  const [queryInput, setQueryInput] = useState('');
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(null);
  const [status, setStatus] = useState(statusCode.IDLE);

  const Api = useRef(null);

  useEffect(() => {
    if (queryInput === '') {
      return;
    }
    getInfo();
  }, [queryInput]);

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.input.value.trim()) {
      setQueryInput(e.target.input.value);
      return;
    }
    alert('Please, enter valid request');
  };

  const getInfo = () => {
    Api.current = new ApiService(queryInput);
    setStatus(statusCode.PENDING);

    Api.current
      .request()
      .then(({ hits, total }) => {
        hits = hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }));

        Api.current.calculatePages(total);
        setHits(hits);
        setTotal(total);
        setStatus(statusCode.RESOLVED);
      })
      .catch(er => {
        setStatus(statusCode.ERROR);
        console.log(er.message);
      })
      .finally(() => setStatus(statusCode.DONE));
  };

  const getMoreInfo = () => {
    setStatus(statusCode.PENDING);

    Api.current.nextPage();
    Api.current
      .request()
      .then(({ hits }) => {
        hits = hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }));

        setHits(prev => [...prev, ...hits]);
        setStatus(statusCode.RESOLVED);
      })
      .catch(er => {
        setStatus(statusCode.ERROR);
        console.log(er.message);
      })
      .finally(() => setStatus(statusCode.DONE));
  };

  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery hits={hits} />

      {Boolean(
        status === statusCode.DONE && total && !Api.current.isLastPage()
      ) && <Button onLoad={getMoreInfo} />}

      {status === statusCode.PENDING && (
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      )}

      {status === statusCode.DONE && !total && <p>Not found</p>}
    </div>
  );
};

export default App;

// опционален вариант: render(if-return/ if-return ...) 19-22 второе видео
