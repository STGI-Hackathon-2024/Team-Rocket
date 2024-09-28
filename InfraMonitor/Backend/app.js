import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.post('/login', (req, res) =>{
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

