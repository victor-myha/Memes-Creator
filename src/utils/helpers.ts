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
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
} as ObjectShape;

export const generateValidationSchema = (
  schemesArr: (keyof SchemesTypes)[],
  fieldsNamesArr?: string[]
) => {
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

/**
 * Unique id generator
 * @returns A unique id. EX: 4c9c44d9-02bf-4933-b244-52cdc7a7fcdd
 */
export const idGenerator = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};
