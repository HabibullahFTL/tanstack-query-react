import { IHomePageProps } from 'pages';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

export interface IFormValues {
  firstName: string;
  lastName: string;
  completed?: boolean;
}

export const initialValues = {
  firstName: '',
  lastName: '',
  completed: false,
};

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
});

export const useFormHelpers = (
  formMethods: UseFormReturn<IFormValues, any>,
  setUpdateTodos: Dispatch<SetStateAction<IHomePageProps[]>>
) => {
  const onSubmit = formMethods.handleSubmit((values: IFormValues) => {
    const todo = {
      userId: 1,
      id: Math.random(),
      title: values.firstName + ' ' + values.lastName,
      completed: values.completed,
    };
    if (values.completed) {
      setUpdateTodos((prev) => [todo, ...prev]);
      formMethods.reset();
    } else {
      alert('Please check');
    }
  });
  return onSubmit;
};
