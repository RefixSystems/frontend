import * as Yup from 'yup';

export const GallerySchema = Yup.object().shape({
  location: Yup.string().required('Location is required'),
  address: Yup.string().required('Address is required'),

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
});
