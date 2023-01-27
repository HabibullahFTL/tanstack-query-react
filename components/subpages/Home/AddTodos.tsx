import { yupResolver } from '@hookform/resolvers/yup';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { IHomePageProps } from 'pages';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  IFormValues,
  initialValues,
  validationSchema,
} from './utils/formHelpers';

interface IAddTodosProps {
  setUpdateTodos: Dispatch<SetStateAction<IHomePageProps[]>>;
  updateTodos: IHomePageProps[];
}

const getTodos = () => {
  return axios
    .get('https://sheetdb.io/api/v1/cs9oqmk2psub4')
    .then((res) => res.data);
};

interface IUserData {
  id: string | number;
  name: string;
  age: number;
}
interface IContext {
  previousTodos: IUserData | undefined;
}

const AddTodos = ({ setUpdateTodos, updateTodos }: IAddTodosProps) => {
  const { data, ...rest } = useQuery<IUserData[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading,
    isError,
    isSuccess,
  }: UseMutationResult<IUserData, Error, IUserData> = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('https://sheetdb.io/api/v1/cs9oqmk2psub4', {
        data: [newTodo],
      });
    },
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimistically update to the new value
      queryClient.setQueryData<IUserData[]>(['todos'], (old) => [
        ...(old || []),
        newTodo,
      ]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], (context as IContext).previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const formMethods = useForm<IFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    formState: { errors },
  } = formMethods;

  // const onSubmit = useFormHelpers(formMethods, setUpdateTodos);

  const onSubmit = formMethods.handleSubmit((values: IFormValues) => {
    const todo = {
      userId: 1,
      id: Math.random(),
      title: values.firstName + ' ' + values.lastName,
      completed: values.completed,
    };
    setUpdateTodos([todo, ...updateTodos]);
    console.log(todo);

    mutate({
      id: 'INCREMENT',
      name: todo?.title,
      age: todo?.id,
    });

    formMethods.reset();
  });

  return (
    <>
      <div className="">
        <h2 className="text-xl font-bold text-green-600">User List</h2>
        {data?.map((user) => (
          <div key={user.id} className="border-b">
            {user.name}
          </div>
        ))}
      </div>
      {isLoading ? (
        <p className="my-4 border-l-4 border-yellow-500 bg-gray-200 p-1 text-sm italic">
          Adding new data...
        </p>
      ) : null}
      {isSuccess ? (
        <p className="my-4 border-l-4 border-green-500 bg-gray-200 p-1 text-sm italic">
          Added
        </p>
      ) : null}
      {isError ? (
        <p className="py-1 text-sm italic text-red-500">Something is wrong</p>
      ) : null}
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <input
            {...formMethods.register('firstName')}
            className="form-input rounded-full border px-4 py-3 "
          />
          <span>{errors?.firstName?.message}</span>
          <input
            {...formMethods.register('lastName')}
            className="form-input rounded-full border px-4  py-3"
          />
          <span>{errors?.lastName?.message}</span>
          <input
            type="checkbox"
            {...formMethods.register('completed')}
            className="form-checkbox rounded text-pink-500"
          />

          <button type="submit" className="border border-rose-400 px-2 py-1">
            Submit
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default AddTodos;
