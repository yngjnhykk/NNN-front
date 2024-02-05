import React, { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';
import { Overlay, Global, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  console.log(images);
  return (
    <Overlay>
      <Global></Global>
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick initialState={0} afterChange={(slide) => setCurrentSlide(slide)} infinite arrows={false} slidesToShow={1} slidesToScroll={1}>
            {images.map((item) => (
              <ImgWrapper key={item.src}>
                <img src={item.src.src} alt={item.src}></img>
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {''} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;



