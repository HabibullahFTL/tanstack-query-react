import { IHomePageProps } from 'pages';
import { useState } from 'react';
import AddTodos from './AddTodos';

const Home = ({ data }: { data: IHomePageProps[] }) => {
  const [showTodos, setShowTodos] = useState(false);
  const [updateTodos, setUpdateTodos] = useState(data);

  return (
    <div>
      {/* {showTodos &&
        updateTodos.slice(0, 5).map((dt) => <p key={dt.id}>{dt.title}</p>)}
      <button
        onClick={() => setShowTodos(!showTodos)}
        className="border border-rose-500 p-2"
      >
        Show todos
      </button> */}

      <AddTodos setUpdateTodos={setUpdateTodos} updateTodos={updateTodos} />

      {/* <SlideShow /> */}
    </div>
  );
};
export default Home;
