import { getConnection } from '../../../db';

export default async function (req) {
    const conn = await getConnection();
    const query = `SELECT "GenreId" as "id", "Name" as "name" FROM "Genre";`;

    const data = await conn.query(query);

    return { genres: data.rows };
}
