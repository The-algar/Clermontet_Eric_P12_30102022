export const getUserData = () => {
    fetch('http://localhost:3000/user/12/performance') 
    // Promise résolue serveur répond
        .then((resp) => resp.json()) 
        // Promise résolue: data chargée
        .then((data) => {
            console.log('data fetched :', data);
            return data;
        }) // Promise résolue: json vers obj JS
};
