import React, {Component, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {addItemToCart, getMenus, getRestaurants} from "../utils";
import {
    Alert,
    Snackbar,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Container,
    CardActions,
    OutlinedInput,
    MenuItem,
    Backdrop,
    CircularProgress, Box
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import Typography from "@mui/material/Typography";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AddToCartButton = ({ itemId}) => {
    const [loading, setLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const AddToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(()=>{
                setOpenSuccess(true);
            })
            .catch((err)=>{
                setOpenError(true);
                console.log(err);
            })
            .finally(()=>{
                setLoading(false);
            });
    };

    return(
        <Box>
            <Snackbar
                anchorOrigin={{ horizontal:'center', vertical:'top',}}
                autoHideDuration = {2000}
                onClose={()=>{setOpenError(false)}}
                open={openError}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                   Facing error, plz try again latter.
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ horizontal:'center', vertical:'top',}}
                autoHideDuration = {2000}
                onClose={()=>{setOpenSuccess(false)}}
                open={openSuccess}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Added this item into Ur cart!
                </Alert>
            </Snackbar>
            <LoadingButton
                disabled={loading}
                loading={loading}
                size="small"
                onClick={AddToCart}
                loadingIndicator="Adding..."
            >
            <Typography noWrap>
                ADD TO CART
            </Typography>
            </LoadingButton>
        </Box>
    )
};

class FoodList extends Component {
    state = {
        curRest:'',
        restaurants:[],
        menuItems:[],
        openError: false,
        openRests: false,
        openItems: false,
        loading:false
    }

    componentDidMount() {
        // set loading to ture
        getRestaurants()
            .then((data)=>{
                this.setState({restaurants: data});
                this.setState({openRests: true});
                console.log("Get restaurants successfully!");
            })
            .catch((err)=>{
                this.setState({openError: true});
                console.log(err);
            })
            .finally(()=>{
                // set loading to false
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // set loading to true
        if(this.state.curRest !== prevState.curRest) {
            getMenus(this.state.curRest)
                .then((data) => {
                    this.setState({menuItems: data});
                    this.setState({openItems: true});
                    console.log("Get corresponding menu successfully!");
                })
                .catch((err)=>{
                    this.setState({openError: true});
                    console.log(err);
                })
                .finally(()=>{
                    //set loading to false
                    this.setState({loading: false});
                });
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Snackbar
                        anchorOrigin={{ horizontal:'center', vertical:'top',}}
                        autoHideDuration = {2000}
                        onClose={()=>{this.setState({openError:false})}}
                        open={this.state.openError}

                    >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Facing Error! Wait a min
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        anchorOrigin={{ horizontal:'center', vertical:'top',}}
                        autoHideDuration = {2000}
                        open={this.state.openRests}
                        onClose={()=>{this.setState({openRests:false})}}
                    >
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Get the Restaurants for U!
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        anchorOrigin={{ horizontal:'center', vertical:'top',}}
                        autoHideDuration = {2000}
                        open={this.state.openItems}
                        onClose={()=>{this.setState({openItems:false})}}
                    >
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Here is the Menu for U!
                        </Alert>
                    </Snackbar>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={this.state.loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Container>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Restaurants</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={this.state.curRest}
                        onChange={(value) => {
                            // console.log(value);
                            this.setState({curRest:value.target.value});
                            this.setState({loading:true})
                        }
                        }
                        input={<OutlinedInput label="Restaurants" />}
                        MenuProps={MenuProps}
                    >
                        <MenuItem disabled value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            this.state.restaurants.map((item) => (
                            <MenuItem
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Container sx={{ py: 8}} maxWidth='1450px' >
                    <Grid container spacing={2}>
                        {this.state.menuItems.map((item) => (
                            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card
                                    variant="outlined"
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image={item.imageUrl}
                                        alt={item.name}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                        <Typography>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    {/*<Divider />*/}
                                    <Container sx={{display: "flex",  alignItems: "center", justifyContent: "space-between"}}>
                                        <Typography noWrap>
                                            {`Price: $${item.price}`}
                                            {/*$后不能有空格*/}
                                        </Typography>
                                        <CardActions>
                                            <AddToCartButton itemId={item.id} />
                                        </CardActions>
                                    </Container>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        );
    }


}

export default FoodList;