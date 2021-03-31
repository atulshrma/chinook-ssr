import { getConnection } from '../../../db';

export default async function (req) {
    const { page = 1, pageSize = 20 } = req.query;

    const conn = await getConnection();

    const limit = parseInt(pageSize, 10);
    const offset = Math.max(0, parseInt(page, 10) - 1) * limit;

    const query = `
        SELECT "Name" as "name", "Composer" as "composer", "Album" as "album", "Genre" as "genre" FROM (
            SELECT "Track"."AlbumId", "Track"."GenreId", "Track"."TrackId", "Track"."Name" as "Name",
            "Track"."Composer" as "Composer", "Album"."Title" as "Album", "Genre"."Name" as "Genre"
            FROM "Track"
            LEFT JOIN "Album" ON "Track"."AlbumId" = "Album"."AlbumId"
            LEFT JOIN "Genre" ON "Track"."GenreId" = "Genre"."GenreId"
            ORDER BY "Track"."TrackId" DESC
            LIMIT $1 OFFSET $2
        ) AS "Tracks";
    `;

    const data = await conn.query(query, [limit, offset]);

    const countQuery = `SELECT COUNT("TrackId") FROM "Track";`;
    const count = (await conn.query(countQuery)).rows[0].count;

    return { tracks: (data.rows || []).slice(0,limit), totalPages: Math.ceil(parseInt(count) / limit) };
}
