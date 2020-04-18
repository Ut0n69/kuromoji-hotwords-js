const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict/',
});

const posts = require('./posts');
const removeWords = require('./removeWords');

builder.build((err, tokenizer) => {
  if (err) throw err;

  const tokens = tokenizer.tokenize(posts);

  const count = {
    tokens: 0,
    targetWord: 0,
  };

  const result = [];
  tokens.forEach((word) => {
    count.tokens++;
    if ((word.pos === '名詞' || word.pos === '動詞') && !removeWords.includes(word.surface_form)) {
      count.targetWord++;
      result.push(word.surface_form);
    }
  });
  console.log('検索単語数: ', count.tokens);
  console.log('対象単語数: ', count.targetWord);

  console.log();
  console.log('-------- Hot Words --------');
  const resultWithCount = {};
  for (const key of result) {
    resultWithCount[key] = result.filter((x) => x == key).length;
  }

  const ranking = [];
  for (const word in resultWithCount) {
    ranking.push([word, resultWithCount[word]]);
  }

  ranking.sort((x, y) => y[1] - x[1]);

  let rank = 1;
  const displayRankingCount = 50;
  for (let i = 0; i < displayRankingCount; i++) {
    console.log('Word :', ranking[i][0]);
    console.log('Count:', ranking[i][1]);
    console.log('Rank :', rank + '\n');
    rank++;
  }
});
