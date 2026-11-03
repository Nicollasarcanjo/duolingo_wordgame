const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const rules=require('../dist/learning.js');
const d={today:'2026-11-03',now:100000};
test('copy, errors, hints and later independent recall have different meanings',()=>{
  const copied=rules.correct({level:0},d);
  assert.equal(copied.level,1);assert.equal(copied.recallCorrect,0);assert.equal(copied.remembered,false);
  const wrong=rules.wrong({level:5,seen:true,remembered:true},d);
  assert.equal(wrong.level,4);assert.equal(wrong.remembered,false);
  const assisted=rules.correct(wrong,{...d,assisted:true});assert.equal(assisted.level,4);assert.equal(assisted.nextAt,d.now+35000);
  const synonym=rules.correct({level:4,seen:true},{...d,alternate:true});assert.equal(synonym.level,4);assert.equal(synonym.recallCorrect,0);
  assert.equal(rules.correct({level:0},{...d,alternate:true}).level,0);
  const sameDay=rules.correct({level:10,firstSeenDate:d.today},{...d});assert.equal(sameDay.remembered,false);
  const later=rules.correct({level:10,firstSeenDate:d.today},{...d,today:'2026-11-04'});assert.equal(later.remembered,true);assert.equal(rules.status(later),'remembered');
  const prepared=rules.correct({level:0},{...d,sentence:true,prepared:true});assert.equal(prepared.recallCorrect,0);assert.equal(prepared.nextAt,d.now+35000);
});
test('listening is unavailable without browser speech synthesis',()=>{
  const context={window:{},console};vm.createContext(context);
  vm.runInContext(fs.readFileSync('dist/recognition.js','utf8'),context);
  assert.equal(context.window.VocaRecognition.audioAvailable(),false);
});
test('the prior progress is backed up before migration without losing XP or stage progress',()=>{
  const initial=JSON.stringify({xp:350,cards:{'water:1':{seen:true,level:3}},trackProgress:{'trail-1:1':{solved:['water:1'],complete:false}},unlocked:['first']});
  const storage={'vocasprint.progress.v1':initial};
  const context={window:{},document:{querySelector:()=>({})},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},console};vm.createContext(context);
  const src=fs.readFileSync('dist/game.js','utf8').replace(/  start\(\);\s*\}\)\(\);\s*$/,'  window.loadedState=state;\n})();');
  vm.runInContext(src,context);assert.equal(storage['vocasprint.progress.v1.before-learning-v2'],initial);
  assert.equal(context.window.loadedState.xp,350);assert.equal(context.window.loadedState.cards['water:1'].level,3);assert.equal(context.window.loadedState.trackProgress['trail-1:1'].solved[0],'water:1');
});
test('started legacy stages retain their original words and new stages follow themed sets',()=>{
  const storage={};const context={window:{},document:{querySelector:()=>({})},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},console,fetch:()=>{throw Error('not called')}};
  vm.createContext(context);
  for(const file of ['trail-examples.js','legacy-examples.js','extra-tracks.js','curated-cards.js'])vm.runInContext(fs.readFileSync('dist/'+file,'utf8'),context);
  const src=fs.readFileSync('dist/game.js','utf8').replace(/  start\(\);\s*\}\)\(\);\s*$/,`  window.testApi={buildTracks,appendExtraTracks,alignLegacyTracks,rebuildReviewLookup,dueReviews,syncRelatedSchedule,setState(x){state=x;},getState(){return state;},setCatalog(x){catalog=x;},normalizeSentence};\n})();`);
  vm.runInContext(src,context);const api=context.window.testApi;assert.ok(api);
  const source=JSON.parse(fs.readFileSync('dist/catalog.json','utf8')),legacy=api.buildTracks(source);
  const before=legacy[0].stages[0].items.map(x=>x.id), completed=legacy[0].stages[1].items.map(x=>x.id);
  api.setState({cards:{},trackProgress:{'trail-1:1':{solved:[before[0]],complete:false},'trail-1:2':{solved:completed,complete:true}}});
  const all=api.appendExtraTracks(legacy,source);api.alignLegacyTracks(legacy,all);
  assert.deepEqual(Array.from(legacy[0].stages[0].items,x=>x.id),Array.from(before));
  assert.deepEqual(Array.from(legacy[0].stages[1].items,x=>x.id),Array.from(completed));
  assert.ok(legacy[0].stages[2].items.every(x=>x.id.startsWith('themed:')));
  assert.equal(all.length,20);for(const track of all){assert.equal(track.stages.length,5);for(const stage of track.stages)assert.equal(stage.items.length,10);}
  assert.equal(api.normalizeSentence("I'm ready!"),api.normalizeSentence('I am ready.'));
  api.setState({cards:{},trackProgress:{}});api.setCatalog(context.window.VocaCuratedCards.apply(source));
  const fresh=api.buildTracks(source),allFresh=api.appendExtraTracks(fresh,context.window.VocaCuratedCards.apply(source));api.alignLegacyTracks(fresh,allFresh);
  for(const track of allFresh)for(const stage of track.stages.filter(s=>s.kind==='word'))for(const card of stage.items){assert.ok(card.phrase?.text?.includes('___'),`${track.title}: ${card.word} sem frase`);assert.ok(card.phrase.translation,`${track.title}: ${card.word} sem tradução`);}
  const curated=new Map(context.window.VocaCuratedCards.apply(source).map(c=>[c.id,c]));
  for(const track of api.buildTracks(source))for(const stage of track.stages.filter(s=>s.kind==='word'))for(const card of stage.items){const patch=context.window.VocaLegacyExamples[card.word]||curated.get(card.id);assert.ok(patch?.phrase?.text?.includes('___'),`Antiga ${track.title}: ${card.word} sem frase`);assert.ok(patch.phrase.translation,`Antiga ${track.title}: ${card.word} sem tradução`);}
  const cards=[{id:'a',word:'book',meaning:['livro'],category:'estudo'},{id:'b',word:'book',meaning:['livro'],category:'casa'},{id:'c',word:'book',meaning:['reservar'],category:'viagem'}];
  api.setState({cards:{a:{seen:true,nextAt:1,level:3},b:{seen:true,nextAt:1,level:5},c:{seen:true,nextAt:1,level:2}},trackProgress:{}});api.setCatalog(cards);api.rebuildReviewLookup();
  assert.equal(api.dueReviews(10).length,2);api.syncRelatedSchedule('a',{nextAt:100,remembered:true});
  assert.equal(api.getState().cards.b.nextAt,100);assert.equal(api.getState().cards.b.level,5);assert.equal(api.getState().cards.c.nextAt,1);
});
