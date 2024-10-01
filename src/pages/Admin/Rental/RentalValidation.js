import * as Yup from 'yup';

export const RentalSchema = Yup.object().shape({
  amountFor6Months: Yup.string().required('Amount For 6 Months is required'),
  brand: Yup.string().required('Brand is required'),
  model: Yup.string().required('Model is required'),
  processor: Yup.string().required('Processor is required'),
  image1: Yup.mixed()
    .required('Image1 is required')
    .test(
      'fileType',
      'Invalid file format',
      (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
    ),
  image2: Yup.mixed()
    .required('Image2 is required')
    .test(
      'fileType',
      'Invalid file format',
      (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
    ),
  image3: Yup.mixed()
    .required('Image3 is required')
    .test(
      'fileType',
      'Invalid file format',
      (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
    ),
  image4: Yup.mixed()
    .required('Image4 is required')
    .test(
      'fileType',
      'Invalid file format',
      (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
    ),
  image5: Yup.mixed()
    .required('Image5 is required')
    .test(
      'fileType',
      'Invalid file format',
      (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
    ),
  ram: Yup.string().required('RAM is required'),
  screenSize: Yup.string().required('Screen Size is required'),
  storage: Yup.string().required('Storage is required'),
  color: Yup.string().required('Color is required'),
  operatingSystem: Yup.string().required('Operating System is required'),
  additionalinfo: Yup.string().required('Additional Info is required'),
  offer: Yup.string().required('Offer is required'),
  addInCarousel: Yup.string().required('Add In Carousel is required'),
  description: Yup.string().required('Description is required'),
});
