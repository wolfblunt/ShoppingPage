const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'dfs',       
  password: 'password',  
  database: 'shopping'  
});

function generateOrder(id) {
  const customerName = faker.person.fullName();
  const orderAmount = parseFloat(faker.commerce.price());
  const status = faker.helpers.arrayElement(['pending', 'processing', 'completed', 'cancelled']);
  
  const itemsCount = faker.number.int({ min: 1, max: 5 });
  const items = [];
  for (let i = 0; i < itemsCount; i++) {
    items.push({
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 5 }),
      price: parseFloat(faker.commerce.price())
    });
  }

  const itemsJson = JSON.stringify(items);
  const createdAt = faker.date.past(1).toISOString().slice(0, 19).replace('T', ' ');

  return [
    id,
    customerName,
    orderAmount,
    status,
    itemsJson,
    createdAt
  ];
}

function seedDatabase() {
  const totalRecords = 10000;
  let insertQuery = 'INSERT INTO orders (id, customerName, orderAmount, status, items, createdAt) VALUES ?';
  let values = [];

  for (let i = 2; i <= totalRecords; i++) {
    values.push(generateOrder(i));
  }

  connection.query(insertQuery, [values], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log(`${totalRecords} records inserted successfully.`);
    }
    connection.end();
  });
}

seedDatabase();