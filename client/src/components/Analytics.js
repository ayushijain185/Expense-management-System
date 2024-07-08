import React from 'react';
import { Progress } from 'antd';
import moment from 'moment';

const Analytics = ({ allTransection = [] }) => {
  // Categories
  const categories = ['salary', 'tip','freelancing','schoolarship','trip','rent', 'food', 'shopping', 'medical', 'dailyneeds', 'tax', 'fees', 'stationary', 'other'];

  // Total transactions
  const totalTransection = allTransection.length;
  const totalIncome = allTransection.filter(transection => transection.type === 'income').length;
  const totalExpense = allTransection.filter(transection => transection.type === 'expense').length;
  const totalIncomePercent = (totalIncome / totalTransection) * 100 || 0;
  const totalExpensePercent = (totalExpense / totalTransection) * 100 || 0;

  // Total turnover
  const totalTurnover = allTransection.reduce((acc, transection) => acc + transection.amount, 0);
  const totalIncomeTurnover = allTransection.filter(transection => transection.type === 'income').reduce((acc, transection) => acc + transection.amount, 0);
  const totalExpenseTurnover = allTransection.filter(transection => transection.type === 'expense').reduce((acc, transection) => acc + transection.amount, 0);
  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100 || 0;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100 || 0;

  return (
    <>
      <div className="row p-3 m-3">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Total Transactions: {totalTransection}
            </div>
            <div className='card-body'>
              <h5 className='text-success'>Income: {totalIncome} </h5>
              <h5 className='text-danger'>Expense: {totalExpense}</h5>
              <div>
                <Progress type='circle' strokeColor={'green'} className='mx-2 px-4 my-2' percent={totalIncomePercent.toFixed(0)} />
                <Progress type='circle' strokeColor={'red'} className='mx-2 px-4 my-2' percent={totalExpensePercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Total Turnover: {totalTurnover}
            </div>
            <div className='card-body'>
              <h5 className='text-success'>Income: {totalIncomeTurnover} </h5>
              <h5 className='text-danger'>Expense: {totalExpenseTurnover}</h5>
              <div>
                <Progress type='circle' strokeColor={'green'} className='mx-2 px-4 my-2' percent={totalIncomeTurnoverPercent.toFixed(0)} />
                <Progress type='circle' strokeColor={'red'} className='mx-2 px-4 my-2' percent={totalExpenseTurnoverPercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>      
        <div className="col-md-3">
          <h4>Categorywise Income</h4>
          {categories.map(category => {
            const incomeAmount = allTransection.filter(transection => transection.type === 'income' && transection.category === category)
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              incomeAmount > 0 &&
              <div className='card' key={category}>
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress percent={((incomeAmount / totalIncomeTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="col-md-3">
          <h4>Categorywise Expense</h4>
          {categories.map(category => {
            const expenseAmount = allTransection.filter(transection => transection.type === 'expense' && transection.category === category)
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              expenseAmount > 0 &&
              <div className='card' key={category}>
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress percent={((expenseAmount / totalExpenseTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Analytics;
