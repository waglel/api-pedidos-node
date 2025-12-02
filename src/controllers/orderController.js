const Order = require("../models/Order");

/* ============================================================
   1 — CREATE ORDER (POST /order)
   ============================================================ */
async function createOrder(req, res) {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // Validações básicas
    if (!numeroPedido || !valorTotal || !dataCriacao || !items) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items deve ser um array com pelo menos 1 item." });
    }

    // Mapping solicitado pelo desafio
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
    // Erro de chave duplicada (orderId)
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: "Já existe um pedido com esse número.",
        detalhes: error.keyValue 
      });
    }

    return res.status(500).json({ message: "Erro ao criar pedido.", error });
  }
}


/* ============================================================
   2 — GET ORDER BY ID (GET /order/:id)
   ============================================================ */
async function getOrderById(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório." });
    }

    const order = await Order.findOne({ orderId: id });

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    return res.status(200).json(order);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar pedido.", error });
  }
}


/* ============================================================
   3 — LIST ALL ORDERS (GET /order/list)
   ============================================================ */
async function listOrders(_, res) {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar pedidos.", error });
  }
}


/* ============================================================
   4 — UPDATE ORDER (PUT /order/:id)
   ============================================================ */
async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const { valorTotal, dataCriacao, items } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "ID é obrigatório." });
    }

    const mappedUpdate = {};

    if (valorTotal !== undefined) mappedUpdate.value = valorTotal;
    if (dataCriacao !== undefined) mappedUpdate.creationDate = dataCriacao;

    // Se enviou items, remapeia corretamente
    if (items !== undefined) {
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Items deve ser um array válido." });
      }

      mappedUpdate.items = items.map(item => ({
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }));
    }

    const updated = await Order.findOneAndUpdate(
      { orderId },
      mappedUpdate,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar pedido.", error });
  }
}


/* ============================================================
   5 — DELETE ORDER (DELETE /order/:id)
   ============================================================ */
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(400).json({ error: "ID é obrigatório." });
    }

    const deleted = await Order.findOneAndDelete({ orderId });

    if (!deleted) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    return res.status(200).json({ message: "Pedido removido com sucesso!" });

  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar pedido.", error });
  }
}


/* ============================================================
   EXPORTA TUDO
   ============================================================ */
module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
};
