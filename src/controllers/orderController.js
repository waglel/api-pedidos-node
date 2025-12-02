const Order = require("../models/Order");

// Criar pedido
async function createOrder(req, res) {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    if (!numeroPedido || !valorTotal || !dataCriacao || !items) {
      return res.status(400).json({ error: "Dados inválidos no body." });
    }

    // Mapping solicitado
    const mappedOrder = {
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: dataCriacao,
      items: items.map(item => ({
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };

    const newOrder = await Order.create(mappedOrder);

    return res.status(201).json(newOrder);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar pedido.", error });
  }
}

// Buscar por id
async function getOrderById(req, res) {
  try {
    const id = req.params.id;

    const order = await Order.findOne({ orderId: id });

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar pedido.",
      error
    });
  }
}

// Listar todos
async function listOrders(_, res) {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar pedidos.", error });
  }
}

// Atualizar pedido
async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const data = req.body;

    const updated = await Order.findOneAndUpdate(
      { orderId },
      data,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Pedido não encontrado." });

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar pedido.", error });
  }
}

// Deletar
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;

    const deleted = await Order.findOneAndDelete({ orderId });

    if (!deleted)
      return res.status(404).json({ error: "Pedido não encontrado." });

    return res.status(200).json({ message: "Pedido removido com sucesso!" });

  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar pedido.", error });
  }
}

// EXPORTAR TUDO CORRETAMENTE
module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
};
