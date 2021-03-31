import { getConnection } from '../../../db';

export default async function (req) {
    const { track = {} } = req.body;

    const { trackName, genreId } = track;

    if (!/[\w!,'"\. ]{1,50}/.test(trackName)) {
        return { success: false, errMessage: 'The track name should be alphanumeric with max length 50.' };
    }

    if (!genreId) {
        return { success: false, errMessage: 'Track genre is required' };
    }

    const gId = parseInt(genreId, 10);

    if (!gId) {
        return { success: false, errMessage: 'Invalid genre id provided' };
    }

    const conn = await getConnection();

    const checkGenreQuery = `
        SELECT COUNT("GenreId") FROM "Genre" WHERE "GenreId" = $1;
    `;

    try {

        const genre = await conn.query(checkGenreQuery, [gId]);

        if (!(genre.rows[0] && genre.rows[0].count)) {
            return { success: false, errMessage: 'Invalid genre id provided' };
        }

        // Setting some fields to a default value
        const insertQuery = `
            INSERT INTO "Track"("Name", "GenreId", "MediaTypeId", "Milliseconds", "UnitPrice", "Composer")
            VALUES ($1, $2, 1, 1, 1, 'Dummy');
        `;

        const res = await conn.query(insertQuery, [trackName, gId])

        return { success: true };
    } catch(err) {
        return { success: false, errMessage: err };
    }
}
