import * as Yup from 'yup';



export const reviewValidationSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars')
    .required('Rating is required'),
  review: Yup.string()
   
    .required('Review is required'),
  images: Yup.array()
    .of(
      Yup.mixed()
        // .test(
        //   'fileSize',
        //   'File size is too large. Maximum size is 10MB',
        //   (value) => !value || (value && value.size <= 10 * 1024 * 1024)
        // )
        .test(
          'fileFormat',
          'Unsupported format. Only JPG, JPEG, PNG, WEBP, MP4, MOV, AVI, and MKV are allowed',
          (value) =>
            !value ||
            (value &&
              [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp',
                'video/mp4',
                'video/quicktime', // .mov
                'video/x-msvideo', // .avi
                'video/x-matroska' // .mkv
              ].includes(value.type))
        )
    )
    .max(3, 'You can upload a maximum of 3 images or videos'),
});




export const productReviewValidationSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars')
    .required('Rating is required'),
  review: Yup.string()
    
    .required('Review is required'),
    images: Yup.array()
    .of(
      Yup.mixed()
        // .test(
        //   'fileSize',
        //   'File size is too large. Maximum size is 10MB',
        //   (value) => !value || (value && value.size <= 10 * 1024 * 1024)
        // )
        .test(
          'fileFormat',
          'Unsupported format. Only JPG, JPEG, PNG, WEBP, MP4, MOV, AVI, and MKV are allowed',
          (value) =>
            !value ||
            (value &&
              [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp',
                'video/mp4',
                'video/quicktime', // .mov
                'video/x-msvideo', // .avi
                'video/x-matroska' // .mkv
              ].includes(value.type))
        )
    )
    .max(3, 'You can upload a maximum of 3 images or videos'),
});
