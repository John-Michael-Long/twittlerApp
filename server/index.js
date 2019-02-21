const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const io = require('socket.io').listen(server);


const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static(__dirname + '/../public')); 

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/src/index.html'));
})

app.get('/app.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/src/app.js'));
})

io.on('connection', function(socket){
  console.log('a user connected!')

  socket.on('new-client-msg', function(msg){
    console.log('message: ', msg)

    io.emit('new-server-msg', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   if (req.method === 'OPTIONS') {
//     res.header(
//       'Access-Control-Allow-Mehods',
//       'GET, POST, PUT, PATCH, DELETE'
//     );
//     return res.status(200).json({});
//   }
//   next();
// });




