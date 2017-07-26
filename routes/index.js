const express = require('express');
const router = express.Router();
const getParticipents = require('../repo/participents');
const getSimchas = require('../repo/simchas');
const getParticipentsHistory = require('../repo/participents-history');
const knex = require('../repo/config');

router.get('/', (req, res) => {
    //res.json('hello world');
    getParticipents().then(dataParticipents => {
        getSimchas().then(dataSimchas => {
            getParticipentsHistory().then(dataParticipentsHistory => {
                res.render('index', {
                    pageTitle: 'Home',
                    participents: dataParticipents,
                    simchas: dataSimchas,
                    history: dataParticipentsHistory
                });
            });
        });
    });
});

router.post('/addParticipent', (req, res) => {
    let name = req.body.name;
    let sum = req.body.sum;
    knex('participents').insert({ name: name, sum: sum }).then(function() {});
    res.redirect('/');
});

router.post('/addSimcha', (req, res) => {
    let name = req.body.name;
    let type = req.body.type;
    let amount = req.body.amount;
    knex('simchas').insert({ name: name, type: type, amount: amount }).then(function() {});
    res.redirect('/');
});

router.post('/editParticipent', (req, res) => {
    let id = req.body.id;
    let sum = req.body.sum;
    knex('participents').where('id', id).update({sum: knex.raw('?? +' + sum, ['sum']) }).then(function() {});
    res.redirect('/');
});

router.post('/editSimcha', (req, res) => {
    let id = req.body.id;
    let sum = req.body.sum;
    knex('simchas').where('id', id).update({amount: knex.raw('?? +' + sum, ['amount']) }).then(function() {});
    res.redirect('/');
});

router.post('/submitMoneyToSimcha', (req, res) => {
    console.log(req.body.id + ' ' + req.body.participentId + ' ' + req.body.simchaId + ' ' + req.body.amount);
    let participentId = req.body.participentId;
    let simchaId = req.body.simchaId;
    let amount = req.body.amount;
    let date = new Date().toLocaleDateString();
    knex('simchas').where('id', simchaId).update({ amount: knex.raw('?? +' + amount, ['amount']) }).then(function() {
        knex('participents').where('id', participentId).update({ sum: knex.raw('?? -' + amount, ['sum']) }).then(function() {
            knex('participents-history').insert({ participentId: participentId, simchaId: simchaId, amount: amount, date: date }).then(function() {

            });
        });
    });
    res.redirect('/');
});

module.exports = router;