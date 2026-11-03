import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.resolve(process.argv[2] ?? path.join(root, '..', 'word-sprint-inputs'));
const lexicoreFile = path.join(sourceDir, 'LexiCore_5000.csv');
const dictDir = path.join(sourceDir, 'en-pt', 'en-pt');
const outputDir = path.join(root, 'dist');

const lexicoreText = fs.readFileSync(lexicoreFile, 'utf8').replace(/^\uFEFF/, '');
const lexicoreRows = lexicoreText.trim().split(/\r?\n/).slice(1).map((line) => {
  const [rank, rankInLevel, word, , cefr, , , , , , , zipf] = line.split(',');
  return { rank: Number(rank), rankInLevel: Number(rankInLevel), word: word.toLowerCase(), cefr, zipf: Number(zipf) };
});

const idx = fs.readFileSync(path.join(dictDir, 'en-pt.idx'));
const dict = zlib.gunzipSync(fs.readFileSync(path.join(dictDir, 'en-pt.dict.dz')));
const entries = new Map();
const orderedWords = [];
let cursor = 0;
while (cursor < idx.length) {
  const end = idx.indexOf(0, cursor);
  if (end < 0) break;
  const word = idx.toString('utf8', cursor, end);
  const field = end + 1;
  const offset = idx.readUInt32BE(field);
  const length = idx.readUInt32BE(field + 4);
  entries.set(word, dict.toString('utf8', offset, offset + length));
  orderedWords.push(word);
  cursor = field + 8;
}

const surfaceForms = new Map();
const synPath = path.join(dictDir, 'en-pt.syn');
if (fs.existsSync(synPath)) {
  const syn = fs.readFileSync(synPath);
  cursor = 0;
  while (cursor < syn.length) {
    const end = syn.indexOf(0, cursor);
    if (end < 0 || end + 5 > syn.length) break;
    const form = syn.toString('utf8', cursor, end).toLowerCase();
    const entryIndex = syn.readUInt32BE(end + 1);
    const lemma = orderedWords[entryIndex]?.toLowerCase();
    if (lemma) {
      if (!surfaceForms.has(lemma)) surfaceForms.set(lemma, []);
      surfaceForms.get(lemma).push(form);
    }
    cursor = end + 5;
  }
}

const decode = (value) => value
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&ldquo;|&rdquo;|&lsquo;|&rsquo;/g, '"')
  .replace(/&mdash;|&ndash;/g, '—').replace(/&nbsp;/g, ' ');

const clean = (value) => decode(value.replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]*>/g, ' '))
  .replace(/\s+/g, ' ').trim();

function getSenses(html) {
  const blocks = [...html.matchAll(/<div(?:\s[^>]*)?>([\s\S]*?)<\/div>/gi)];
  const senses = [];
  for (const blockMatch of blocks) {
    const block = blockMatch[1];
    const pos = clean(block.match(/^\s*<i>(.*?)<\/i>/i)?.[1] ?? '').replace(/\.$/, '');
    const markers = [...block.matchAll(/<span style="color:#666666">(\d+)\.<\/span>/g)];
    markers.forEach((marker, i) => {
      const start = marker.index + marker[0].length;
      const end = i + 1 < markers.length ? markers[i + 1].index : block.length;
      const segment = block.slice(start, end);
      const rawGloss = [...segment.matchAll(/<b>([\s\S]*?)<\/b>/gi)].map((m) => clean(m[1])).find(Boolean) ?? '';
      const translations = [...new Set(rawGloss.split(/[,;\/]/)
        .map((item) => item.replace(/\([^)]*\)/g, '').trim())
        .filter((item) => item && item.length < 48))];
      const definition = clean(segment.match(/&mdash;([\s\S]*?)(?:<\/span>|<br\s*\/?\s*>|$)/i)?.[1] ?? '');
      const examples = [...segment.matchAll(/<i style="color:#666666">([\s\S]*?)<\/i>/gi)]
        .map((m) => clean(m[1]).replace(/^"|"$/g, '').trim())
        .filter((item) => item.length >= 8 && item.length <= 150 && /[a-z]/i.test(item));
      if (translations.length) senses.push({ pos, translations, definition, examples });
    });
  }
  return senses;
}

