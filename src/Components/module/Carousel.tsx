import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Slider from "react-slick";

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 3,
  arrows: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const settingsSimilarImg = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 13,
  slidesToScroll: 3,
  arrows: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export const StyledSlider = styled(Slider)`
  .slick-slide div {
    margin: 0 2px;
    padding: 3px 0;
  }
`;
