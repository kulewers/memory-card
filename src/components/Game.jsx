import { useState, useEffect } from "react";

import CardsGrid from "./CardsGrid";
import Header from "./Header";

function getUrl(limit, offset) {
  return `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
}

export default function Game() {
  // statuses: 'waiting', 'playing'
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState("Welcome to the game");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  const score = selectedItems.length;

  async function fetchItems() {
    const randomOffset = Math.floor(Math.random() * 1000);
    const response = await fetch(getUrl(8, randomOffset));
    const JSONresponse = await response.json();
    const results = JSONresponse.results;

    let receivedItems = [];
    for (const result of results) {
      const resultResponse = await fetch(result.url);
      const resultJSONresponse = await resultResponse.json();
      receivedItems.push({
        name: result.name,
        spriteUrl: resultJSONresponse.sprites.front_default,
      });
    }

    const shuffledItems = shuffle(receivedItems);

    setItems(shuffledItems);
  }

  function gameTurn(newItem) {
    if (selectedItems.includes(newItem)) {
      setStatus("waiting");
      setMessage("You Lost!");
      setSelectedItems([]);
      fetchItems();

      return;
    }

    const shuffledItems = shuffle(items);
    setItems(shuffledItems);

    setSelectedItems([...selectedItems, newItem]);
  }

  function shuffle(array) {
    const arrCopy = [...array];
    arrCopy.sort(() => Math.random() - 0.5);
    return arrCopy;
  }

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }

    if (score === 8) {
      setStatus("waiting");
      setMessage("You win!");
      setSelectedItems([]);
      fetchItems();
    }
  }, [score]);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Header>
        <p>Current score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </Header>
      {status === "waiting" ? (
        <div>
          <p>{message}</p>
          <button onClick={() => setStatus("playing")}>Start</button>
        </div>
      ) : (
        <CardsGrid items={items} turnHandler={gameTurn} />
      )}
    </>
  );
}
