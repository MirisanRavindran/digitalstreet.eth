const express = require('express');
const app = express();

const axios = require('axios');

app.get('/eth-price', async (req, res) => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const price = response.data.ethereum.usd;
      res.send(price.toString());
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  

app.get('/nft-floor-price/:collectionSlug', async (req, res) => {
    try {
      const collectionSlug = req.params.collectionSlug;
      const response = await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&collection=${collectionSlug}`);
      const floorPrice = response.data.assets[0].sell_orders[0].current_price;
      res.send(floorPrice.toString());
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  
  const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

