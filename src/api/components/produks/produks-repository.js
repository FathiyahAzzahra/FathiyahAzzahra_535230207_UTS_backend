const { Produk } = require('../../../models');

async function getProduks() {
  return Produk.find({});
}

async function getProduk(id) {
  return Produk.findById(id);
}

async function createProduk(nama_produk, deskripsi, harga, quantity, kategori) {
  try {
    const newProduk = await Produk.create({
      nama_produk,
      deskripsi,
      harga,
      quantity,
      kategori,
    });
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
  try {
    const updatedProduk = await Produk.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          nama_produk,
          deskripsi,
          harga,
          quantity,
          kategori,
        },
      },
      { new: true }
    );
    return updatedProduk;
  } catch (error) {
    throw new Error('Failed to update product');
  }
}

async function deleteProduk(id) {
  const deleteProduk = await Produk.findByIdAndDelete(id);
  if (!deleteProduk) {
    throw new Error(`Produk not found with id ${id}`);
  }
}

module.exports = {
  getProduks,
  getProduk,
  createProduk,
  updateProduk,
  deleteProduk,
};
