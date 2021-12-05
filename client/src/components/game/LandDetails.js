import React from 'react'
import { Card, CardActions, CardContent, Icon, Typography } from '@mui/material'

export default function LandDetails({ pokemon, classToPut }) {
    console.log(pokemon)
    return (
        <Card className={` ${classToPut} land-details land-${pokemon.color} ${pokemon.name === "pikachu" ? "pikachu" : null}`} sx={{ maxWidth: 450, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <img
                height="100"
                src={require(`../../sprites-animations/${pokemon.name}-front.gif`).default}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography style={{ textAlign: "center" }} gutterBottom variant="h5" component="div">
                    Land protector:<br />
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" color="black">
                    attack:{pokemon.attack}🗡️
                </Typography>
                <Typography variant="body2" color="black">
                    defense:{pokemon.def}🛡️
                </Typography>
                <Typography variant="body2" color="black">
                    hp:{pokemon.hp}❤️
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>

    )
}
