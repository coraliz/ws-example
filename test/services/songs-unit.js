const { expect }= require("chai");
const Songs = require("../../src/services/songs");

describe("songs-service", () => {
    it("should parse verses to rows", () => {
        const service = new Songs(null);
        const verse = 
            {
                verse: "I'm with the gang, gang, gang and we 'bout to go up\n\
                Switching lanes, it's a thang, every time we show up\n\
                Bet your hoe, she know us\n\
                'Cause you know we blowed up",
                index: 4
            };

        const rows = service.getVerseRows(verse);
        expect(rows.length).to.eql(4);
        expect(rows[0].row).to.eql("I'm with the gang, gang, gang and we 'bout to go up");
        expect(rows[0].verseIndex).to.eql(verse.verseIndex);
    });

    it("should parse row to words", () => {
        const service = new Songs(null);
        const row = 
            {
                row: "I'm with the gang, gang, gang and we 'bout to go up",
                verseIndex: 4,
                rowIndex: 3
            };

        const words = service.getRowWords(row);
        expect(words.length).to.eql(12);
        expect(words[0].word).to.eql("Im");
        expect(words[0].verseIndex).to.eql(row.verseIndex);
        expect(words[0].rowIndex).to.eql(row.rowIndex);
        expect(words[0].offset).to.eql(0);
    });

});

