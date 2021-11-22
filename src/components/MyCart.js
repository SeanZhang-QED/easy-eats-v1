import React, {useEffect, useState} from 'react';
import {
    Drawer,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    Box, Container, Alert, Snackbar
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import {addItemToCart, checkout, getCart, minusItem, removeItem} from "../utils";
import Typography from "@mui/material/Typography";
import {LoadingButton} from "@mui/lab";




function MyCart(props) {
    const [open, setOpen] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [checkLoading, setCheckLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [disable, setDisable] = useState(false);

    const RemoveButton = ({itemId} ) => {

        const RemoveFromCart = () => {
            setDisable(true);
            removeItem(itemId)
                .then(()=>{
                    getCart()
                        .then((data)=>{
                            setOrderItems(data.orderItemList);
                            setTotalPrice(data.totalPrice.toFixed(2));
                        })
                        .catch((err)=>{
                            console.log(err);
                            setOpenError(true);
                            // add a Alert here
                        })
                })
                .catch((err)=>{
                    setOpenError(true);
                    console.log(err);
                })
                .finally(()=>{
                    // set loading
                    setDisable(false);
                });
        };
        return(
            <Box>
                <IconButton
                    color="primary"
                    onClick={RemoveFromCart}
                    disabled={checkLoading || disable}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>

        );
    };

    const MinusButton = ({itemId} ) => {
        const minusOneFromCart = () => {
            setDisable(true);
            minusItem(itemId)
                .then(()=>{
                    getCart()
                        .then((data)=>{
                            setOrderItems(data.orderItemList);
                            setTotalPrice(data.totalPrice.toFixed(2))
                        })
                        .catch((err)=>{
                            console.log(err);
                            setOpenError(true);
                        })
                })
                .catch((err)=>{
                    setOpenError(true);
                    console.log(err);
                })
                .finally(()=>{
                    // set loading
                    setDisable(false);
                });
        };
        return(
            <Box>
                <IconButton
                    color="primary"
                    onClick={minusOneFromCart}
                    disabled={checkLoading || disable}
                >
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Box>
        );
    };

    const AddButton = ({itemId} ) => {
        const AddOneFromCart = () => {
            setDisable(true);
            addItemToCart(itemId)
                .then(()=>{
                    getCart()
                        .then((data)=>{
                            setOrderItems(data.orderItemList);
                            setTotalPrice(data.totalPrice.toFixed(2))
                        })
                        .catch((err)=>{
                            console.log(err);
                            setOpenError(true);
                        })
                })
                .catch((err)=>{
                    setOpenError(true);
                    console.log(err);
                })
                .finally(()=>{
                    // set loading
                    setDisable(false);
                });
        };
        return(
            <Box>
                <IconButton
                    color="primary"
                    onClick={AddOneFromCart}
                    disabled={checkLoading || disable}
                >
                    <AddCircleOutlineIcon />
                </IconButton>
            </Box>
        );
    };

    useEffect(()=>{
        if (!open) {
            return;
        }

        getCart()
            .then((data)=>{
                setOrderItems(data.orderItemList);
                setTotalPrice(data.totalPrice.toFixed(2))
            })
            .catch((err)=>{
                console.log(err);
                setOpenError(true);
                // add a Alert here
            })
            .finally(()=>{
                })
    }, [open]);

    // not a function but a var!
    const OnCheckOut = () => {
        setCheckLoading(true);
        checkout()
            .then(()=>{
                setOpenSuccess(true);
                setOpen(false);
            })
            .catch((err)=>{
                console.log(err);
                setOpenError(true);
            })
            .finally(()=>{
               setCheckLoading(false);
            });
    };

    return (
        <Box>
            <Snackbar
                anchorOrigin={{ horizontal:'center', vertical:'top',}}
                autoHideDuration = {2000}
                open={openError}
                onClose={()=>setOpenError(false)}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Facing Error, try again later!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ horizontal:'center', vertical:'top',}}
                autoHideDuration = {2000}
                open={openSuccess}
                onClose={()=>setOpenSuccess(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Done! Enjoy Ur food!
                </Alert>
            </Snackbar>
            <IconButton
                color="inherit"
                edge="end"
                onClick={()=>setOpen((prev) => !prev)}
            >
                <ShoppingCartIcon />
            </IconButton>
            <Drawer
                width='400px'
                open={open}
                anchor={'right'}
                sx={{
                    height: "calc(100vh - 50px - 64px - 163px)",
                    overflowY: "auto",
                }}
            >
                <Box height='64px' width='400px' sx={{ bgcolor: 'primary.main', display: 'flex', alignItems: "center", textAlign: 'center'}}>
                    <IconButton  sx={{ color: '#FFFFFF', ml: 1, pr: 0 }} edge="start" onClick={()=>{setOpen(false)}}>
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography variant="h6" color={"#FFFFFF"} noWrap sx={{ flex: 1 }}>
                        Cart
                    </Typography>
                </Box>
                <Divider />
                { orderItems.length === 0
                    ?
                    <Typography variant="h6" textAlign="center" mt={1} pl={"40px"}>
                        Ur Cart is Empty.
                    </Typography>
                    :
                    <List>
                        {/*{console.log(orderItems)}*/}
                        {orderItems.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemText primary={item.menuItem.name} secondary={`$${item.price.toFixed(2)} for ${item.quantity}`}/>
                                <AddButton itemId={item.menuItem.id}/>
                                <MinusButton itemId={item.id}/>
                                <RemoveButton itemId={item.id}/>
                            </ListItem>
                        ))
                        }
                    </List>
                }
                <Box sx={{
                     bgcolor: 'background.paper',
                     position: 'fixed', bottom: 0, height: '64px', width: '400px',
                     display: "flex", flexDirection: "column", justifyContent:"space-evenly"
                     }}
                     component="footer"
                >
                    <Divider />
                    <Container sx={{display: "flex",  alignItems: "center", justifyContent: "space-between"}}>
                        <Typography >
                            {`Total Price: $${totalPrice}`}
                            {/*$后不能有空格*/}
                        </Typography>
                        <LoadingButton
                            disabled={checkLoading || disable}
                            loading={checkLoading}
                            variant="contained"
                            onClick={OnCheckOut}
                        >
                            CHECK OUT
                        </LoadingButton>
                    </Container>
                </Box>
            </Drawer>
        </Box>
    );
}

export default MyCart;