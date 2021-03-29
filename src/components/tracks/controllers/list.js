import { getConnection } from '../../../db';

export default async function (req) {
    const { page = 1 } = req.query;

    const conn = await getConnection();

    const limit = 21;
    const offset = (page - 1) * limit;
    const query = `
        SELECT "Track"."AlbumId", "Track"."GenreId", "Track"."TrackId", "Track"."Name" as "Name",
        "Track"."Composer" as "Composer", "Album"."Title" as "Album", "Genre"."Name" as "Genre"
        FROM "Track"
        LEFT JOIN "Album" ON "Track"."AlbumId" = "Album"."AlbumId"
        LEFT JOIN "Genre" ON "Track"."GenreId" = "Genre"."GenreId"
        LIMIT $1 OFFSET $2;
    `;

    const data = await conn.query(query, [limit, offset]);

    const countQuery = `SELECT COUNT(*) FROM "Track";`;
    const count = (await conn.query(countQuery)).rows[0].count;

    return { tracks: (data.rows || []).slice(0,20), totalPages: parseInt(count) / 20, hasNext: (data.rows || []).length > 20 };
}
