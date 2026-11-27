import { siFirebase, siGooglecloud, siMongodb, siMysql, siPostgresql, siRedis, siSqlite, siUnity, type SimpleIcon } from 'simple-icons'

export const LOGOS: Record<string, SimpleIcon> = {
  MongoDB: siMongodb,
  Firestore: siFirebase,
  Firebase: siFirebase,
  'Cloud Datastore': siGooglecloud,
  Redis: siRedis,
  SQLite: siSqlite,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  Unity: siUnity,
}
