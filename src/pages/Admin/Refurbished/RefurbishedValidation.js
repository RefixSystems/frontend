import * as Yup from 'yup';

export const RefurbishedSchema = Yup.object().shape({
  
  brand: Yup.mixed().required('Brand Must be Required..!'),
  model: Yup.mixed().required('Model Must be Required..!'),
  processor: Yup.mixed().required('Processor Must be Required..!'),
  image1: Yup.mixed().required('Image1 Must be Required..!'),
  image2: Yup.mixed().required('Image2 Must be Required..!'),
  image3: Yup.mixed().required('Image3 Must be Required..!'),
  image4: Yup.mixed().required('Image4 Must be Required..!'),
  image5: Yup.mixed().required('Image5 Must be Required..!'),
  ram: Yup.mixed().required('Ram  Must be Required..!'),
  screenSize: Yup.mixed().required('ScreenSize Must be Required..!'),
  storage: Yup.mixed().required('Storage Must be Required..!'),
  color: Yup.mixed().required('Color Must be Required..!'),
  operatingSystem: Yup.mixed().required('Operating System Must be Required..!'),
  additionalinfo: Yup.mixed().required('Additional Info Must be Required..!'),
  description: Yup.mixed().required(' Description  Must be Required..!'),
  addInCarousel: Yup.string().required('Add In Carousel is required'),
});
