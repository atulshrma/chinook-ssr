import Controllers from './controllers';

export default function () {
    this.get('/tracks', async (req, res) => {
        const { tracks, totalPages, hasNext } = await Controllers.List(req);
        res.json({ tracks, totalPages, hasNext });
    });

    this.post('/tracks', async (req, res) => {
        const { success, errMessage } = await Controllers.Create(req);
        if (!success) {
            return res.status(400).json({ success, errMessage });
        }
        return res.json({ success, errMessage });
    });

    this.get('/tracks/new', async (req, res) => {
        const { genres } = await Controllers.New(req);

        res.json({ genres });
    });
}
