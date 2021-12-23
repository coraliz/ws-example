class Songs {
    constructor(songsModel) {
        this.songsModel = songsModel;
    }

    async insertSong(name, year, album, writers, composes, performers, genres, file) {
        const verses = this.getSongVerses(file.data);
        const rows = verses.flatMap(verse => this.getVerseRows(verse));
        const words = rows.flatMap(row => this.getRowWords(row));
        await this.wordsModel.insertWords(words);
        await this.songsModel.insertSong(name, year, album);
        await this.artistsModel.insertArtist(writers, composes, performers);
        await this.genresModel.insertGenres(genres);
    }

    getSongVerses(songText){
        return songText
        .split("\n\n")
        .map((verse, verseIndex) => {
            return {
                verse: verse,
                verseIndex: verseIndex
            }
        });
    }

    getVerseRows(songVerse){
        return songVerse.verse.split("\n")
        .map((row, rowIndex) => {
            return {
                row: row,
                verseIndex: songVerse.verseIndex,
                rowIndex: rowIndex
            };
        });
    }

    getRowWords(songRow){
        return songRow.row.split(" ").
        map((word, offset)=>{
            return{
                word: word.replace(/[?.,'()]/, ""),
                verseIndex: songRow.verseIndex,
                rowIndex: songRow.rowIndex,
                offset
            };
        });
    }
}

module.exports = Songs;