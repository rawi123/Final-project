export const checkTurnAdvance = (diceArr) => {
    if (diceArr[0] === diceArr[1]) {
        return false
    }
    else {
        return true;
    }
}

export const updatePlayerPos = (players, turn, i, oldPos) => {
    const newPlayers = [...players];
    newPlayers[turn] = { ...newPlayers[turn], pos: (oldPos + i) % 40, money: (oldPos + i) >= 40 ? newPlayers[turn].money + 2000 : newPlayers[turn].money };
    return newPlayers;
}

export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const playTurn = (players, turn, newPos, cards, pokemons) => {
    const moneyTakeOut = Math.floor(Math.random() * (2001 - 500) + 500);
    const playerCurrent = { ...players[turn] };
    const avilablePokemons = playerCurrent.pokemons.length === 24 ? [] : returnAvilablePokemons(playerCurrent, pokemons);
    const rnd = avilablePokemons.length > 0 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 9 + 1);

    let canPlayFlag = false;

    if (typeof cards[newPos] === "object") {
        console.log("pokemon")
        canPlayFlag = true;
    }

    else if (cards[newPos] === "tax")
        playerCurrent.money -= moneyTakeOut;

    else if (cards[newPos] === "prize")
        playerCurrent.money += moneyTakeOut;

    else if (cards[newPos] === "card") {
        if (rnd <= 5)
            playerCurrent.money -= moneyTakeOut

        else if (rnd <= 9)
            playerCurrent.money += moneyTakeOut

        else if (rnd === 10)
            playerCurrent.pokemons = [...playerCurrent.pokemons, avilablePokemons[Math.random() * avilablePokemons.length]];

    }
    else if (cards[newPos] === "Jail") {
        canPlayFlag = true;
        console.log("jail")
    }

    else if (cards[newPos] === "store") {
        canPlayFlag = true;
        console.log("store")
    }

    players[turn] = playerCurrent;
    return { canPlayFlag, players, card: cards[newPos], moneyTakeOut,rnd };
}

export const returnAvilablePokemons = (currentPlayer, pokemons) => {
    const avilablePokes = pokemons.filter(pokemon => currentPlayer.pokemons.every(val => val._id !== pokemon._id));
    return avilablePokes;
}