const express = require('express');
// const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const app = express();

app.set('view engine', 'nunjucks');
nunjucks.configure('./views', {
	autoescape: false,
	express: app
});
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('dashboard.html');
})
app.get('/dashboard', function (req, res) {
    res.render('dashboard.html');
})
app.get('/payment_links', function (req, res) {
    res.render('payment_links.html');
})
app.get('/manage_cdp', function (req, res) {
    res.render('manage_cdp.html');
})
app.get('/settings', function (req, res) {
    res.render('settings.html');
})
app.get('/payments', function (req, res) {
    res.render('transaction.html');
})

app.listen(3030, function () {
  console.log('Dapp started on port 3030!')
})