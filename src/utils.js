import axios from "axios";
// login API
// receiving username and password, and return
// first export the function
export const login = credential => {
    // 前后端数据通讯需要的 request opt: method, url, data

    // 0. 接受并解构输入的用户名和密码
    // credential:{username: value,password: value }
    // 1. build url using the credential (data received from the frontend)
    // const loginUrl = `/login?username=${username}&password=${password}`;
    const loginUrl = `/login?username=${credential.get('username')}&password=${credential.get('password')}`;

    // 2.fetch: retrieve data form the backend
    const opt = {
        method: "POST",
        url: loginUrl,
        data: {
            username: credential.get('username'),
            password: credential.get('password')
        },
        headers: { "Content-Type": "application/json" }
    };
    return axios(opt)
        .then((res) =>
        {
        // case 1: login successfully
        // case 2: login failed
        if (res.status < 200 || res.status >= 300) {
            throw Error("Fail to log in");
        }
    });
};

// getRestaurants API
export const getRestaurants = () => {
    return axios.get(`/restaurants`, { responseType: 'json' }).then(response => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get menus");
        }
        // console.log("get the rests data successfully.")
        // console.log( response.data );
        return response.data;
    });
};

// getMenus API
export const getMenus = (restId) => {
    return axios.get(`/restaurant/${restId}/menu`).then(res=>{
        if (res.status < 200 || res.status >= 300) {
            throw Error("Fail to get menus");
        }
        // console.log(res.data);
        return res.data;
    })
};

// addItemToCart API
export const addItemToCart = (itemId) => {
    const addItemUrl = `/order/${itemId}`;
    const opt ={
        method: "POST",
        url: addItemUrl,
        headers: {
            "Content-Type": "application/json",
        }
    };
    return  axios(opt).then(res=>{
        if (res.status < 200 || res.status >= 300) {
            throw Error("Fail to add menu item to shopping cart");
        }
    });

};

// fetch Cart via getCart API
export const getCart = () => {
    return axios.get("/cart").then((res) => {
        if (res.status < 200 || res.status >= 300) {
            throw Error("Fail to get shopping cart data");
        }

        return res.data;
    });
};

// inform the serve it is going to check out
export const checkout = () => {
    return axios.get("/checkout").then((res) => {
        if (res.status < 200 || res.status >= 300) {
            throw Error("Fail to checkout");
        }
    });
};

export const removeItem = (itemId) => {
    // console.log(itemId);
    return axios.get(`/cart/${itemId}`).then((res) => {
        if (res.status < 200 || res.status >= 300) {
            throw Error("Fail to remove the cart Item");
        }
    });
};

export const minusItem = (itemId) => {
    // console.log(itemId);
    return axios.get(`/cart/${itemId}/minus`).then((res) => {
        if (res.status < 200 || res.status >= 300) {
            throw Error("Fail to minus one regrading this cart Item");
        }
    });
};

export const signup = (data) => {
    const signupUrl = "/signup";

    const opt ={
        method: "POST",
        url: signupUrl,
        headers: {
            "Content-Type": "application/json",
        },
        // in fetch() is body, in axios is data
        data: JSON.stringify(data),
    };

    console.log(data);

    return axios(opt).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to sign up");
        }
    });
};