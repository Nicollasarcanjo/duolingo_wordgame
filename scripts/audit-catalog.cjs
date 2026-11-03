const fs=require('node:fs');
const cards=require('../dist/catalog.json');
const counts={cards:cards.length,missingId:0,missingWord:0,missingMeaning:0,duplicateIds:0,duplicateSenses:0,missingExample:0,examplesWithoutTranslation:0,suspiciousExample:0,unreviewed:cards.length};
const ids=new Set(),senses=new Set(),priority=[],wordMeanings=new Map();
for(const card of cards){
  const problems=[];
  if(!card.id){counts.missingId++;problems.push('missingId');}else if(ids.has(card.id)){counts.duplicateIds++;problems.push('duplicateId');}else ids.add(card.id);
  if(!card.word||typeof card.word!=='string'){counts.missingWord++;problems.push('missingWord');}
  if(!Array.isArray(card.meaning)||!card.meaning.some(x=>typeof x==='string'&&x.trim())){counts.missingMeaning++;problems.push('missingMeaning');}
  const sense=JSON.stringify([String(card.word||'').toLowerCase(),card.pos,(card.meaning||[]).map(x=>String(x).trim().toLowerCase()).sort()]);
  if(senses.has(sense)){counts.duplicateSenses++;problems.push('duplicateSense');}else senses.add(sense);
  const word=String(card.word||'').toLowerCase(),meanings=wordMeanings.get(word)||new Set();
  meanings.add(JSON.stringify([card.pos,card.meaning]));wordMeanings.set(word,meanings);
  if(!card.phrase?.text){counts.missingExample++;problems.push('missingExample');}
  else {
    if(!card.phrase.translation){counts.examplesWithoutTranslation++;problems.push('exampleWithoutTranslation');}
    if(typeof card.phrase.text!=='string'||card.phrase.text.length>300||/[<>]/.test(card.phrase.text)){counts.suspiciousExample++;problems.push('suspiciousExample');}
  }
  if(problems.length)priority.push({id:card.id,word:card.word,rank:card.rank||99999,problems});
}
counts.wordsWithMultipleSenses=[...wordMeanings.values()].filter(meanings=>meanings.size>1).length;
for(const item of priority)if((wordMeanings.get(String(item.word||'').toLowerCase())?.size||0)>1)item.problems.push('multipleSensesCheckContext');
priority.sort((a,b)=>a.rank-b.rank);
const report={generatedBy:'audit-catalog.cjs',description:'Validação automática, não revisão editorial. Sentidos incompatíveis exigem revisão contextual.',counts,priority};
fs.writeFileSync(process.argv[2]||'dist/catalog-audit.json',JSON.stringify(report));
console.log(JSON.stringify(counts,null,2));
