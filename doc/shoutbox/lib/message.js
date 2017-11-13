const express = require('express');
const res = express.session; //add method on express response prototype

res.message = (msg ,type = 'info') => {
  let sess = this.req.session;
  sess.message = sess.message || [];
  sess.message.push({
    type,
    string: msg
  });
};