const escaped = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function findPhrase(sense, word) {
  const match = new RegExp(`\\b${escaped(word)}\\b`, 'i');
  for (const example of sense.examples) {
    if (match.test(example)) return { text: example.replace(match, '_____').replace(/\s+/g, ' ').trim(), source: 'KOReader en-pt' };
  }
  return null;
}

const curated = {
  the: [{ meaning: ['o', 'a', 'os', 'as'], phrase: 'I saw ___ movie yesterday.' }],
  to: [{ meaning: ['para', 'a'], phrase: 'I am going ___ your house.' }],
  and: [{ meaning: ['e'], phrase: 'I like singing ___ playing guitar.' }],
  of: [{ meaning: ['de'], phrase: 'A cup ___ coffee, please.' }],
  a: [{ meaning: ['um', 'uma'], phrase: 'She has ___ dog.' }],
  in: [{ meaning: ['em', 'dentro de'], phrase: 'My keys are ___ my bag.' }],
  i: [{ meaning: ['eu'], phrase: '___ am learning English.' }],
  for: [{ meaning: ['para', 'por'], phrase: 'This gift is ___ you.' }],
  that: [{ meaning: ['que', 'aquele', 'aquela'], phrase: 'I know ___ you are busy.' }],
  you: [{ meaning: ['você', 'vocês'], phrase: '___ are doing great.' }],
  it: [{ meaning: ['isso', 'ele', 'ela'], phrase: '___ is a beautiful day.' }],
  this: [{ meaning: ['isto', 'este', 'esta'], phrase: '___ is my favorite book.' }],
  on: [{ meaning: ['em', 'sobre', 'ligado'], phrase: 'The book is ___ the table.' }],
  with: [{ meaning: ['com'], phrase: 'I live ___ my family.' }],
  be: [{ meaning: ['ser', 'estar'], phrase: 'I want to ___ ready.' }],
  as: [{ meaning: ['como', 'tão'], phrase: 'She works ___ a teacher.' }],
  are: [{ meaning: ['são', 'estão', 'é', 'está'], phrase: 'You ___ right.' }],
  at: [{ meaning: ['em', 'a'], phrase: 'I wake up ___ seven.' }],
  not: [{ meaning: ['não'], phrase: 'I do ___ understand.' }],
  he: [{ meaning: ['ele'], phrase: '___ works from home.' }],
  by: [{ meaning: ['por', 'ao lado de'], phrase: 'The book was written ___ her.' }],
  from: [{ meaning: ['de', 'desde'], phrase: 'I am ___ Brazil.' }],
  but: [{ meaning: ['mas'], phrase: 'I am tired, ___ happy.' }],
  my: [{ meaning: ['meu', 'minha'], phrase: 'This is ___ phone.' }],
  or: [{ meaning: ['ou'], phrase: 'Would you like tea ___ coffee?' }],
  we: [{ meaning: ['nós'], phrase: '___ are ready to go.' }],
  an: [{ meaning: ['um', 'uma'], phrase: 'She ate ___ apple.' }],
  your: [{ meaning: ['seu', 'sua', 'teu', 'tua'], phrase: 'Is this ___ bag?' }],
  all: [{ meaning: ['todo', 'toda', 'todos', 'todas'], phrase: '___ my friends are here.' }],
  so: [{ meaning: ['então', 'tão', 'assim'], phrase: 'It was ___ good!' }],
  his: [{ meaning: ['dele', 'seu'], phrase: 'That is ___ brother.' }],
  they: [{ meaning: ['eles', 'elas'], phrase: '___ are waiting outside.' }],
  me: [{ meaning: ['me', 'mim'], phrase: 'Can you help ___?' }],
  one: [{ meaning: ['um', 'uma', 'alguém'], phrase: 'I have ___ question.' }],
  if: [{ meaning: ['se'], phrase: 'Call me ___ you need help.' }],
  can: [{ meaning: ['poder', 'conseguir'], phrase: 'I ___ help you.' }],
  will: [{ meaning: ['marca de futuro', 'vai', 'irá'], phrase: 'I ___ call you tomorrow.' }],
  just: [{ meaning: ['apenas', 'só', 'acabou de'], phrase: 'I ___ got home.' }],
  about: [{ meaning: ['sobre', 'a respeito de'], phrase: 'Tell me ___ your day.' }, { meaning: ['cerca de', 'aproximadamente'], phrase: 'It takes ___ ten minutes.' }],
  up: [{ meaning: ['para cima', 'acordado'], phrase: 'Please stand ___.' }],
  out: [{ meaning: ['fora', 'para fora'], phrase: 'Let’s go ___ for dinner.' }],
  more: [{ meaning: ['mais'], phrase: 'Would you like ___ coffee?' }],
  no: [{ meaning: ['não', 'nenhum', 'nenhuma'], phrase: 'There is ___ milk left.' }],
  only: [{ meaning: ['só', 'somente'], phrase: 'I have ___ one question.' }],
  other: [{ meaning: ['outro', 'outra'], phrase: 'Do you have any ___ ideas?' }],
  before: [{ meaning: ['antes', 'antes de'], phrase: 'Wash your hands ___ dinner.' }],
  into: [{ meaning: ['para dentro de', 'em'], phrase: 'Come ___ the house.' }],
  long: [{ meaning: ['longo', 'comprido'], phrase: 'It was a ___ day.' }],
  year: [{ meaning: ['ano'], phrase: 'I visit my family every ___.' }],
  business: [{ meaning: ['negócio', 'empresa'], phrase: 'She runs a small ___.' }],
  name: [{ meaning: ['nome'], phrase: 'What is your ___?' }],
  place: [{ meaning: ['lugar', 'colocar'], phrase: 'This is a nice ___ to live.' }],
  first: [{ meaning: ['primeiro', 'primeira'], phrase: 'This is my ___ day here.' }],
  people: [{ meaning: ['pessoas', 'gente'], phrase: 'Many ___ work here.' }],
  house: [{ meaning: ['casa'], phrase: 'Their ___ is near the park.' }],
  man: [{ meaning: ['homem'], phrase: 'The ___ is waiting outside.' }],
  woman: [{ meaning: ['mulher'], phrase: 'The ___ is speaking with my sister.' }],
  person: [{ meaning: ['pessoa'], phrase: 'She is a kind ___.' }],
  school: [{ meaning: ['escola'], phrase: 'The children walk to ___.' }],
  money: [{ meaning: ['dinheiro'], phrase: 'I need to save some ___. ' }],
  home: [{ meaning: ['casa', 'lar'], phrase: 'I am going ___.' }],
  feel: [{ meaning: ['sentir', 'sentir-se'], phrase: 'I ___ tired today.' }],
  find: [{ meaning: ['encontrar', 'achar'], phrase: 'I can’t ___ my keys.' }],
  leave: [{ meaning: ['sair', 'partir', 'deixar'], phrase: 'I need to ___ now.' }],
  seem: [{ meaning: ['parecer'], phrase: 'You ___ happy today.' }],
  ask: [{ meaning: ['perguntar', 'pedir'], phrase: 'Can I ___ you a question?' }],
  turn: [{ meaning: ['virar', 'girar', 'vez'], phrase: 'Please ___ left at the next street.' }],
  become: [{ meaning: ['tornar-se', 'virar'], phrase: 'I want to ___ a teacher.' }],
  begin: [{ meaning: ['começar', 'iniciar'], phrase: 'The class will ___ soon.' }],
  seem: [{ meaning: ['parecer'], phrase: 'You ___ happy today.' }],
  end: [{ meaning: ['fim', 'terminar'], phrase: 'The movie will ___ at nine.' }],
  point: [{ meaning: ['apontar', 'ponto'], phrase: 'Can you ___ to the right answer?' }],
  place: [{ meaning: ['lugar', 'colocar'], phrase: 'This is a nice ___ to live.' }],
  start: [{ meaning: ['começar', 'iniciar'], phrase: 'The movie will ___ soon.' }],
  keep: [{ meaning: ['manter', 'guardar'], phrase: 'Please ___ the change.' }],
  put: [{ meaning: ['colocar', 'pôr'], phrase: 'You can ___ your bag here.' }],
  long: [{ meaning: ['longo', 'comprido'], phrase: 'It was a ___ day.' }],
  family: [{ meaning: ['família'], phrase: 'I live with my ___.' }],
  like: [{ meaning: ['gostar de'], phrase: 'I ___ this song.' }, { meaning: ['como', 'parecido com'], phrase: 'It looks ___ a small house.' }],
  what: [{ meaning: ['o que', 'qual'], phrase: '___ is your name?' }],
  time: [{ meaning: ['tempo', 'hora', 'vez'], phrase: 'What ___ is it?' }],
  there: [{ meaning: ['lá', 'ali'], phrase: 'Your keys are over ___.' }],
  do: [{ meaning: ['fazer'], phrase: 'What do you ___ on weekends?' }],
  which: [{ meaning: ['qual', 'que'], phrase: '___ color do you prefer?' }],
  when: [{ meaning: ['quando'], phrase: '___ are you coming home?' }],
  would: [{ meaning: ['iria', 'gostaria', 'auxiliar de hipótese'], phrase: 'I ___ like some water.' }],
  who: [{ meaning: ['quem'], phrase: '___ is at the door?' }],
  their: [{ meaning: 'deles, delas'.split(', '), phrase: 'That is ___ house.' }],
  go: [{ meaning: ['ir'], phrase: 'We ___ to work by bus.' }],
  get: [{ meaning: ['obter', 'conseguir', 'receber'], phrase: 'I ___ a message from her.' }, { meaning: ['chegar'], phrase: 'What time do you ___ home?' }],
  have: [{ meaning: ['ter'], phrase: 'I ___ a question.' }],
  make: [{ meaning: ['fazer', 'preparar'], phrase: 'I ___ breakfast every morning.' }],
  know: [{ meaning: ['saber', 'conhecer'], phrase: 'I ___ the answer.' }],
  take: [{ meaning: ['pegar', 'levar'], phrase: 'Please ___ a seat.' }],
  see: [{ meaning: ['ver', 'enxergar'], phrase: 'I can ___ the mountains.' }],
  come: [{ meaning: ['vir'], phrase: 'Can you ___ here?' }],
  think: [{ meaning: ['achar', 'pensar'], phrase: 'I ___ this is a good idea.' }],
  say: [{ meaning: ['dizer', 'falar'], phrase: 'What did you ___?' }],
  look: [{ meaning: ['olhar', 'observar'], phrase: '___ at that bird.' }],
  want: [{ meaning: ['querer', 'desejar'], phrase: 'I ___ to learn English.' }],
  give: [{ meaning: ['dar'], phrase: 'Please ___ me a minute.' }],
  use: [{ meaning: ['usar'], phrase: 'Can I ___ your phone?' }],
  find: [{ meaning: ['encontrar', 'achar'], phrase: 'I can’t ___ my keys.' }],
  tell: [{ meaning: ['contar', 'dizer'], phrase: 'Please ___ me the truth.' }],
  ask: [{ meaning: ['perguntar', 'pedir'], phrase: 'Can I ___ you a question?' }],
  work: [{ meaning: ['trabalhar'], phrase: 'I ___ from home.' }, { meaning: ['funcionar'], phrase: 'The app does not ___ on my phone.' }],
  call: [{ meaning: ['ligar', 'telefonar', 'chamar'], phrase: 'I will ___ you tomorrow.' }],
  try: [{ meaning: ['tentar', 'experimentar'], phrase: 'I want to ___ again.' }],
  need: [{ meaning: ['precisar', 'necessitar'], phrase: 'We ___ some help.' }],
  feel: [{ meaning: ['sentir', 'sentir-se'], phrase: 'I ___ tired today.' }],
  help: [{ meaning: ['ajudar', 'ajuda'], phrase: 'Can you ___ me?' }],
  eat: [{ meaning: ['comer'], phrase: 'Let’s ___ lunch.' }],
  drink: [{ meaning: ['beber', 'tomar'], phrase: 'I ___ coffee in the morning.' }],
  buy: [{ meaning: ['comprar'], phrase: 'I need to ___ some food.' }],
  read: [{ meaning: ['ler'], phrase: 'I ___ a book before bed.' }],
  write: [{ meaning: ['escrever'], phrase: 'Please ___ your name here.' }],
  play: [{ meaning: ['brincar', 'jogar', 'tocar'], phrase: 'The children ___ outside.' }],
  talk: [{ meaning: ['conversar', 'falar'], phrase: 'I need to ___ to you.' }],
  study: [{ meaning: ['estudar'], phrase: 'I ___ English every day.' }],
  live: [{ meaning: ['morar', 'viver'], phrase: 'They ___ in Brazil.' }],
  leave: [{ meaning: ['sair', 'partir', 'deixar'], phrase: 'I need to ___ now.' }],
  start: [{ meaning: ['começar', 'iniciar'], phrase: 'The movie will ___ soon.' }],
  keep: [{ meaning: ['manter', 'guardar'], phrase: 'Please ___ the change.' }],
  put: [{ meaning: ['colocar', 'pôr'], phrase: 'You can ___ your bag here.' }],
  bring: [{ meaning: ['trazer'], phrase: 'Please ___ a glass of water.' }],
  open: [{ meaning: ['abrir'], phrase: 'Can you ___ the window?' }],
  close: [{ meaning: ['fechar'], phrase: 'Please ___ the door.' }],
  wait: [{ meaning: ['esperar', 'aguardar'], phrase: 'Please ___ here.' }],
  walk: [{ meaning: ['andar', 'caminhar'], phrase: 'We ___ to work.' }],
  run: [{ meaning: ['correr'], phrase: 'I ___ every morning.' }, { meaning: ['administrar', 'gerenciar'], phrase: 'She helps ___ the family business.' }],
  sleep: [{ meaning: ['dormir'], phrase: 'The baby is going to ___.' }],
  drive: [{ meaning: ['dirigir', 'guiar'], phrase: 'I ___ to work each day.' }],
  cook: [{ meaning: ['cozinhar'], phrase: 'I like to ___ with my family.' }],
  clean: [{ meaning: ['limpar'], phrase: 'Can you ___ your room?' }],
  send: [{ meaning: ['enviar', 'mandar'], phrase: 'I will ___ you an email.' }],
  meet: [{ meaning: ['encontrar', 'conhecer'], phrase: 'I will ___ you at the station.' }],
  learn: [{ meaning: ['aprender'], phrase: 'I want to ___ new words.' }],
  understand: [{ meaning: ['entender', 'compreender'], phrase: 'I ___ the question now.' }],
  remember: [{ meaning: ['lembrar', 'recordar'], phrase: 'I can’t ___ his name.' }],
  change: [{ meaning: ['mudar', 'trocar'], phrase: 'People can ___ over time.' }],
  move: [{ meaning: ['mover', 'mudar-se'], phrase: 'We need to ___ the table.' }],
  show: [{ meaning: ['mostrar'], phrase: 'Please ___ me your photo.' }],
  good: [{ meaning: ['bom', 'boa'], phrase: 'That is a ___ idea.' }],
  day: [{ meaning: ['dia'], phrase: 'Have a nice ___!' }],
  family: [{ meaning: ['família'], phrase: 'I live with my ___.' }],
  friend: [{ meaning: ['amigo', 'amiga'], phrase: 'She is my best ___.' }],
  food: [{ meaning: ['comida', 'alimento'], phrase: 'The ___ is ready.' }],
  home: [{ meaning: ['casa', 'lar'], phrase: 'I am going ___.' }],
  water: [{ meaning: ['água'], phrase: 'Could I have some ___, please?' }],
  book: [{ meaning: ['livro'], phrase: 'I am reading a ___.' }],
  house: [{ meaning: ['casa'], phrase: 'Their ___ is near the park.' }],
  people: [{ meaning: ['pessoas', 'gente'], phrase: 'Many ___ work here.' }],
  child: [{ meaning: ['criança', 'filho', 'filha'], phrase: 'The ___ is playing.' }],
  life: [{ meaning: ['vida'], phrase: 'Music is part of my ___. ' }],
  new: [{ meaning: ['novo', 'nova'], phrase: 'I have a ___ phone.' }],
  small: [{ meaning: ['pequeno', 'pequena'], phrase: 'They live in a ___ apartment.' }],
};

