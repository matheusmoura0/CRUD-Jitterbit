/**
 * Utility to map Portuguese incoming fields to English database fields.
 * 
 * Incoming JSON:
 * {
 *   "numeroPedido": "v10089015vdb-01",
 *   "valorTotal": 10000,
 *   "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
 *   "items": [
 *     {
 *       "idItem": "2434",
 *       "quantidadeItem": 1,
 *       "valorItem": 1000
 *     }
 *   ]
 * }
 * 
 * Mapped JSON:
 * {
 *   "orderId": "v10089015vdb-01",
 *   "value": 10000,
 *   "creationDate": "2023-07-19T12:24:11.529Z",
 *   "items": [
 *     {
 *       "productId": 2434,
 *       "quantity": 1,
 *       "price": 1000
 *     }
 *   ]
 * }
 */

const mapPortugueseToEnglish = (data) => {
  if (!data) return null;

  return {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: data.dataCriacao ? new Date(data.dataCriacao) : new Date(),
    items: (data.items || []).map(item => ({
      productId: Number(item.idItem),
      quantity: Number(item.quantidadeItem),
      price: Number(item.valorItem)
    }))
  };
};

module.exports = {
  mapPortugueseToEnglish
};
