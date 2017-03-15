// import express from 'express'
// import React from 'react'
// import ReactDOMServer from 'react-dom/server'
// import Counter from './components/Counter'

const ReactDOMServer = require('react-dom/server')
const Counter = require("./components/Counter")
const express = require("express");
const React = require("react");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const adder = require('./addSerchWords.js');
const coDB = require('./connectionDB');
const dt = new Date();

require('dotenv').config();
require('date-utils');
// init express
const app = express()
app.use(express.static('public'))
// add top page routing
app.get('/', (req, res) => {
  res.send(
    ReactDOMServer.renderToString(
      ```
      <div>
        <div id="app">
          <Counter />
        </div>
        <script src="client.js" />
      </div>
      ```
    )
  )
})

// start listen
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})
