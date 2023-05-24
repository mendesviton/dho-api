// import mysql, { Connection, FieldPacket } from "mysql";

// interface QueryResult<T> {
//   results: T[];
//   fields: FieldPacket[];
// }

// export default class MySQLConnection {
//   public connection: Connection;

//   constructor(private config: mysql.ConnectionConfig) {}

//   public connect(): void {
//     this.connection = awqaimysql.createConnection(this.config);
//     this.connection.connect((error) => {
//       if (error) {
//         console.error("Error connecting to MySQL database:", error);
//         throw error;
//       }
//       console.log("Connected to MySQL database");
//     });
//   }

//   public disconnect(): void {
//     if (this.connection) {
//       this.connection.end();
//       console.log("Disconnected from MySQL database");
//     }
//   }
// }
