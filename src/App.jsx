import { useReducer } from "react";
import "./App.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  message: "open a account",
};

function reducer(state, action) {
  if (action.type !== "openAccount" && !state.isActive) {
    return { ...state };
  }

  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
        balance: 500,
        message: "Account opened",
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        message: "Deposited 150",
      };

    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
        message: "Withdrawal of 50",
      };

    case "requestLoan":
      if (state.loan) {
        return {
          ...state,
          message: "You already have a loan",
        };
      }

      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
        message: "loan granted",
      };

    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        message: "loan setteled",
      };

    case "closeAccount":
      if (state.loan || state.balance) {
        return {
          ...state,
          message: `${state.loan && "Settle your Loan. "} ${
            state.balance && "Withdraw your balance"
          } to close your account`,
        };
      }

      return {
        ...initialState,
        message: "Account closed successfylly. Open another account",
      };

    default:
      throw new Error("Unknown action type ❌");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, loan, isActive, message } = state;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <div className="statement">
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>
        <p>Status : {message}</p>
      </div>

      <div className="operations">
        <p>
          <button
            onClick={() => dispatch({ type: "openAccount" })}
            disabled={isActive}
          >
            Open account
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "deposit", payload: 150 })}
            disabled={!isActive}
          >
            Deposit 150
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "withdraw", payload: 50 })}
            disabled={!isActive}
          >
            Withdraw 50
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "requestLoan", payload: 1000 })}
            disabled={!isActive}
          >
            Request a loan of 1000
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "payLoan" })}
            disabled={!isActive}
          >
            Pay loan
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "closeAccount" })}
            disabled={!isActive}
          >
            Close account
          </button>
        </p>
      </div>
    </div>
  );
}
