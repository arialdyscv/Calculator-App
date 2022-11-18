/* eslint-disable default-case */
import "./styles.css";
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import {AiFillLinkedin, AiFillMail, AiFillGithub, AiFillIdcard} from 'react-icons/ai';



export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  EQUALS: 'equals'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      
      if(payload.digit === "0" && state.currentOperand === "0") {return {state}};
      if(payload.digit === "." && state.currentOperand?.includes(".") ) {
        return {...state}
      }
      if(state.overwrite) {
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        };
      };
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return {state};
      };

      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      };

      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      };

      return{
        ...state,
        previousOperand: equals(state),
        operation: payload.operation,
        currentOperand: null,

      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EQUALS:
      if(state.operation == null || 
        state.currentOperand == null || 
        state.previousOperand == null
      ) {return {state}};

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: equals(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        };
      };
      if(state.currentOperand == null) {return {state}};
      if(state.currentOperand.lenght === 1){
        return{...state, currentOperand: null};
      };
      return {
       ...state,
       currentOperand: state.currentOperand.slice(0, -1),
      };
  };
};

function equals({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current;
      break
    case "-":
      computation = prev - current;
      break
    case "*":
      computation = prev * current;
      break
    case "÷":
      computation = prev / current;
      break
  };
  return computation.toString();
};

const INTEGER_FORMATER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0
})
function formatOperand(operand) {
  if(operand == null) return
  const [integer, decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATER.format(integer)
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
  return (
      <div className="area">
        <div className="calculator-grid">
          <div className="output">
            <div className="prev-operand">{formatOperand(previousOperand)} {operation}</div>
            <div className="current-operand">{formatOperand(currentOperand)}</div>
          </div>
          <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>AC</button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT})}>DEL</button>
          <OperationButton operation='÷' dispatch={dispatch}/>
          <DigitButton digit='1' dispatch={dispatch}/>
          <DigitButton digit='2' dispatch={dispatch}/>
          <DigitButton digit='3' dispatch={dispatch}/>
          <OperationButton operation='*' dispatch={dispatch}/>
          <DigitButton digit='4' dispatch={dispatch}/>
          <DigitButton digit='5' dispatch={dispatch}/>
          <DigitButton digit='6' dispatch={dispatch}/>
          <OperationButton operation='+' dispatch={dispatch}/>
          <DigitButton digit='7' dispatch={dispatch}/>
          <DigitButton digit='8' dispatch={dispatch}/>
          <DigitButton digit='9' dispatch={dispatch}/>
          <OperationButton operation='-' dispatch={dispatch}/>
          <DigitButton id='dot' digit='.' dispatch={dispatch}/>
          <DigitButton digit='0' dispatch={dispatch}/>
          <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EQUALS})}>=</button>
          <a  href="https://www.linkedin.com/in/arialdyscv/" target='_blank' rel="noreferrer"><AiFillLinkedin /></a>
          <a  href="#" target='_blank' rel="noreferrer"><AiFillIdcard /></a>
          <a  href="mailto:arialdyscv@gmail.com" target='_blank' rel="noreferrer"><AiFillMail /></a>
          <a  href="https://github.com/arialdyscv" target='_blank' rel="noreferrer"><AiFillGithub /></a>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
  );
}

export default App;
