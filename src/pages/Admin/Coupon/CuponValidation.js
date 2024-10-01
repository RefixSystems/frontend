import * as Yup from 'yup';

export const CouponSchema = Yup.object().shape({
  image: Yup.string().required('Image  is required'),
  title: Yup.string().required('Title  is required'),
  limit: Yup.number().required('Limit  is required'),
  code: Yup.string().required('Code is required'),
  status: Yup.string().required('Status is required'),
  value: Yup.string().required('Value is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date required'),
  applicableTo: Yup.mixed().required('Applicable To is required'),
});
