import * as yup from 'yup';
import { ISchema, ObjectShape } from 'yup';

type SchemesTypes = {
  name: ISchema<any>;
  number: ISchema<any>;
  email: ISchema<any>;
  password: ISchema<any>;
  confirmPassword: ISchema<any>;
};
const schemes = {
  name: yup.string().required('Name is required'),
  number: yup.number().required('Number is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
} as ObjectShape;

export const generateValidationSchema = (schemesArr: (keyof SchemesTypes)[], fieldsNamesArr?: string[]) => {
  let res = {} as ObjectShape;
  for (const property in schemes) {
    const prop = property as keyof SchemesTypes;
    if (schemesArr.includes(prop)) {
      if (fieldsNamesArr) {
        const index = schemesArr.indexOf(prop);
        res[fieldsNamesArr[index]] = schemes[property];
      } else {
        res[property] = schemes[property];
      }
    }
  }
  return yup.object(res);
};
