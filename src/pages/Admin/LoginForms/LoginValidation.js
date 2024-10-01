import * as Yup from 'yup';

export const LogAndRegSchema = Yup.object().shape({
  userName: Yup.string()
    .transform((value) => value.trim())
    .required('Required')
    .test('is-valid', 'Invalid format', (value) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phonePattern = /^\d{10}$/; 
      return emailPattern.test(value) || phonePattern.test(value);
    })
    .test(
      'phone-max-length',
      'Phone number must be exactly 10 digits',
      (value) => {
        if (/^\d{10}$/.test(value)) {
          return value.length === 10;
        }
        return true;
      }
    ),

  password: Yup.string()
    .transform((value) => value.trim())
    .required('Password is required ')
    .min(8, 'Password should be at least 8 characters'),
});
