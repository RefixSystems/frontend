import * as Yup from 'yup';

export const userCreationSchema = Yup.object().shape({
  employeeId: Yup.string().required('Employee Id is required...!'),
  nameOfEmployee: Yup.string().required('Name Of Employee is required...!'),
  dateOfBirth: Yup.date().required('Date Of Birth is required...!').nullable(),
  roleOfEmployee: Yup.string().required('Role Of Employee is required...!'),
  phoneNumber: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format')
    .required('Phone Number is required'),
  email: Yup.string()
    .transform((value) => value.trim())
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ),

  password: Yup.string()
    .transform((value) => value.trim())
    .required('Password is required...!')
    .min(8, 'Password should be at least 8 characters'),
  photo: Yup.mixed().required('Photo is required...!'),
  idProof: Yup.mixed().required('Id Proof is required...!'),
});
