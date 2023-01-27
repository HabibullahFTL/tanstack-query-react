import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { makeSerializable } from 'utils/makeSerializable';
import Layout from '../components/layout';
import Home from '../components/subpages/Home';

export interface IHomePageProps {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
}

const queryClient = new QueryClient();
const HomePage = ({ data }: { data: IHomePageProps[] }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Home data={data} />
        </QueryClientProvider>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dataR = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await dataR.json();

  return {
    props: {
      data: makeSerializable<IHomePageProps[]>(data),
    },
  };
};

export default HomePage;
