const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

bookRouter.route('/')
  .get((req, res) => {
    res.render('books');
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hello single book');
  });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('index',
    {
      title: 'Library',
      nav: [{ link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }]
    });
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`);
});
