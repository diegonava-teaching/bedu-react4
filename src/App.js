import React, { useEffect, useState } from 'react';
import Countdown from './components/Countdown';

function App() {
  const [data, setData] = useState([]);
  console.log('App.js (4) - data', data);
  // const [isCountDownShown, setIsCountDownShown] = useState(true);
  const [isSuccessShown, setIsSuccessShown] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const handleGetData = async () => {
    try {
      const todos = await fetch('https://jsonplaceholder.typicode.com/todos');

      const todosData = await todos.json();
      console.log('App.js (15) - todosData', todosData);

      if (!todosData) throw new Error();

      console.log('asd');
      setData(todosData);
      setIsLoading(false);
    } catch (e) {
      setData([]);
      setIsLoading(false);

      //Ugly syntax
      alert(
        'Ups, hubo un error al intentar traer tus datos! Intenta de nuevo mas tarde\n\n' +
          e
      );

      //ES6: Template Literals - Desired syntax
      alert(
        `Ups, hubo un error al intentar traer tus datos! Intenta de nuevo mas tarde\n\n${e}`
      );
    }
  };

  useEffect(() => {
    console.log('componentDidMount');

    handleGetData();
  }, []);

  //componentDidUpdate
  useEffect(() => {
    // const isSuccessShownStillActive = data.length !== 202 && isSuccessShown
    if (data.length !== 202 && isSuccessShown) return setIsSuccessShown(false);
  }, [data, isSuccessShown]);

  //componentDidUpdate
  useEffect(() => {
    // const shouldShowSuccess = data.length === 202
    if (data.length === 202) return setIsSuccessShown(true);
  }, [data]);

  // const handleRemoveCounter = () => {
  //   setIsCountDownShown(false);
  // };

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: Date.now(),
    };

    setData([newTodo, ...data]);
  };

  const todoCounting = data.length;

  //TODO: Add loading spinner while we are waiting for the data

  if (isLoading) return <div>Loading..</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      {/* {isCountDownShown ? <Countdown /> : null} */}

      {/* //TODO: Add the functionality to be able to send to the Counter component the initialCountTime */}
      {/* {isCountDownShown && <Countdown />}

      <button onClick={handleRemoveCounter}>Remove Counter</button>

      <br /> */}

      <div>Hay {todoCounting} To-dos</div>

      <br />

      <button onClick={handleAddTodo}>Add task with random name</button>

      <br />
      {isSuccessShown && <div>Sigue asi!</div>}
      <br />

      {/* //TODO: Put this part in a function handler instead: _todoList */}
      {data.map((todoItem) => {
        return <div key={todoItem.id}>- {todoItem.title}</div>;
      })}
    </div>
  );
}

export default App;

// **Example of async await with function syntax
// async function _handleGetData() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//   const dataResponse = await response.json();

//   console.log('App.js (17) - dataResponse', dataResponse);

//   return response;
// }
