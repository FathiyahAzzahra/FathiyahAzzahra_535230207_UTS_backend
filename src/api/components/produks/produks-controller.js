const produksService = require('./produks-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getProduks(request, response, next) {
  try {
    const produks = await produksService.getProduks();
    return response.status(200).json({
      data: produks,
    });
  } catch (error) {
    return next(error);
  }
}

async function getProduk(request, response, next) {
  try {
    const produk = await produksService.getProduk(request.params.id);

    if (!produk) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown produk');
    }

    return response.status(200).json(produk);
  } catch (error) {
    return next(error);
  }
}

async function createProduk(request, response, next) {
  try {
    const { nama_produk, deskripsi, harga, quantity, kategori } = request.body;
    const newProduk = await produksService.createProduk(
      nama_produk,
      deskripsi,
      harga,
      quantity,
      kategori
    );

    return response.status(201).json(newProduk);
  } catch (error) {
    return next(error);
  }
}

async function updateProduk(request, response, next) {
  try {
    const { id } = request.params;
    const { nama_produk, deskripsi, harga, quantity, kategori } = request.body;
    const updatedProduk = await produksService.updateProduk(
      id,
      nama_produk,
      deskripsi,
      harga,
      quantity,
      kategori
    );
    return response.status(200).json({ message: 'Produk updated' });
  } catch (error) {
    return next(error);
  }
}

async function deleteProduk(request, response, next) {
  const produkId = request.params.id;

  try {
    await produksService.deleteProduk(produkId);
    return response.status(200).json({ message: 'Produk deleted' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProduks,
  getProduk,
  createProduk,
  updateProduk,
  deleteProduk,
};
