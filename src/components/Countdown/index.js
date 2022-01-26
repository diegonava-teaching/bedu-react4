import React, { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';

export default function Counter() {
  const initialCountTime = 100000;
  const timeDecrementUnit = 1000;

  const [timeLeft, actions] = useCountDown(initialCountTime, timeDecrementUnit);

  useEffect(() => {
    console.log('componentDidMount');
    actions.start();

    return () => {
      console.log('componentWillUnmount');
      actions.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{timeLeft / 1000}</h1>
    </div>
  );
}
