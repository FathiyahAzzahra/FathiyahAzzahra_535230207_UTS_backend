const produksRepository = require('./produks-repository');
const { Produk } = require('../../../models');

async function getProduks() {
  try {
    const produks = await Produk.find({});
    return produks;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

async function getProduk(id) {
  try {
    const produk = await Product.findById(id);
    return produk;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
}

async function createProduk(nama_produk, deskripsi, harga, quantity, kategori) {
  try {
    const newProduk = await produksRepository.createProduk(
      nama_produk,
      deskripsi,
      harga,
      quantity,
      kategori
    );
    return newProduk;
  } catch (err) {
    throw new Error('Failed to create product');
  }
}

async function updateProduk(
  id,
  nama_produk,
  deskripsi,
  harga,
  quantity,
  kategori
) {
  const produk = await produksRepository.getProduk(id);
  if (!produk) {
    throw new Error('Product not found');
  }

  try {
    const updatedProduk = await produksRepository.updateProduk(
      id,
      nama_produk,
      deskripsi,
      harga,
      quantity,
      kategori
    );
    return updatedProduk;
  } catch (error) {
    throw new Error('Failed to update product');
  }
}

async function deleteProduk(id) {
  await produksRepository.deleteProduk(id);
}

module.exports = {
  getProduks,
  getProduk,
  createProduk,
  updateProduk,
  deleteProduk,
};
