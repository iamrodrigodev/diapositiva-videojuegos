import { siApachecassandra, siApachehbase, siFirebase, siGooglecloud, siMongodb, siMysql, siNeo4j, siPostgresql, siRedis, siSqlite, siUnity, type SimpleIcon } from 'simple-icons'

export const LOGOS: Record<string, SimpleIcon> = {
  MongoDB: siMongodb,
  Firestore: siFirebase,
  Firebase: siFirebase,
  'Cloud Datastore': siGooglecloud,
  Redis: siRedis,
  Cassandra: siApachecassandra,
  HBase: siApachehbase,
  Neo4j: siNeo4j,
  SQLite: siSqlite,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  Unity: siUnity,
}
