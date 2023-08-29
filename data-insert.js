const dataInsert = () => {
  let arr = [];
  for (let i = 2; i < 24; i++) {
    arr.push(i);
  }

  let arr2 = [1, 2, 3, 4, 5, 6, 7];

  let insert = [];

  for (let j = 0; j < arr.length; j++) {
    for (let k = 0; k < arr2.length; k++) {
      insert.push(
        `insert into bid_product_size(product_id,size_id) values(${arr[j]},${arr2[k]});`
      );
    }
  }

  return insert;
};

const mysql = require('mysql2/promise');

async function insertData() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    const insertQueries = dataInsert(); // dataInsert 함수 호출
    for (const query of insertQueries) {
      await connection.execute(query); // 쿼리 실행
    }
    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    connection.end();
  }
}

insertData();
