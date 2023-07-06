const mysql = require('mysql2');
class DbMysql {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'database-1.cv4jjgveqhno.us-east-2.rds.amazonaws.com',
      user: 'admin',
      password: 'pacoquinha',
      database: 'TarefasBD'
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
      } else {
        console.log('Conexão bem-sucedida com o banco de dados');
      }
    });
  }


  query(sql){
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          //console.log(result)
        }
      })
    })
  }

  
}

module.exports =  { dbMysql: DbMysql }
