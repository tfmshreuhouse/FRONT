import { useEffect, useRef, useState } from 'react';
import { data } from '../../assets/data';
import './Carousel.css';

const Imagenes = () => {

  const listRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const listNode = listRef.current;

    if (listNode) {
      const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

      if (imgNode) {
        imgNode.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [currentIndex, listRef]);


  const scrollToImage = (direction: string) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="imagenes-container">
      <div className="slider-container">
        <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="container-images">
          <ul ref={listRef}>
            {
              data.map((item) => {
                return <li key={item.id}>
                  <img src={item.imgUrl}/>
                </li>
              })
            }
          </ul>
        </div>
        <div className="dots-container">
          {
            data.map((_: any, idx: any) => (
              <div key={idx}
                className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(idx)}>
                &#9865;
              </div>))
          }
        </div>
      </div>
    </div>
  );
}

export default Imagenes;
