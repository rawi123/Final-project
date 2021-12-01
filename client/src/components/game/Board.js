import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../../api/pokemonApi'
import { setPokemons } from '../../redux/slices/pokemonSlices'
import Land from './Land'
import LuckyLand from './LuckyLand'
import StoreLand from './StoreLand'
import PokemonLand from "./PokemonLand"
import JailLand from './JailLand'
import TaxPrize from './TaxPrize'

export default function Board() {
    const { pokemons } = useSelector(state => state?.pokemons);
    const players = useSelector(state => state.players);
    const [cards, setCards] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (pokemons === null) {
            (async () => {
                const pokemons = await getPokemons();
                dispatch(setPokemons({ pokemons }))
            })()
        }
        if (pokemons !== null)
            setCards(["go", pokemons[0], pokemons[1], pokemons[2], "tax", pokemons[3], pokemons[4], pokemons[5], "prize", "card", "store", pokemons[6], pokemons[7], pokemons[8], "prize", pokemons[9], "tax", pokemons[10], pokemons[11], "card", "jail", pokemons[12], pokemons[13], pokemons[14], "card", pokemons[15], pokemons[16], "tax", "card", pokemons[17], "store", "tax", "prize", pokemons[18], pokemons[19], pokemons[20], "card", pokemons[21], pokemons[22], pokemons[23]])
    }, [pokemons])

    return (
        <div className="board">

            {pokemons ? [...Array(40)].map((val, i) => {
                if (typeof cards[i] === "object") {
                    return <Land key={i} classGive={`land${i + 1}`} cardNumber={i} children={<PokemonLand card={cards[i]} />} />
                }
                if (cards[i] === "tax" || cards[i] === "prize") {
                    return <Land key={i} classGive={`land${i + 1}`} cardNumber={i} children={<TaxPrize card={cards[i]} />} />

                }
                if (cards[i] === "store") {
                    return <Land key={i} classGive={`land${i + 1}`} cardNumber={i} children={<StoreLand card={cards[i]} />} />
                }
                if (cards[i] === "card") {
                    return <Land key={i} classGive={`land${i + 1}`} cardNumber={i} children={<LuckyLand card={cards[i]} />} />
                }
                return <Land key={i} classGive={`land${i + 1}`} cardNumber={i} children={<JailLand card={cards[i]} />} />
            }) : null}
        </div>
    )
}
