'use strict';

const yelp = require('yelp-fusion');

module.exports = (temp) => searchBars(temp);

const searchBars = (temp) => {
  return new Promise((resolve, reject) => {
    const client = yelp.client(process.env.YELP_KEY);
    const promise = client.search({
      term:'bars',
      location: temp
    });
    promise.then((response) => {
      const res = response.jsonBody.businesses;
      resolve(res);
    });
  });
}
