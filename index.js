const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Chat = require('./models/chat');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.json()); // Parses JSON payloads

const methodOverride = require("method-override");
app.use(methodOverride('_method')); // Middleware to support PUT and DELETE

main()
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Mohan');
}

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Home route
app.get('/', (req, res) => {
  console.log('Get request is working.');
  res.send('Get request is working.');
});

// Get all chats
app.get('/chats', async (req, res) => {
  let chats = await Chat.find();
  res.render('index', { chats });
});

// Form to create a new chat
app.get('/chats/new', (req, res) => {
  res.render('new');
});

// Add a new chat
app.post('/chats', async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from,
    to,
    msg,
    Create_at: new Date(),
  });
  console.log(newChat)
  await newChat.save();
  res.redirect('/chats'); // Redirect after saving
});


app.get("/chats/:id/edit" ,async(req , res) => {
  let {id} =  req.params ;
  let chat = await Chat.findById(id )
  res.render("edit.ejs" , {chat})
})

app.put("/chats/:id" ,async(req ,res) => {
  let {id} =  req.params ;
  let{msg} = req.body ;
  let newMsg = await Chat.findByIdAndUpdate(id,{msg},{new:true})
  console.log(newMsg)
  res.redirect("/chats")
})
app.delete("/chats/:id" ,async(req ,res) => {
  let {id} =  req.params ;
  let{msg} = req.body ;
  let delMsg = await Chat.findByIdAndDelete(id,{msg},{new:true}) ;
  console.log(delMsg)
  res.redirect("/chats")
})  