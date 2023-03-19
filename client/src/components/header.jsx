import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useHistory } from 'react-router-dom';
import { AnimateOnChange } from 'react-animation'
import CustomSlider from './Slider';
const tutorialSteps = [
  {
    label: 'New Style shoes',
    imgPath:
      '/images/bg_img-2.jpg',
  },
  {
    label: 'New Mens styling shoes',
    imgPath:
      '/images/img_bg_3.jpg',
  },
  {
    label: ' Women Shoes',
    imgPath:
      '/images/bg-Img_6.jpg',
  },
  {
    label: 'Best Collection',
    imgPath:
      '/images/bg_img-4.jpg',
  },
  {
    label: 'New Design',
    imgPath:
      '/images/bg-Img_5.jpg',
  },
  {
    label: 'Mens Sneakers ',
    imgPath:
      '/images/img_bg_8.jpg',
  },

];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
    cursor: 'pointer',

  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    marginTop: '20px',
    maxHeight: '550px',
    maxWidth: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    display: 'center',
    alignContent: 'center',
    marginLeft: '270px',

  },
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/product')
  }

  return (
    <div className={classes.root}>
      <CustomSlider/>
    </div>
  );
}

export default Header;
