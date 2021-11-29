import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import { buyPokemon } from '../../api/userApi';
import { setUser } from "../../redux/slices/userSlices"

export default function PokeCard({ pokemon, removeBuy }) {
    const { user } = useSelector(state => state?.user);
    const dispatch = useDispatch();
    const [err, setErr] = useState(false);
    const [enableBuy, setEnableBuy] = useState(true);
    
    const error = () => {
        setErr(true);
        setTimeout(() => {
            setErr(false);
        }, 2000);
    }

    const handelBuy = async () => {
        try {
            if (!enableBuy) {
                return
            }
            if (user.money < pokemon.cost) {
                error();
                return;
            }
            const newUser = await buyPokemon(pokemon._id);
            dispatch(setUser({ user: newUser, decline: false }));
        }
        catch (err) {
            error();
            setEnableBuy(true);
        }
    }

    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 450, display: "flex", alignItems: "center", flexDirection: "column" }}>
                <img
                    height="100"
                    src={require(`../../sprites-animations/${pokemon.name}-front.gif`).default}
                    alt={pokemon.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        attack:{pokemon.attack}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        defense:{pokemon.def}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        hp:{pokemon.hp}
                    </Typography>
                </CardContent>
                <CardActions>
                    {pokemon.cost}${!removeBuy ? <Button size="small" onClick={handelBuy}>Buy</Button> : null}
                </CardActions>
            </Card>
            {err ? <Alert sx={{ mt: 3 }} severity="error">Not enough money</Alert> : null}

        </Grid>
    )
}
