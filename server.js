const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userModel = require('./models/userModel')
const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/studentDb')
    .then(() => {
        console.log('database cennected');
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.json())


app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const hashedpwd = await bcrypt.hash(password, 10)
    const user = await userModel.create({ username, password: hashedpwd })
    res.send(user)
})
app.post('/login', async (req, res) => {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
        return res.json('User not found');
    }

    const checkpwd = await bcrypt.compare(req.body.password, user.password);
    if (!checkpwd) {
        return res.json('Invalid password');
    }

    res.json(user);
});
app.listen(3000, () => {
    console.log('server is live');
})