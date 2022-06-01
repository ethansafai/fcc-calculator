import { useState } from "react";

const Calculator = () => {
  const [number, setNumber] = useState(0);
  const [decimalLength, setDecimalLength] = useState(0);
  const [expression, setExpression] = useState("");

  const handleClear = () => {
    setNumber(0);
    setDecimalLength(0);
    setExpression("");
  };

  const handleNumber = (num) => {
    let newNumber;
    if (decimalLength) {
      const decimal = num / Math.pow(10, decimalLength);
      newNumber = number + decimal;
      setDecimalLength((prev) => prev + 1);
    } else {
      newNumber = number * 10 + num;
    }
    let index = -1;
    for (let i = expression.length; i >= 0; i--) {
      const c = expression.charAt(i);
      if (c === "/" || c === "X" || c === "-" || c === "+") {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      setExpression((prev) => prev.substring(0, index + 1) + newNumber);
    } else {
      setExpression(
        (prev) => prev.substring(0, prev.indexOf(number)) + newNumber
      );
    }
    setNumber(newNumber);
  };

  const handleOperator = (operator) => {
    if (operator === "=") {
      evalutate();
      return;
    }

    if (number !== 0) {
      setExpression((prev) => prev + operator);

      setNumber(0);
      setDecimalLength(0);
    } else if (
      expression.charAt(expression.length - 1) === "X" &&
      operator === "-"
    ) {
      setExpression((prev) => prev + operator);
    }
  };

  const evalutate = () => {
    if (!expression) {
      return;
    }
    setNumber(eval(expression.replace("X", "*")));
    setDecimalLength(0);
    setExpression("");
  };

  return (
    <div
      id="calculator"
      className="grid grid-rows-6 grid-cols-4 bg-slate-900 text-white text-3xl 
      font-medium p-2 gap-1"
    >
      {/* Row 1 */}
      <div className="col-span-full flex flex-col justify-center items-end">
        {decimalLength === 1 ? (
          <p id="display">{number + "."}</p>
        ) : (
          <p id="display">{number}</p>
        )}
        {expression && <p>{expression}</p>}
      </div>

      {/* Row 2 */}
      <button onClick={handleClear} id="clear" className="col-span-2">
        AC
      </button>
      <button
        onClick={() => handleOperator("/")}
        id="divide"
        className="operator"
      >
        /
      </button>
      <button
        onClick={() => handleOperator("X")}
        id="multiply"
        className="operator"
      >
        X
      </button>

      {/* Row 3 */}
      <button onClick={() => handleNumber(7)} id="seven">
        7
      </button>
      <button onClick={() => handleNumber(8)} id="eight">
        8
      </button>
      <button onClick={() => handleNumber(9)} id="nine">
        9
      </button>
      <button
        onClick={() => handleOperator("-")}
        id="subtract"
        className="operator"
      >
        -
      </button>

      {/* Row 4 */}
      <button onClick={() => handleNumber(4)} id="four">
        4
      </button>
      <button onClick={() => handleNumber(5)} id="five">
        5
      </button>
      <button onClick={() => handleNumber(6)} id="six">
        6
      </button>
      <button onClick={() => handleOperator("+")} id="add" className="operator">
        +
      </button>

      {/* Row 5 */}
      <button onClick={() => handleNumber(1)} id="one">
        1
      </button>
      <button onClick={() => handleNumber(2)} id="two">
        2
      </button>
      <button onClick={() => handleNumber(3)} id="three">
        3
      </button>
      <button
        onClick={() => handleOperator("=")}
        id="equals"
        className="row-span-2"
      >
        =
      </button>

      {/* Row 6 */}
      <button onClick={() => handleNumber(0)} id="zero" className="col-span-2">
        0
      </button>
      <button onClick={() => setDecimalLength(1)} id="decimal">
        .
      </button>
    </div>
  );
};

export default Calculator;
