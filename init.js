const mongoose = require('mongoose');
const Chat = require('./models/chat');

let allChat = [ {
  from : "Mohan" ,
  to : "ansh" ,
  msg : "hlo.. Ansh "  ,
  Create_at : new Date() ,
},
{
  from : "Mohan" ,
  to : "Kanchan" ,
  msg : "hlo.. Kanchan"  ,
  Create_at : new Date() ,
},{
  from : "Mohan" ,
  to : "Sandhya" ,
  msg : "hlo.. Sandhya "  ,
  Create_at : new Date() ,
},{
  from : "Mohan" ,
  to : "Prasun" ,
  msg : "hlo.. Prasun "  ,
  Create_at : new Date() ,
}]

Chat.insertMany(allChat); 