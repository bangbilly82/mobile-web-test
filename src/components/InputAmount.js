import React, { Component } from "react";
import { returnNominal, amountParser, indonesiaCurrencyFormatter } from "../utils/CurrencyFormatter";

class InputAmount extends Component {
  state = {
    amount: "",
    denom: "",
    nominal: [],
    isError: false,
    errorText: ""
  };

  handleChangeAmount = evt => {
    const amount = evt.target.value;
    this.setState({
      amount
    });
  };

  calculateNominal = evt => {
    const { state, setErrorValidation } = this;
    evt.preventDefault();
    if (state.amount.length) {
      const amount = amountParser(state.amount);
      const nominal = returnNominal(amount);
      this.setState({
        denom: amount,
        nominal,
        isError: false,
        errorText: ""
      });
    } else {
      setErrorValidation("Please fill amount input!");
    }
  };

  setErrorValidation = text => {
    this.setState({
      isError: true,
      errorText: text
    });
  };

  generateDenomTable = () => {
    const { state } = this;
    return state.nominal.map((item, index) => {
      return (
        <tr key={index}>
          <td width="50%">Rp {indonesiaCurrencyFormatter(item.denom)}</td>
          <td>
            {item.count === "leftdenom"
              ? "no available fraction"
              : item.count + "x"}
          </td>
        </tr>
      );
    });
  };

  render() {
    const {
      state,
      handleChangeAmount,
      calculateNominal,
      generateDenomTable
    } = this;
    return (
      <div className="input-amount__wrapper">
        <h3>Input Amount</h3>
        <form onSubmit={calculateNominal}>
          <input
            type="text"
            placeholder="Input amount"
            value={state.amount}
            onChange={handleChangeAmount}
          />
          {state.isError && (
            <label className="error-warning">{state.errorText}</label>
          )}
          <div className="submit-button">
            <button>Calculate</button>
          </div>
        </form>
        {state.nominal.length > 0 && (
          <div className="table-view">
            <table border={1}>
              <thead>
                <tr>
                  <th colSpan={2}>Rp {indonesiaCurrencyFormatter(state.denom)}</th>
                </tr>
                <tr>
                  <th>Denom</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>{generateDenomTable()}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default InputAmount;
