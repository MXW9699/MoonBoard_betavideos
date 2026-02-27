require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * SQL database layer (replaces Supabase).
 * Controllers use these methods; each returns a promise that resolves to
 * { data } for selects (to match previous Supabase response shape) or just resolves for writes.
 */

const db = {
  // --- Videos ---
  getVideosByName(problemName) {
    return pool
      .query('SELECT * FROM "videos" WHERE "problemId" = $1', [problemName])
      .then((res) => ({ data: res.rows }));
  },

  getVideosByUser(userId) {
    const id = Number(userId);
    return pool
      .query(
        `SELECT v.*, p.grade
         FROM "videos" v
         LEFT JOIN "Problems_2019" p ON v."problemId" = p.name
         WHERE v.uploadedById = $1`,
        [id],
      )
      .then((res) => ({
        data: res.rows.map((row) => {
          const { grade, ...video } = row;
          return { ...video, Problems_2019: grade != null ? { grade } : null };
        }),
      }));
  },

  updateVideo(problemName, uploadedBy, payload) {
    return pool.query(
      `UPDATE "videos" SET link = $1, video = $2, img = $3
       WHERE "problemId" = $4 AND uploaded_by = $5`,
      [
        payload.link,
        payload.video,
        payload.img,
        problemName.toUpperCase(),
        uploadedBy,
      ],
    );
  },

  addVideo(row) {
    return pool
      .query(
        `INSERT INTO "videos" (uploaded_by, "problemId", link, video, img)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [row.uploaded_by, row.problemId, row.link, row.video, row.img],
      )
      .then((res) => ({ data: res.rows }));
  },

  deleteVideos(problemName, uploadedBy) {
    return pool.query(
      'DELETE FROM "videos" WHERE "problemId" = $1 AND uploaded_by = $2',
      [problemName, uploadedBy],
    );
  },

  // --- Problems_2019 ---
  getProblemsList(search = "") {
    const pattern = `%${search}%`;
    return pool
      .query(`SELECT * FROM "problems" WHERE name ILIKE $1 ORDER BY name ASC`, [
        pattern,
      ])
      .then((res) => ({ data: res.rows }));
  },

  // --- Problems (holds) ---
  updateHolds(id, holds) {
    return pool.query('UPDATE "problems" SET holds = $1 WHERE id = $2', [
      JSON.stringify(holds),
      id,
    ]);
  },

  // --- Users ---
  addUser(row) {
    return pool
      .query(
        `INSERT INTO "users" (username, "firstName", "lastName") VALUES ($1, $2, $3) RETURNING *`,
        [row.username, row.firstName, row.lastName],
      )
      .then((res) => ({ data: res.rows }));
  },
};

module.exports = db;
