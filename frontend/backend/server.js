


const fs = require('fs');
const util = require('util');
const express = require('express');
const axios = require('axios');
const config = require('./server-config.json');


app.use(config.PORT, () => {
    console.log(`Server started on port:${config.PORT}`);
})


// 決められたバケットに保存する
app.post('/api/fileupload', async (req, res) => {
    try {
        const 
    }
})