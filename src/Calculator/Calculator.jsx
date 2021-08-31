import React, { useState } from "react";
import "./Calculator.css";

const Calculator = (props) => {
  const operators = ["+", "-", "/", "x", "="];
  const [state, setState] = useState({
    prevValue: 0,
    prevOperator: "",
    currValue: "",
    buffer: "",
    result: 0,
  });

  const calculate = () => {
    switch (state.prevOperator) {
      case "+":
        return Number(state.prevValue) + Number(state.currValue);
      case "-":
        return Number(state.prevValue) - Number(state.currValue);
      case "/":
        return Number(state.prevValue) / Number(state.currValue);
      case "x":
        return Number(state.prevValue) * Number(state.currValue);
      default:
        return;
    }
  };

  const buttonHandler = (event) => {
    let value = event.target.value;
    if (value === "AC") {
      setState({
        prevValue: 0,
        prevOperator: "",
        currValue: "",
        buffer: "",
        result: 0,
      });
    } else if (operators.includes(value)) {
      if (state.prevOperator !== "") {
        if (state.prevOperator === "=") {
          setState((prevState) => ({
            prevValue: prevState.result,
            prevOperator: value,
            currValue: "",
            buffer: prevState.result + value,
            result: prevState.result,
          }));
        } else {
          if (state.result && state.prevOperator === '=') {
            setState((prevState) => {
              let preparedBuffer = prevState.buffer
                .split("")
                .slice(0, prevState.buffer.length - 1);
              preparedBuffer.push(value);
              return {
                prevValue: prevState.result,
                prevOperator: value,
                currValue: "",
                buffer: preparedBuffer.join(""),
                result: prevState.result,
              };
            });
          } else {
            const result = parseFloat(calculate().toFixed(8));
            setState((prevState) => ({
              prevValue: result,
              prevOperator: value,
              currValue: "",
              buffer: prevState.buffer + value,
              result: result,
            }));
          }
        }
      } else {
        state.prevValue === 0 && state.buffer === ""
          ? setState((prevState) => ({
              prevValue: prevState.prevValue,
              prevOperator: value,
              currValue: "",
              buffer: prevState.prevValue + value,
              result: prevState.result,
            }))
          : setState((prevState) => ({
              prevValue: prevState.currValue,
              prevOperator: value,
              currValue: "",
              buffer: prevState.buffer + value,
              result: prevState.result,
            }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        currValue: prevState.currValue + value,
        buffer: prevState.buffer + value,
      }));
    }
  };

  console.log(state);

  return (
    <div className="calculator">
      <div className="formulaScreen">{state.buffer}</div>
      <div className="outputScreen">{state.result}</div>
      <div className="buttons">
        <button id="AC" value="AC" onClick={buttonHandler}>
          AC
        </button>
        <button id="divide" value="/" onClick={buttonHandler}>
          &divide;
        </button>
        <button id="multiply" value="x" onClick={buttonHandler}>
          &times;
        </button>
        <button id="seven" value="7" onClick={buttonHandler}>
          7
        </button>
        <button id="eight" value="8" onClick={buttonHandler}>
          8
        </button>
        <button id="nine" value="9" onClick={buttonHandler}>
          9
        </button>
        <button id="substract" value="-" onClick={buttonHandler}>
          &minus;
        </button>
        <button id="four" value="4" onClick={buttonHandler}>
          4
        </button>
        <button id="five" value="5" onClick={buttonHandler}>
          5
        </button>
        <button id="six" value="6" onClick={buttonHandler}>
          6
        </button>
        <button id="add" value="+" onClick={buttonHandler}>
          +
        </button>
        <button id="one" value="1" onClick={buttonHandler}>
          1
        </button>
        <button id="two" value="2" onClick={buttonHandler}>
          2
        </button>
        <button id="three" value="3" onClick={buttonHandler}>
          3
        </button>
        <button id="equals" value="=" onClick={buttonHandler}>
          =
        </button>
        <button id="zero" value="0" onClick={buttonHandler}>
          0
        </button>
        <button id="decimal" value="." onClick={buttonHandler}>
          .
        </button>
      </div>
    </div>
  );
};
export default Calculator;
