class Song {
    constructor(songsService) {
        this.songsService = songsService;
    }

    signRoutes(app) {

    }

    createSong(req, res, next) {
        try {
            const { name, year, album, composer_ids, performer_ids, genre_ids } = req.body;
            const composerIds = isArray(composer_ids) ? composer_ids : [composer_ids];
            const performerIds = isArray(performer_ids) ? performer_ids : [performer_ids];
            const genreIds = isArray(genre_ids) ? genre_ids : [genre_ids];
            const { file } = req.files;
            const fileName = generateSongFileName(name, year, album);
            const song = await this.songsService.createSong(name, year, album, composerIds, performerIds, genreIds, fileName);
            await uploadSongFile(fileName, file);
            await processSong(song, file.data.toString());
            return res.status(200).send(song);
          } catch (e) {
            next(e);
          }
    }
}