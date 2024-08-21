const express = require('express');
const { db, checkUser } = require('./db/db');
const signup = require('./components/signup');

const app = express();
app.use(express.json());
const port = 2612;


app.post('/api/signup', async (req, res) => {
    const { username, name, email, password } = req.body;
    if(!username || !name || !email || !password) {
        res.status(400).send('Invalid input');
        return;
    }
    const duplicateCheck = await checkUser(username, email);
    if(duplicateCheck) {
        res.status(400).send('User already exists');
        return;
    }

    const status = await signup({ username, name, email, password });
    
    if(status){
        res.status(200).send('User created');
    }
    else {
        res.status(500).send('Internal server error');
    }

})

app.post('/api/checkUser', async (req, res) => {
    const { username, email } = req.body;
    if(!username || !email) {
        res.status(400).send('Invalid input');
        return;
    }
    const status = await checkUser(username, email);
    if(!status){
        res.status(200).send('User does not exist');
    }
    else {
        res.status(400).send('User exists');
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})