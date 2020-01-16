import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import Form from './components/Form';
import axios from "axios";
import './App.css';

const initialState = {
  chain: [],
  title: "Whole Chain",
  coins: null,
  filteredChain: [],
  id: null
}

function App() {

  const [state, setState] = useState(initialState)

  useEffect(() => {
    axios.get('http://localhost:5000/chain')
      .then(({ data }) => {
        console.log(data)
        setState({ ...state, chain: data.chain });
        console.log("STATE", state);
      })
      .catch(err => console.error(err))

  }, [])

  const filterChain = (id) => {
    console.log("CHAIN: ", state.chain, "\n id: ", id)
    const filteredChain = state.chain.filter(block => {
      console.log("block: ", block)
      if (!block.transactions.length) {
        return false
      }
      else {
        return block.transactions[0].recipient === id
      }
    })
    console.log("FILTER", filteredChain, id)
    if (!filteredChain.length) {
      setState({
        ...state,
        warning: "No user by that id was found",
        title: "Whole Chain",
        filteredChain: [],
        coins: null
      })
      setTimeout(() => {
        setState({ ...state, warning: '' })
      }, 3000);
    }
    else {
      setState(
        {
          ...state,
          id,
          title: `${id}'s Transactions`,
          filteredChain,
          warning: null
        }
      )
      setTimeout(() => {
        getCoins(id)
      }, 500);
    }
  }

  const getCoins = (id) => {
    let totalCoins = 0;
    state.filteredChain.forEach(block => {
      console.log("COINS FOREACH: ", block, id)
      if (block.transactions[0].recipient === id) {
        return totalCoins = block.transactions[0].amount + totalCoins
      }
      if (block.transactions[0].sender === id) {
        return totalCoins -= block.transactions[0].amount
      }
    })
    setState({ ...state, coins: totalCoins })
  }

  console.log("coinie", state.coins)




  return (
    <div className="App">
      <Form
        filterChain={filterChain}
        getCoins={getCoins}
      />
      <h2>{state.warning}</h2>
      <Display
        coins={state.coins}
        chain={state.filteredChain.length ? state.filteredChain : state.chain}
        title={state.title}
        length={state.chain.length}
      />
    </div>
  );
}

export default App;
