import React from 'react';
import Slider from 'react-slick';



const MySlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src="/assets/img/slider1.jpg" alt="Slider 1" />
                </div>
                <div>
                    <img src="/assets/img/slider2.jpg" alt="Slider 2" />
                </div>
                <div>
                    <img src="/assets/img/slider3.jpg" alt="Slider 3" />
                </div>
            </Slider>
        </div>
    );
};

export default MySlider;