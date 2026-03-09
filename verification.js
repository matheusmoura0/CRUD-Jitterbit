const { mapPortugueseToEnglish } = require('./src/utils/mapper');

const testPayload = {
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
};

console.log('Testing Data Transformation...');
const mapped = mapPortugueseToEnglish(testPayload);

console.log('Mapped Result:', JSON.stringify(mapped, null, 2));

const expected = {
  orderId: "v10089015vdb-01",
  value: 10000,
  creationDate: new Date("2023-07-19T12:24:11.529Z"),
  items: [
    {
      productId: 2434,
      quantity: 1,
      price: 1000
    }
  ]
};

// Simple validation
const success = 
  mapped.orderId === expected.orderId &&
  mapped.value === expected.value &&
  mapped.items[0].productId === expected.items[0].productId &&
  mapped.items[0].quantity === expected.items[0].quantity &&
  mapped.items[0].price === expected.items[0].price;

if (success) {
  console.log('✅ Transformation test passed!');
} else {
  console.log('❌ Transformation test failed!');
  process.exit(1);
}
