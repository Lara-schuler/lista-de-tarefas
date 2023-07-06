//const dbMysql = require('./mysql').DbMysql;
const { dbMysql: DbMysql } = require('./mysql');

class Tarefa {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  save() {
    const dbMysql = require('./mysql').DbMysql;
    let db = new DbMysql();

    const sql = `INSERT INTO tarefa (titulo, descricao) VALUES ('${this.title}', '${this.description}')`;

    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
          //console.log(results)
        }
      });
    });
  }

  static getAll() {
    const dbMysql = require('./mysql').DbMysql;
    let db = new DbMysql();
    return db.query(`SELECT * FROM tarefa`);
  }

  static update(id, title, description) {
    const dbMysql = require('./mysql').DbMysql;
    let db = new DbMysql();
    const sql = `UPDATE tarefa SET titulo = '${title}', descricao = '${description}' WHERE id = ${id}`;

    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static delete(id) {
    const dbMysql = require('./mysql').DbMysql;
    let db = new DbMysql();
    return db.query(`DELETE FROM tarefa WHERE id = ${id}`);
  }

}
module.exports = Tarefa;
