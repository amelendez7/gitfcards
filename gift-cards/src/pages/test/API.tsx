import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
  }

return (
    <div>
      <h1>Count is: {counter}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}