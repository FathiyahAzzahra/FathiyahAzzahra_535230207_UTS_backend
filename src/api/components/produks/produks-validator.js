const joi = require('joi');

module.exports = {
  createProduk: {
    body: {
      nama_produk: joi.string().min(1).max(100).required().label('Nama Produk'),
      deskripsi: joi.string().min(1).max(100).required().label('Deskripsi'),
      harga: joi.number().required().label('Harga'),
      quantity: joi.number().required().label('Quantity'),
      kategori: joi.string().min(1).max(100).required().label('Kategori'),
    },
  },

  updateProduk: {
    body: {
      nama_produk: joi.string().min(1).max(100).required().label('Nama Produk'),
      deskripsi: joi.string().min(1).max(100).required().label('Deskripsi'),
      harga: joi.number().required().label('Harga'),
      quantity: joi.number().required().label('Quantity'),
      kategori: joi.string().min(1).max(100).required().label('Kategori'),
    },
  },
};
