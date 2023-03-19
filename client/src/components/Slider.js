import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from "antd";
// import {FaChevronLeft, FaChevronRight} from 'react-icons'

const tutorialSteps = [
  {
    label: "New Style shoes",
    imgPath: "/images/bg_img-2.jpg",
  },
  {
    label: "New Mens styling shoes",
    imgPath: "/images/img_bg_3.jpg",
  },
  {
    label: " Women Shoes",
    imgPath: "/images/bg-Img_6.jpg",
  },
  {
    label: "Best Collection",
    imgPath: "/images/bg_img-4.jpg",
  },
  {
    label: "New Design",
    imgPath: "/images/bg-Img_5.jpg",
  },
  {
    label: "Mens Sneakers ",
    imgPath: "/images/img_bg_8.jpg",
  },
];

const sliderSettings = {
  // dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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
const CustomSlider = () => {
  return (
    <Slider {...sliderSettings}>
      {tutorialSteps?.map((items) => {
        return (
          <div key={items?.label} className="slider-img">
            <Image src={items?.imgPath} alt="shoeImg" preview={false} />
          </div>
        );
      })}
    </Slider>
  );
};
export default CustomSlider;