const catalog = [];
const unmatched = [];
for (const item of lexicoreRows) {
  if (!/^[a-z]+$/.test(item.word)) continue;
  const html = entries.get(item.word) ?? entries.get(item.word[0].toUpperCase() + item.word.slice(1));
  const rawSenses = html ? getSenses(html) : [];
  const senses = curated[item.word]
    ? curated[item.word].map((sense) => ({ ...sense, pos: 'curado', examples: [] }))
    : rawSenses.filter((sense) => sense.translations.some((t) => t.toLowerCase() !== item.word));
  if (!senses.length) { unmatched.push(item.word); continue; }
  senses.forEach((sense, index) => {
    const phrase = sense.phrase
      ? { text: sense.phrase, source: 'exemplo original do jogo' }
      : findPhrase(sense, item.word);
    catalog.push({
      id: `${item.word}:${index + 1}`,
      senseIndex: index,
      word: item.word,
      rank: item.rank,
      cefr: item.cefr,
      zipf: item.zipf,
      pos: sense.pos,
      meaning: sense.meaning ?? sense.translations.slice(0, 4),
      definition: sense.definition ?? '',
      phrase,
    });
  });
}
catalog.sort((a, b) => b.zipf - a.zipf || a.rank - b.rank || a.senseIndex - b.senseIndex || a.id.localeCompare(b.id));

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'catalog.json'), JSON.stringify(catalog));
fs.writeFileSync(path.join(outputDir, 'catalog-stats.json'), JSON.stringify({
  lexicoreWords: lexicoreRows.length,
  dictionaryEntries: entries.size,
  dictionaryForms: [...surfaceForms.values()].reduce((sum, forms) => sum + forms.length, 0),
  playableWords: new Set(catalog.map((item) => item.word)).size,
  playableMeanings: catalog.length,
  missingWords: unmatched.length,
  phraseWords: catalog.filter((word) => word.phrase).length,
}, null, 2));
console.log(JSON.stringify({
  lexicoreWords: lexicoreRows.length,
  dictionaryEntries: entries.size,
  dictionaryForms: [...surfaceForms.values()].reduce((sum, forms) => sum + forms.length, 0),
  playableWords: new Set(catalog.map((item) => item.word)).size,
  playableMeanings: catalog.length,
  phraseWords: catalog.filter((word) => word.phrase).length,
  unmatchedWords: unmatched.length,
  firstCards: catalog.slice(0, 5).map(({word,meaning})=>({word,meaning})),
}, null, 2));
