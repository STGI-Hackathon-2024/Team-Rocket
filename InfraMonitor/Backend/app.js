import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

const connectDb = ()=>{
    mongoose.connect(process.env.URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
};


connectDb();

app.post('/login', (req, res) =>{
    
    if(!req.body.username || !req.body.password){
        res.status(400).send('Error. Please enter the correct username and password');
        return;
    }

    const username = req.body.username;
    const password = req.body.password;

    // using jwt for authentication
    const token = jwt.sign({username}, 'secretkey', { expiresIn: '1h' });

    res.json({
        message: 'Authentication successful!',
        token: token
    });
    }
);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);

