(() => {
  'use strict';

  const STORAGE_KEY = 'vocasprint.progress.v1';
  const PAGE_SIZE = 18;
  const VERB_ORDER = ['want','need','have','go','get','make','do','know','take','see','come','think','give','use','find','tell','ask','work','call','try','feel','help','eat','drink','buy','read','write','play','talk','study','live','leave','start','keep','put','bring','open','close','wait','walk','run','sleep','drive','cook','clean','send','meet','learn','understand','remember','change','move','show','be','like'];
  const VERB_SET = new Set(VERB_ORDER);
  const TRACK_META = [
    { title:'Primeiras palavras', icon:'🌱', description:'Palavras essenciais para começar a formar ideias.', phrases:[
      ['I am ready.','Estou pronto.'],['You have a book.','Você tem um livro.'],['We go home.','Nós vamos para casa.'],['I want some water.','Eu quero um pouco de água.'],['She likes this song.','Ela gosta desta música.'],['They live in a small house.','Eles moram em uma casa pequena.'],['Can you help me?','Você pode me ajudar?'],['I need to call my friend.','Preciso ligar para meu amigo.'],['He works every day.','Ele trabalha todos os dias.'],['Please open the door.','Por favor, abra a porta.']
    ]},
    { title:'Vida cotidiana', icon:'☀️', description:'Ações, pessoas e coisas que aparecem todo dia.', phrases:[
      ['I wake up at seven.','Eu acordo às sete.'],['She makes breakfast for us.','Ela prepara o café da manhã para nós.'],['He takes the bus to work.','Ele pega o ônibus para o trabalho.'],['We eat lunch together.','Nós almoçamos juntos.'],['I read before I sleep.','Eu leio antes de dormir.'],['They walk to school.','Eles vão a pé para a escola.'],['I buy fruit at the market.','Eu compro frutas no mercado.'],['Can you bring your bag?','Você pode trazer sua bolsa?'],['I clean my room on Saturday.','Eu limpo meu quarto no sábado.'],['We meet after work.','Nós nos encontramos depois do trabalho.']
    ]},
    { title:'Casa e alimentação', icon:'🏠', description:'Fale sobre a casa, as refeições e a rotina.', phrases:[
      ['The food is ready.','A comida está pronta.'],['I cook dinner for my family.','Eu preparo o jantar para minha família.'],['Please close the window.','Por favor, feche a janela.'],['She drinks coffee in the morning.','Ela toma café de manhã.'],['He puts the keys on the table.','Ele coloca as chaves na mesa.'],['We need to wash the dishes.','Precisamos lavar a louça.'],['The children play in the garden.','As crianças brincam no jardim.'],['I keep the milk in the fridge.','Eu guardo o leite na geladeira.'],['Can you cut the bread?','Você pode cortar o pão?'],['They sit at the table.','Eles se sentam à mesa.']
    ]},
    { title:'Conversas', icon:'💬', description:'Pergunte, responda e mantenha uma conversa.', phrases:[
      ['What do you think?','O que você acha?'],['Please tell me your name.','Por favor, diga seu nome.'],['I understand the question.','Eu entendo a pergunta.'],['Can I ask you something?','Posso perguntar uma coisa?'],['She speaks English very well.','Ela fala inglês muito bem.'],['We talk about our plans.','Nós conversamos sobre nossos planos.'],['He sends me a message.','Ele me manda uma mensagem.'],['I want to learn new words.','Eu quero aprender palavras novas.'],['They listen to music together.','Eles ouvem música juntos.'],['Please show me the photo.','Por favor, me mostre a foto.']
    ]},
    { title:'Estudo e trabalho', icon:'📚', description:'Aprenda palavras para colaborar e produzir.', phrases:[
      ['I study English every day.','Eu estudo inglês todos os dias.'],['She writes a note for the team.','Ela escreve um recado para a equipe.'],['We start the meeting at nine.','Nós começamos a reunião às nove.'],['He reads the report carefully.','Ele lê o relatório com atenção.'],['I need to finish this today.','Preciso terminar isto hoje.'],['They work from home on Fridays.','Eles trabalham de casa às sextas-feiras.'],['Can you explain this word?','Você pode explicar esta palavra?'],['I use my phone to take notes.','Eu uso meu celular para fazer anotações.'],['We learn something new at work.','Nós aprendemos algo novo no trabalho.'],['Please send the file to me.','Por favor, envie o arquivo para mim.']
    ]},
    { title:'Cidade e movimento', icon:'🧭', description:'Deslocamentos, direções e encontros pela cidade.', phrases:[
      ['We go to the station by bus.','Nós vamos à estação de ônibus.'],['Turn left at the next street.','Vire à esquerda na próxima rua.'],['I drive to work in the morning.','Eu dirijo para o trabalho de manhã.'],['They wait outside the station.','Eles esperam do lado de fora da estação.'],['She walks across the park.','Ela atravessa o parque a pé.'],['I need to find this address.','Preciso encontrar este endereço.'],['Come with me to the store.','Venha comigo até a loja.'],['The train leaves at six.','O trem parte às seis.'],['We arrive at the hotel late.','Nós chegamos tarde ao hotel.'],['He carries a small bag.','Ele carrega uma bolsa pequena.']
    ]},
    { title:'Planos e escolhas', icon:'🗓️', description:'Conte o que pretende fazer e escolha seu caminho.', phrases:[
      ['I will call you tomorrow.','Vou ligar para você amanhã.'],['We plan to visit our friends.','Nós planejamos visitar nossos amigos.'],['She wants to start a new course.','Ela quer começar um curso novo.'],['They decide to stay at home.','Eles decidem ficar em casa.'],['I hope you feel better soon.','Espero que você se sinta melhor logo.'],['He chooses a different way.','Ele escolhe um caminho diferente.'],['Can we meet next week?','Podemos nos encontrar na próxima semana?'],['I will bring some food.','Vou trazer um pouco de comida.'],['We need to leave early.','Precisamos sair cedo.'],['She saves money for a trip.','Ela guarda dinheiro para uma viagem.']
    ]},
    { title:'Sentimentos e relações', icon:'💛', description:'Expresse emoções, opiniões e cuidado com as pessoas.', phrases:[
      ['I feel happy today.','Eu me sinto feliz hoje.'],['He loves spending time with his family.','Ele adora passar tempo com a família.'],['We believe you can do it.','Nós acreditamos que você consegue.'],['She remembers her first teacher.','Ela se lembra da primeira professora.'],['I miss my old friends.','Sinto falta dos meus velhos amigos.'],['They laugh at the same story.','Eles riem da mesma história.'],['Please listen to me.','Por favor, me escute.'],['I agree with your idea.','Eu concordo com a sua ideia.'],['He helps his neighbor every week.','Ele ajuda o vizinho toda semana.'],['We share everything with each other.','Nós compartilhamos tudo uns com os outros.']
    ]},
    { title:'Histórias do dia a dia', icon:'📖', description:'Conte sobre ações, mudanças e experiências.', phrases:[
      ['I found my keys under the chair.','Encontrei minhas chaves debaixo da cadeira.'],['She sent a message last night.','Ela enviou uma mensagem ontem à noite.'],['We changed our plans yesterday.','Mudamos nossos planos ontem.'],['He bought a new pair of shoes.','Ele comprou um par de sapatos novos.'],['They came home after dinner.','Eles vieram para casa depois do jantar.'],['I tried the new recipe.','Experimentei a receita nova.'],['She opened the box slowly.','Ela abriu a caixa devagar.'],['We learned a lot this year.','Aprendemos muito este ano.'],['He left his phone at home.','Ele deixou o celular em casa.'],['The rain stopped before noon.','A chuva parou antes do meio-dia.']
    ]},
    { title:'Inglês em movimento', icon:'🚀', description:'Junte palavras e verbos em frases completas.', phrases:[
      ['Could you tell me how to get there?','Você poderia me dizer como chegar lá?'],['I am learning because I want to travel.','Estou aprendendo porque quero viajar.'],['She usually takes a walk after dinner.','Ela costuma caminhar depois do jantar.'],['We are going to make dinner together.','Vamos preparar o jantar juntos.'],['He did not know where to find the book.','Ele não sabia onde encontrar o livro.'],['They will meet us near the main entrance.','Eles vão nos encontrar perto da entrada principal.'],['I have to finish my work before Friday.','Preciso terminar meu trabalho antes de sexta-feira.'],['Please remember to bring your ticket.','Por favor, lembre-se de trazer sua passagem.'],['We can stay here until the bus arrives.','Podemos ficar aqui até o ônibus chegar.'],['She wants to understand what happened.','Ela quer entender o que aconteceu.']
    ]}
  ];
  const STOP_WORDS = new Set('the to and of a in for that you it on with this as are at not he by from but my or we an your all so his they me one if can will just about up out more no only other before into she what when who their there which would her how some them also its our than him after two over any then these us back because well where much most even may here right too still off why such between around always under during few its does did am is was were be being have has had do'.split(' '));
  const SPACING = [0, 35_000, 90_000, 5 * 60_000, 20 * 60_000, 60 * 60_000, 3 * 60 * 60_000, 24 * 60 * 60_000, 3 * 24 * 60 * 60_000, 7 * 24 * 60 * 60_000, 30 * 24 * 60 * 60_000];
  const ACHIEVEMENTS = [
    { id:'first', icon:'🌱', name:'Primeira palavra', desc:'Completou sua primeira atividade.', done:s=>s.totalCorrect>=1 },
    { id:'combo5', icon:'⚡', name:'Ritmo ligado', desc:'Fez 5 acertos seguidos.', done:s=>s.bestCombo>=5 },
    { id:'words25', icon:'📚', name:'Caderno novo', desc:'Completou 25 atividades.', done:s=>s.totalCorrect>=25 },
    { id:'master', icon:'🎯', name:'Menos pistas', desc:'Praticou uma palavra até o nível 10 de pistas.', done:(s,c)=>c.some(x=>(s.cards[x.id]?.level??0)>=10) },
    { id:'words100', icon:'🏁', name:'Vai longe', desc:'Completou 100 atividades.', done:s=>s.totalCorrect>=100 },
    { id:'firstStage', icon:'🧩', name:'Primeira etapa', desc:'Concluiu uma etapa de trilha.', done:s=>Object.values(s.trackProgress||{}).some(p=>p.complete) },
    { id:'firstSentence', icon:'✍️', name:'Frase completa', desc:'Concluiu a etapa de frases de uma trilha.', done:s=>Object.entries(s.trackProgress||{}).some(([key,p])=>key.endsWith(':5')&&p.complete) },
    { id:'trailFinish', icon:'🏆', name:'Trilha concluída', desc:'Concluiu todas as etapas de uma trilha.', done:s=>tracks.some(track=>[1,2,3,4,5].every(n=>s.trackProgress?.[`${track.id}:${n}`]?.complete)) },
  ];

  const $ = (selector) => document.querySelector(selector);
  const ui = {
    wordCount:$('#word-count'), meaningCount:$('#meaning-count'), playView:$('#play-view'), tracksView:$('#tracks-view'), libraryView:$('#library-view'),
    meaning:$('#meaning'), cefr:$('#cefr-tag'), pos:$('#part-of-speech'), phraseCard:$('#phrase-card'), phrase:$('#phrase-text'), phraseLabel:$('#phrase-label'), phraseTranslation:$('#phrase-translation'),
    tiles:$('#letter-tiles'), hintCaption:$('#hint-caption'), level:$('#level-number'), round:$('#round-number'), promptKind:$('#prompt-kind'),
    trackBanner:$('#track-banner'), trackBannerTrack:$('#track-banner-track'), trackBannerStage:$('#track-banner-stage'), trackBannerCount:$('#track-banner-count'),
    modeSwitch:$('.mode-switch'), roundLabel:$('.round-label'), trackMap:$('#track-map'), trackXp:$('#track-xp-count'), trackAchievementCount:$('#track-achievement-count'), reviewDescription:$('#review-description'), startReviews:$('#start-reviews'),
    recognitionStart:$('#start-recognition'), listeningStart:$('#start-listening'), practiceNote:$('#practice-note'),
    form:$('#answer-form'), input:$('#answer-input'), feedback:$('#feedback'), reveal:$('#reveal-button'), skip:$('#skip-button'), pronounce:$('#pronounce-button'),
    report:$('#report-button'), phraseAudio:$('#phrase-audio'), preview:$('#phrase-preview'), previewText:$('#phrase-preview-text'), previewTranslation:$('#phrase-preview-translation'), previewAudio:$('#preview-audio'),
    submitButton:$('.submit-button'), submitLabel:$('#submit-label'), submitKey:$('#submit-key'),
    sound:$('#sound-toggle'), today:$('#today-count'), combo:$('#combo-count'), xp:$('#xp-count'), xpFill:$('#xp-fill'),
    achievementPreview:$('#achievement-preview'), librarySearch:$('#library-search'), libraryList:$('#library-list'), libraryResults:$('#library-results'),
    pageLabel:$('#page-label'), prev:$('#library-prev'), next:$('#library-next'), toast:$('#toast'), backdrop:$('#modal-backdrop'), modal:$('#modal'), modalContent:$('#modal-content'),
  };

  const emptyState = () => ({
    cards:{}, totalCorrect:0, totalWrong:0, totalAttempts:0, combo:0, bestCombo:0, xp:0,
    todaySolved:0, todayDate:'', dayStreak:0, lastPracticeDate:'', mode:'verbs', muted:false,
    unlocked:[], recentWords:[], answersSinceReview:0, trackProgress:{},
  });
  let state = loadState();
  let catalog = [];
  let activeCard = null;
  let tracks = [];
  let trackSession = null;
  let reviewSession = null;
  let reviewLookup = new Map();
  let relatedSenses = new Map();
  let activeIsReview = false;
  let selectedTrackId = 'trail-1';
  let awaitingContinue = false;
  let awaitingRecovery = false;
  let awaitingPreparation = false;
  let recoveryCardId = '';
  let catalogMode = 'verbs';
  let libraryFilter = 'all';
  let libraryPage = 0;
  let forcedCardId = '';
  let skippedThisTurn = new Set();
  let nextTimer = 0;
  let toastTimer = 0;
  let audioContext = null;

  function loadState(){
    try {
      const raw=localStorage.getItem(STORAGE_KEY);
      try{if(raw&&!localStorage.getItem(`${STORAGE_KEY}.before-learning-v2`)) localStorage.setItem(`${STORAGE_KEY}.before-learning-v2`,raw);}catch{}
      const restored=Object.assign(emptyState(), JSON.parse(raw || '{}'));
      restored.reports ||= [];
      for(const card of Object.values(restored.cards||{})) if(card?.seen && !card.nextAt && (card.level||0)===0) card.nextAt=Date.now();
      return restored;
    }
    catch { return emptyState(); }
  }
  function saveState(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state));return true; } catch {return false;} }
  function escapeHTML(value){ return String(value??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function normalize(value){ return String(value||'').toLocaleLowerCase('en-US').trim().replace(/[’‘]/g,"'").replace(/[^a-z'-]/g,''); }
  function normalizeSentence(value){
    const contractions={"i'm":'i am',"you're":'you are',"we're":'we are',"they're":'they are',"he's":'he is',"she's":'she is',"it's":'it is',"that's":'that is',"what's":'what is',"i've":'i have',"you've":'you have',"we've":'we have',"they've":'they have',"i'll":'i will',"you'll":'you will',"we'll":'we will',"they'll":'they will',"he'll":'he will',"she'll":'she will',"can't":'cannot',"won't":'will not',"don't":'do not',"doesn't":'does not',"didn't":'did not',"isn't":'is not',"aren't":'are not',"wasn't":'was not',"weren't":'were not',"couldn't":'could not',"wouldn't":'would not',"shouldn't":'should not'};
    return String(value||'').toLocaleLowerCase('en-US').replace(/[’‘]/g,"'").replace(/\b[a-z]+['’][a-z]+\b/g,word=>contractions[word]||word).replace(/[^a-z0-9]/g,'');
  }
  const SENTENCE_VARIANTS={
    'I am ready.':["I'm ready."],
    'You have a book.':["You've got a book.",'You have got a book.'],
    'We go home.':['We are going home.'],
    'Please open the door.':['Open the door, please.'],
    'Please close the window.':['Close the window, please.'],
    'Please tell me your name.':['Tell me your name, please.'],
    'Please show me the photo.':['Show me the photo, please.'],
    'Please send the file to me.':['Send the file to me, please.'],
    'Please listen to me.':['Listen to me, please.']
  };
  function localDate(date=new Date()){ return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
  function yesterday(dateKey){ const d=new Date(`${dateKey}T12:00:00`); d.setDate(d.getDate()-1); return localDate(d); }
  function progressFor(card){
    const own=state.cards[card.id];if(own?.seen)return own;
    const linked=relatedSenses.get(card.id)||[];
    return linked.map(id=>state.cards[id]).find(p=>p?.seen)||own||{level:0,seen:false,correct:0,wrong:0,nextAt:0};
  }
  function buildTracks(source){
    const bestByWord=new Map();
    for(const card of source){
      if(!/^[a-z]+(?:[-'][a-z]+)*$/i.test(card.word)||!card.meaning?.length) continue;
      const old=bestByWord.get(card.word);
      const score=x=>(x.pos==='curado'?100:0)+(x.cefr==='A1'?12:x.cefr==='A2'?8:x.cefr==='B1'?4:0)+(x.phrase?.text?2:0)+(x.zipf||0)/100;
      if(!old||score(card)>score(old)) bestByWord.set(card.word,card);
    }
    const verbs=VERB_ORDER.map(word=>bestByWord.get(word)).filter(Boolean);
    const others=[...bestByWord.values()].filter(card=>!VERB_SET.has(card.word)&&!STOP_WORDS.has(card.word.toLowerCase())&&card.word.length>2&&(card.cefr==='A1'||card.cefr==='A2'||card.cefr==='B1'))
      .sort((a,b)=>(b.zipf||0)-(a.zipf||0)||a.rank-b.rank||a.word.localeCompare(b.word));
    const wordDeck=[]; let verbIndex=0,otherIndex=0;
    while(wordDeck.length<400&&(verbIndex<verbs.length||otherIndex<others.length)){
      if(wordDeck.length%4===0&&verbIndex<verbs.length) wordDeck.push(verbs[verbIndex++]);
      else if(otherIndex<others.length) wordDeck.push(others[otherIndex++]);
      else if(verbIndex<verbs.length) wordDeck.push(verbs[verbIndex++]);
    }
    return TRACK_META.map((meta,trackIndex)=>{
      const words=wordDeck.slice(trackIndex*40,(trackIndex+1)*40);
      const stages=Array.from({length:4},(_,stageIndex)=>({
        number:stageIndex+1,title:stageIndex===0?'Primeiras 10 palavras e verbos':`Palavras ${stageIndex*10+1}–${stageIndex*10+10}`,
        kind:'word',items:words.slice(stageIndex*10,(stageIndex+1)*10).map(card=>({...card,challengeType:'word'}))
      }));
      stages.push({number:5,title:'Frases completas',kind:'phrase',items:meta.phrases.map(([text,meaning,aliases],index)=>({
        id:`phrase:trail-${trackIndex+1}:${index+1}`,word:text,meaning:[meaning],definition:'',phrase:null,cefr:'A1–B1',pos:'frase completa',challengeType:'sentence',aliases:[...(SENTENCE_VARIANTS[text]||[]),...(Array.isArray(aliases)?aliases:[])]
      }))});
      return {id:`trail-${trackIndex+1}`,number:trackIndex+1,...meta,stages};
    });
  }
  function appendExtraTracks(baseTracks,source){
    const byWord=new Map();
    for(const card of source) if(!byWord.has(card.word)||card.pos==='curado') byWord.set(card.word,card);
    const extra=Array.isArray(window.VocaExtraTracks)?window.VocaExtraTracks:[];
    const additions=extra.map((meta,index)=>{
      const number=TRACK_META.length+index+1,id=`trail-${number}`;
      const words=(meta.words||[]).map(word=>{
        const base=byWord.get(word)||{word,rank:10000,cefr:'EN',zipf:0,pos:'curado'};
        return {...base,id:`extra:${id}:${word}`,word,meaning:meta.glosses?.[word]?[meta.glosses[word]]:(base.meaning||[]),definition:'',phrase:meta.examples?.[word]||null,challengeType:'word',category:meta.title,pos:'curado',cefr:'EN',curated:true,aliases:meta.wordAliases?.[word]||[]};
      });
      const stages=Array.from({length:4},(_,stageIndex)=>({number:stageIndex+1,title:stageIndex===0?'Primeiras 10 palavras e verbos':`Palavras ${stageIndex*10+1}–${stageIndex*10+10}`,kind:'word',items:words.slice(stageIndex*10,(stageIndex+1)*10)}));
      stages.push({number:5,title:'Frases completas',kind:'phrase',items:(meta.phrases||[]).map(([text,meaning,aliases],phraseIndex)=>({id:`phrase:${id}:${phraseIndex+1}`,word:text,meaning:[meaning],definition:'',phrase:null,cefr:'EN',pos:'frase completa',challengeType:'sentence',aliases:Array.isArray(aliases)?aliases:[]}))});
      return {id,number,title:meta.title,icon:meta.icon,description:meta.description,phrases:meta.phrases,stages};
    });
    return [...baseTracks,...additions];
  }
  // Keep started legacy stages unchanged. New stages use explicitly selected themes.
  function alignLegacyTracks(baseTracks,allTracks){
    const topics=[[2,0],[0,1],[1,0],[2,5],[5,6],[3,4],[4,5],[2,7],[9,1],[4,6]];
    const focus=[
      'be have want need go like help water book home friend family people name day good new small time work',
      'wake sleep eat drink breakfast lunch dinner work study clean wash walk home day morning night food water',
      'house home room bedroom bathroom kitchen door window table chair fridge stove food cook eat drink bread milk',
      'talk listen speak tell ask answer question name hello meet understand explain message call help please thank',
      'study learn work school student teacher book class word meaning language company team meeting project task write read',
      'street road city bus train station airport hotel map address direction left right near far walk drive travel arrive leave',
      'plan goal hope want need choose start finish tomorrow week travel trip meet call study learn work money',
      'feel love like hope good bad better help care family friend people kind together share hug listen meet thank',
      'story remember understand think know find change move leave come go meet tell read write day night yesterday home family',
      'go come take bring give make do use want need help think understand remember learn speak tell ask travel work'
    ].map(s=>s.split(' '));
    const preferred=new Map(catalog.filter(c=>c.curated).map(c=>[c.word,c]));
    for(let i=0;i<baseTracks.length;i++){
      const track=baseTracks[i], candidates=topics[i].flatMap(n=>allTracks[10+n].stages.slice(0,4).flatMap(s=>s.items));
      const byWord=new Map(candidates.map(c=>[c.word,c]));
      const chosen=focus[i].map(w=>preferred.get(w)||byWord.get(w)).filter(Boolean);
      const first=new Map();for(const card of [...chosen,...candidates])if(!first.has(card.word))first.set(card.word,card);
      const unique=[...first.values()];
      const selected=unique.slice(0,40).map(c=>({...c,id:`themed:${track.id}:${c.word}`,category:track.title}));
      for(let n=0;n<4;n++){
        const record=state.trackProgress?.[`${track.id}:${n+1}`];
        if(!record?.complete&&!record?.solved?.length) track.stages[n].items=selected.slice(n*10,n*10+10);
      }
    }
  }
  function rebuildReviewLookup(){
    reviewLookup=new Map(catalog.map(card=>[card.id,card]));
    for(const track of tracks) for(const stage of track.stages) for(const card of stage.items) reviewLookup.set(card.id,card);
    const groups=new Map();relatedSenses=new Map();
    for(const card of reviewLookup.values()){
      if(card.challengeType==='sentence'||!card.category||card.meaning?.length!==1)continue;
      const key=`${normalize(card.word)}:${card.meaning[0].trim().toLocaleLowerCase('pt-BR')}`;
      const ids=groups.get(key)||[];ids.push(card.id);groups.set(key,ids);
    }
    for(const ids of groups.values()) if(ids.length>1) for(const id of ids) relatedSenses.set(id,ids.filter(other=>other!==id));
  }
  function dueReviews(now=Date.now()){
    const entries=Object.entries(state.cards||{}).filter(([id,p])=>p?.seen&&p.nextAt>0&&p.nextAt<=now&&reviewLookup.has(id)).sort((a,b)=>Number(Boolean(b[1].lastAssisted))-Number(Boolean(a[1].lastAssisted))||a[1].nextAt-b[1].nextAt);
    const visited=new Set(),cards=[];
    for(const [id] of entries){if(visited.has(id))continue;cards.push(reviewLookup.get(id));visited.add(id);for(const other of relatedSenses.get(id)||[])visited.add(other);}
    return cards;
  }
  function syncRelatedSchedule(id,next){
    for(const other of relatedSenses.get(id)||[]){const old=state.cards[other];if(old?.seen)state.cards[other]={...old,nextAt:next.nextAt,remembered:Boolean(next.remembered),lastAssisted:Boolean(next.lastAssisted)};}
  }
  function refreshReviewSummary(){
    const count=dueReviews().length;
    ui.reviewDescription.textContent=count?`${count} ${count===1?'cartão esperando':'cartões esperando'} por você. Cada sessão revisa até 10.`:(Object.values(state.cards||{}).some(p=>p?.seen)?'Tudo em dia! Suas palavras voltam aqui na hora certa.':'Depois das primeiras atividades, suas revisões aparecem aqui.');
    ui.startReviews.disabled=count===0;
  }
  function startReviewSession(){
    const queue=dueReviews().slice(0,10);
    if(!queue.length){refreshReviewSummary();return;}
    trackSession=null;reviewSession={queue,done:new Set()};activeIsReview=true;skippedThisTurn.clear();
    activeCard=chooseNext();setView('play',{preserveTrack:true});renderGame();
  }
  function refreshPracticeOptions(){
    const available=Boolean(window.VocaRecognition?.open);
    const audio=available&&window.VocaRecognition.audioAvailable();
    ui.recognitionStart.disabled=!available;
    ui.listeningStart.disabled=!audio;
    const learned=new Set(catalog.filter(card=>card.curated&&state.cards[card.id]?.seen).map(card=>card.word)).size;
    ui.practiceNote.textContent=!available?'Atividades de reconhecimento indisponíveis neste momento.':!audio?'A escuta depende da voz do navegador; você ainda pode reconhecer palavras.':learned?`Use palavras já vistas (${learned}) em outra atividade.`:'Comece com palavras selecionadas para conhecer o exercício.';
  }
  function startRecognition(mode){
    const module=window.VocaRecognition;
    if(!module?.open){showToast('Esta atividade não está disponível agora.');return;}
    const pool=catalog.filter(card=>card.curated&&card.challengeType!=='sentence');
    const seen=pool.filter(card=>state.cards[card.id]?.seen);
    const targets=seen.length?seen:pool.slice(0,10);
    const result=module.open({cards:pool,targetCards:targets,mode,
      onAnswer(card,correct){
        const old=progressFor(card),now=Date.now();
        const due=correct?(old.nextAt||now+SPACING[3]):Math.min(old.nextAt||Infinity,now+SPACING[1]);
        state.cards[card.id]={...old,seen:true,firstSeenDate:old.firstSeenDate||localDate(),nextAt:due,recognitionCorrect:(old.recognitionCorrect||0)+(correct?1:0),recognitionWrong:(old.recognitionWrong||0)+(correct?0:1)};
        state.totalAttempts=(state.totalAttempts||0)+1;
        if(correct){state.totalCorrect=(state.totalCorrect||0)+1;state.combo=(state.combo||0)+1;state.bestCombo=Math.max(state.bestCombo||0,state.combo);state.xp=(state.xp||0)+5;dayProgress();playSound('correct');}
        else{state.totalWrong=(state.totalWrong||0)+1;state.combo=0;playSound('wrong');}
        checkAchievements();saveState();renderSideStats();refreshReviewSummary();
      },
      onClose(){renderTracks();refreshPracticeOptions();}
    });
    if(!result.started) showToast(result.reason||'Não foi possível iniciar a atividade.');
  }
  function stageProgress(trackId,stageNumber){
    state.trackProgress ||= {};
    const key=`${trackId}:${stageNumber}`;
    if(!state.trackProgress[key]) state.trackProgress[key]={solved:[],complete:false};
    return state.trackProgress[key];
  }
  function stageIsComplete(trackId,stageNumber){return Boolean(state.trackProgress?.[`${trackId}:${stageNumber}`]?.complete);}
  function stageIsUnlocked(trackIndex,stageIndex){
    if(trackIndex===0&&stageIndex===0) return true;
    if(stageIndex>0) return stageIsComplete(`trail-${trackIndex+1}`,stageIndex);
    if(trackIndex>=TRACK_META.length) return true;
    return stageIsComplete(`trail-${trackIndex}`,5);
  }
  function startTrackStage(trackId,stageNumber){
    const track=tracks.find(item=>item.id===trackId),stage=track?.stages.find(item=>item.number===stageNumber);
    if(!track||!stage||!stageIsUnlocked(track.number-1,stageNumber-1)) return;
    const record=stageProgress(track.id,stage.number);
    selectedTrackId=track.id;
    reviewSession=null;activeIsReview=false;
    trackSession={track,stage,isReplay:Boolean(record.complete),sessionSolved:new Set(),reviewed:new Set(),introduced:new Set()};
    skippedThisTurn.clear();
    activeCard=chooseNext();
    setView('play',{preserveTrack:true});
    renderGame();
  }
  function renderTracks(){
    if(!tracks.length) return;
    refreshReviewSummary();
    ui.trackMap.setAttribute('aria-label',`Mapa com ${tracks.length} trilhas e suas etapas`);
    ui.trackXp.textContent=(state.xp||0).toLocaleString('pt-BR');
    ui.trackAchievementCount.textContent=`${(state.unlocked||[]).length}/${ACHIEVEMENTS.length}`;
    refreshPracticeOptions();
    const xs=[50,67,50,33,50],ys=[15.74,33.33,50.93,68.52,86.11];
    const road='M 250 85 C 288 100 335 130 335 180 S 250 225 250 275 S 165 320 165 370 S 205 435 250 465';
    ui.trackMap.innerHTML=tracks.map(track=>{
      const completed=track.stages.filter(stage=>stageIsComplete(track.id,stage.number)).length;
      const currentIndex=track.stages.findIndex(stage=>!stageIsComplete(track.id,stage.number));
      const currentRecord=currentIndex>=0?stageProgress(track.id,currentIndex+1):null;
      const partial=currentIndex>=0&&stageIsUnlocked(track.number-1,currentIndex)?(currentRecord?.solved.length||0)*20:0;
      const progressUnits=Math.min(1000,completed*200+partial);
      const trailOpen=stageIsUnlocked(track.number-1,0);
      const trailClass=completed===5?'is-complete':trailOpen?'is-open':'is-locked';
      const nodes=track.stages.map((stage,index)=>{
        const record=stageProgress(track.id,stage.number),solved=record.solved.length,complete=stageIsComplete(track.id,stage.number),unlocked=stageIsUnlocked(track.number-1,index),current=unlocked&&!complete;
        const icon=complete?'✓':!unlocked?'🔒':stage.kind==='phrase'?'✎':'★';
        const status=complete?'Concluída':solved?`${solved}/10 atividades`:(stage.kind==='phrase'?'10 frases':'10 palavras e verbos');
        const caption=complete?'Revisar':!unlocked?'Bloqueada':stage.kind==='phrase'?'Frases completas':`${solved}/10 atividades`;
        return `<div class="trail-node-wrap ${complete?'is-complete':''} ${current?'is-current':''} ${unlocked?'':'is-locked'}" style="--node-x:${xs[index]}%;--node-y:${ys[index]}%">
          ${current?'<span class="trail-node-callout" aria-hidden="true">COMEÇAR</span>':''}
          <button class="trail-node" data-track-stage="${track.id}" data-stage-number="${stage.number}" type="button" ${unlocked?'':'disabled'} aria-label="Trilha ${track.number}, etapa ${stage.number}: ${escapeHTML(stage.title)}. ${status}">
            <span class="trail-node-core" style="--node-progress:${Math.min(100,solved*10)}%"><span>${icon}</span></span>
          </button>
          <span class="trail-node-label" data-track-stage="${track.id}" data-stage-number="${stage.number}" aria-hidden="true"><strong>${stage.kind==='phrase'?'Frases':'Etapa '+stage.number}</strong><em>${caption}</em></span>
        </div>`;
      }).join('');
      return `<section class="trail-map-section ${trailClass} ${track.id===selectedTrackId?'is-focused':''}" data-trail-id="${track.id}" aria-labelledby="trail-title-${track.number}">
        <header class="trail-map-heading"><div class="trail-heading-copy"><small>TRILHA ${String(track.number).padStart(2,'0')} ${trailOpen?'':'· BLOQUEADA'}</small><h2 id="trail-title-${track.number}">${escapeHTML(track.title)}</h2><p>${escapeHTML(track.description)}</p></div><span class="trail-stage-score">${completed}/5 <small>etapas</small></span></header>
        <div class="trail-map-route"><svg class="trail-road" viewBox="0 0 500 540" preserveAspectRatio="none" aria-hidden="true"><path class="trail-road-base" d="${road}" pathLength="1000"/><path class="trail-road-progress" d="${road}" pathLength="1000" style="stroke-dasharray:${progressUnits} 1000"/></svg>${nodes}</div>
      </section>`;
    }).join('');
    ui.trackMap.querySelectorAll('[data-track-stage]').forEach(button=>button.addEventListener('click',()=>startTrackStage(button.dataset.trackStage,Number(button.dataset.stageNumber))));
  }
  function currentPool(){
    if(catalogMode!=='verbs') return catalog;
    const order=new Map(VERB_ORDER.map((word,index)=>[word,index]));
    return catalog.filter(card=>VERB_SET.has(card.word)).sort((a,b)=>order.get(a.word)-order.get(b.word)||a.id.localeCompare(b.id));
  }
  function updateModeButtons(){ document.querySelectorAll('.mode-button').forEach(b=>b.classList.toggle('is-active',b.dataset.mode===catalogMode)); }

  async function start(){
    try {
      const response=await fetch('./catalog.json',{cache:'force-cache'});
      if(!response.ok) throw new Error('catalog unavailable');
      const originalCatalog=await response.json();
      if(!originalCatalog.length) throw new Error('catalog empty');
      const originalTracks=buildTracks(originalCatalog);
      catalog=window.VocaCuratedCards?.apply?window.VocaCuratedCards.apply(originalCatalog):originalCatalog;
      const curatedById=new Map(catalog.map(card=>[card.id,card]));
      for(const track of originalTracks) for(const stage of track.stages) if(stage.kind==='word') stage.items=stage.items.map(card=>({...card,...(curatedById.get(card.id)||{}),...(window.VocaLegacyExamples?.[card.word]||{}),challengeType:'word'}));
      tracks=appendExtraTracks(originalTracks,catalog);
      alignLegacyTracks(originalTracks,tracks);
      for(const track of tracks) for(const stage of track.stages) if(stage.kind==='word') for(const card of stage.items) if(card.id.startsWith('extra:')||card.id.startsWith('themed:')) catalog.push(card);
      rebuildReviewLookup();
      const currentTrack=tracks.find(track=>!stageIsComplete(track.id,5)&&stageIsUnlocked(track.number-1,0))||tracks[tracks.length-1];
      selectedTrackId=currentTrack?.id||'trail-1';
      const words=new Set(catalog.map(card=>card.word));
      ui.wordCount.textContent=words.size.toLocaleString('pt-BR');
      ui.meaningCount.textContent=catalog.length.toLocaleString('pt-BR');
      catalogMode=state.mode==='all'?'all':'verbs';
      updateModeButtons();
      ui.sound.setAttribute('aria-pressed',String(!state.muted));
      ui.sound.classList.toggle('is-muted',state.muted);
      ui.sound.setAttribute('aria-label',state.muted?'Ligar sons':'Desligar sons');
      ui.sound.querySelector('.sound-label').textContent=state.muted?'Som desligado':'Som ligado';
      renderTracks();
      renderSideStats();
      activeCard=chooseNext();
      renderGame();
      bindEvents();
      setInterval(()=>{if(!ui.tracksView.hidden)refreshReviewSummary();},30_000);
      if(selectedTrackId!=='trail-1') requestAnimationFrame(()=>ui.trackMap.querySelector(`[data-trail-id="${selectedTrackId}"]`)?.scrollIntoView({block:'center'}));
    } catch {
      ui.meaning.textContent='Não consegui carregar as palavras.';
      ui.pos.textContent='Atualize a página para tentar novamente.';
    }
  }

  function chooseNext(){
    activeIsReview=false;
    if(reviewSession){
      const pending=reviewSession.queue.filter(card=>!reviewSession.done.has(card.id));
      let next=pending.find(card=>!skippedThisTurn.has(card.id));
      if(!next&&pending.length){skippedThisTurn.clear();next=pending[0];}
      activeIsReview=true;
      return next||null;
    }
    if(trackSession){
      const record=stageProgress(trackSession.track.id,trackSession.stage.number);
      const solved=trackSession.isReplay?trackSession.sessionSolved:new Set(record.solved);
      const incomplete=trackSession.stage.items.filter(item=>!solved.has(item.id));
      const unfinishedIds=new Set(incomplete.map(card=>card.id));
      if(!trackSession.isReplay&&(state.answersSinceReview||0)>=4){
        const due=dueReviews().find(card=>!unfinishedIds.has(card.id)&&!trackSession.reviewed.has(card.id)&&!skippedThisTurn.has(card.id));
        if(due){activeIsReview=true;return due;}
      }
      let available=incomplete.find(item=>!skippedThisTurn.has(item.id));
      if(!available&&incomplete.length){skippedThisTurn.clear();available=incomplete[0];}
      return available||trackSession.stage.items[0]||null;
    }
    const pool=currentPool();
    if(!pool.length) return null;
    if(forcedCardId){ const found=pool.find(x=>x.id===forcedCardId)||catalog.find(x=>x.id===forcedCardId); forcedCardId=''; if(found) return found; }
    const now=Date.now();
    const due=pool.filter(card=>{
      const p=state.cards[card.id];
      return p?.seen && p.nextAt>0 && p.nextAt<=now && !skippedThisTurn.has(card.id);
    }).sort((a,b)=>(state.cards[a.id].nextAt-state.cards[b.id].nextAt));
    if(due.length && state.answersSinceReview>=6){activeIsReview=true;return due[0];}
    const recent=new Set((state.recentWords||[]).slice(-5));
    const unseen=pool.filter(card=>!progressFor(card).seen && !skippedThisTurn.has(card.id));
    if(unseen.length){
      const next=unseen.find(card=>!recent.has(card.word))||unseen[0];
      return next;
    }
    const review=due[0]||pool.filter(card=>!skippedThisTurn.has(card.id)).sort((a,b)=>{
      const pa=progressFor(a),pb=progressFor(b);
      return pa.level-pb.level || pa.nextAt-pb.nextAt;
    })[0];
    if(review){activeIsReview=Boolean(due[0]);return review;}
    skippedThisTurn.clear();
    return pool[0];
  }

  function renderGame(){
    if(!activeCard) return;
    awaitingContinue=false;
    awaitingRecovery=false;
    awaitingPreparation=false;
    ui.submitLabel.textContent='Conferir';
    ui.submitKey.textContent='↵';
    ui.submitLabel.textContent='Conferir';
    ui.submitKey.textContent='↵';
    const inTrack=Boolean(trackSession),isSentence=activeCard.challengeType==='sentence';
    const p=progressFor(activeCard);
    const level=Math.max(0,Math.min(10,p.level||0));
    const preparing=isSentence&&inTrack&&!activeIsReview&&!p.seen&&!trackSession.introduced.has(activeCard.id);
    const modeLabel=preparing?'observe a frase antes de praticar':isSentence?'frase completa · escreva tudo':inTrack?friendlyPos(activeCard.pos):catalogMode==='verbs'?'verbo + complemento':(activeCard.pos==='curado'?'significado do dia':friendlyPos(activeCard.pos));
    const hasBanner=inTrack||Boolean(reviewSession)||activeIsReview;
    ui.modeSwitch.hidden=hasBanner;
    ui.roundLabel.hidden=hasBanner;
    ui.trackBanner.hidden=!hasBanner;
    if(activeIsReview){
      ui.trackBannerTrack.textContent='REVISÃO ESPAÇADA';
      ui.trackBannerStage.textContent=inTrack?`ENTRE AS ATIVIDADES · ${trackSession.track.title}`:'RELEMBRE O QUE JÁ PRATICOU';
      ui.trackBannerCount.textContent=reviewSession?`${Math.min(reviewSession.queue.length,reviewSession.done.size+1)}/${reviewSession.queue.length}`:'REVISÃO';
    }else if(inTrack){
      const record=stageProgress(trackSession.track.id,trackSession.stage.number);
      const solvedCount=trackSession.isReplay?trackSession.sessionSolved.size:record.solved.length;
      ui.trackBannerTrack.textContent=`TRILHA ${String(trackSession.track.number).padStart(2,'0')} · ${trackSession.track.title.toUpperCase()}`;
      ui.trackBannerStage.textContent=`ETAPA ${trackSession.stage.number}/5 · ${trackSession.stage.title}`;
      ui.trackBannerCount.textContent=`${Math.min(10,solvedCount+1)}/10`;
    }
    ui.meaning.textContent=(activeCard.meaning||[]).join(' · ')||'significado em português';
    ui.cefr.textContent=activeCard.cefr||'EN';
    ui.pos.textContent=modeLabel;
    ui.level.textContent=String(level);
    ui.round.textContent=String(state.totalAttempts+1).padStart(2,'0');
    ui.promptKind.textContent=isSentence?'SIGNIFICADO DA FRASE':'SIGNIFICADO EM PORTUGUÊS';
    const showPhrase=preparing||(!isSentence&&Boolean(activeCard.phrase?.text)&&level<10);
    ui.phraseCard.hidden=!showPhrase;
    ui.phraseLabel.textContent=preparing?'ESTUDE A FRASE':'NA FRASE';
    if(showPhrase) ui.phrase.textContent=preparing?activeCard.word:activeCard.phrase.text;
    const translation=!preparing&&showPhrase?activeCard.phrase?.translation:'';
    ui.phraseTranslation.hidden=!translation;
    ui.phraseTranslation.textContent=translation||'';
    const stageIndex=inTrack?trackSession.stage.number-1:0;
    const previewOffset=[0,3,6,8][stageIndex], previewCount=[3,3,2,2][stageIndex];
    const position=inTrack?Math.max(0,trackSession.stage.items.findIndex(c=>c.id===activeCard.id)):0;
    const sentencePreview=inTrack&&!isSentence&&!activeIsReview&&level===0?trackSession.track.phrases?.[previewOffset+Math.floor(position*previewCount/10)]:null;
    ui.preview.hidden=!sentencePreview;
    if(sentencePreview){ui.previewText.textContent=sentencePreview[0];ui.previewTranslation.textContent=sentencePreview[1];}
    ui.phraseAudio.hidden=!('speechSynthesis' in window);
    ui.previewAudio.hidden=!('speechSynthesis' in window);
    ui.pronounce.hidden=isSentence&&!preparing;
    ui.tiles.hidden=isSentence;
    if(!isSentence) renderTiles(activeCard.word,level);
    ui.hintCaption.textContent=preparing?'leia a frase; depois tente escrevê-la pelo significado':isSentence?'escreva a frase inteira em inglês':level===0?'copie a palavra para conhecer a grafia':level===10?'só o significado — você consegue':'as letras vão sumindo aos poucos';
    ui.feedback.hidden=true; ui.feedback.textContent=''; ui.report.hidden=true;
    ui.input.value='';
    $('#answer-label').textContent=isSentence?'Digite a frase em inglês':'Digite a palavra em inglês';
    ui.input.placeholder=isSentence?'escreva a frase completa…':'digite aqui…';
    document.querySelector('.game-card').classList.remove('is-success','is-error');
    ui.input.disabled=false;
    ui.form.querySelector('.submit-button').disabled=false;
    if(preparing){
      awaitingPreparation=true;ui.input.disabled=true;ui.submitLabel.textContent='Praticar';ui.submitKey.textContent='Enter';ui.meaning.tabIndex=-1;ui.meaning.focus({preventScroll:true});
    }else ui.input.focus({preventScroll:true});
  }

  function renderTiles(word,level,typed=''){
    const visible=level===0?word.length:level===10?0:Math.max(1,Math.floor(word.length*(10-level)/10));
    const typedChars=[...normalize(typed)];
    const letters=[...word];
    if(ui.tiles.children.length!==letters.length){
      ui.tiles.replaceChildren(...letters.map(()=>{const tile=document.createElement('span');tile.setAttribute('aria-hidden','true');tile.appendChild(document.createElement('span'));return tile;}));
    }
    letters.forEach((char,index)=>{
      const tile=ui.tiles.children[index];
      const entered=typedChars[index];
      const hintVisible=index<visible;
      tile.className='letter-tile'+(entered?' is-typed':hintVisible?' is-hint':' is-hidden');
      tile.style.animationDelay=`${Math.min(index*24,180)}ms`;
      tile.firstElementChild.textContent=entered||(hintVisible?char:'·');
    });
  }

  function friendlyPos(pos){
    const map={'n.':'substantivo','v.':'verbo','adj.':'adjetivo','adv.':'advérbio','prep.':'preposição','pron.':'pronome','det.':'determinante','conj.':'conjunção','interj.':'interjeição','curado':'palavra do cotidiano'};
    return map[pos]||map[`${pos}.`]||'palavra do cotidiano';
  }

  function handleAnswer(event){
    event.preventDefault();
    if(awaitingPreparation){beginPhrasePractice();return;}
    if(awaitingRecovery){retryAfterFeedback();return;}
    if(awaitingContinue){advanceAfterCorrect();return;}
    if(!activeCard||ui.input.disabled) return;
    const answer=activeCard.challengeType==='sentence'?normalizeSentence(ui.input.value):normalize(ui.input.value);
    if(!answer){ ui.input.focus(); return; }
    const normalizeAnswer=activeCard.challengeType==='sentence'?normalizeSentence:normalize;
    const expected=[activeCard.word,...(activeCard.aliases||[])].map(normalizeAnswer);
    state.totalAttempts+=1;
    if(expected.includes(answer)) onCorrect(); else onWrong(false,ui.input.value);
    saveState();
    renderSideStats();
    renderGameResult();
  }

  function dayProgress(){
    const today=localDate();
    if(state.todayDate!==today){ state.todayDate=today; state.todaySolved=0; }
    if(state.lastPracticeDate!==today){
      state.dayStreak=state.lastPracticeDate===yesterday(today)?(state.dayStreak||0)+1:1;
      state.lastPracticeDate=today;
    }
    state.todaySolved=(state.todaySolved||0)+1;
  }

  function onCorrect(){
    const old=progressFor(activeCard);
    const copied=activeCard.challengeType!=='sentence'&&(old.level||0)===0;
    const assisted=recoveryCardId===activeCard.id;
    const justPrepared=activeCard.challengeType==='sentence'&&!old.seen&&Boolean(trackSession?.introduced.has(activeCard.id));
    const normalization=activeCard.challengeType==='sentence'?normalizeSentence:normalize;
    const isAlternate=normalization(ui.input.value)!==normalization(activeCard.word);
    const alternateWord=isAlternate&&activeCard.challengeType!=='sentence';
    const next=window.VocaLearning.correct(old,{today:localDate(),now:Date.now(),sentence:activeCard.challengeType==='sentence',assisted,prepared:justPrepared,alternate:alternateWord});
    const newLevel=next.level;
    state.cards[activeCard.id]=next;
    syncRelatedSchedule(activeCard.id,next);
    state.totalCorrect+=1; state.combo=(state.combo||0)+1; state.bestCombo=Math.max(state.bestCombo||0,state.combo); state.xp+=10+Math.min(10,old.level||0); state.answersSinceReview=activeIsReview?0:(state.answersSinceReview||0)+1;
    dayProgress();
    state.recentWords=[...(state.recentWords||[]).filter(word=>word!==activeCard.word),activeCard.word].slice(-8);
    playSound(newLevel===10?'level':'correct');
    const gloss=escapeHTML((activeCard.meaning||[]).join(' · '));
    const answerLabel=activeCard.challengeType==='sentence'?'Frase completa':'Palavra';
    const progressMessage=alternateWord?'Resposta válida! Vamos praticar também a palavra exibida.':assisted||justPrepared?'Praticou com ajuda. Vamos revisar novamente em breve.':copied?'Você conheceu a grafia. Voltaremos a ela em breve.':next.remembered?'Lembrada sem pistas em outro dia!':`Pistas: ${newLevel}/10`;
    const alternate=isAlternate?`<span class="feedback-meaning">Sua resposta também está correta: ${escapeHTML(ui.input.value)}</span>`:'';
    let message=`Muito bem! <strong>${answerLabel}: ${escapeHTML(activeCard.word)}</strong>${alternate}<span class="feedback-meaning">Significado: ${gloss}</span><span class="feedback-level">${progressMessage}</span><span class="feedback-continue">↵ Aperte Enter para continuar</span>`;
    if(activeIsReview){
      if(trackSession) trackSession.reviewed.add(activeCard.id);
      if(reviewSession) reviewSession.done.add(activeCard.id);
    }else if(trackSession){
      const record=stageProgress(trackSession.track.id,trackSession.stage.number);
      if(!record.solved.includes(activeCard.id)) record.solved.push(activeCard.id);
      trackSession.sessionSolved.add(activeCard.id);
      if(!record.complete&&record.solved.length>=trackSession.stage.items.length){record.complete=true;message+=`<span class="feedback-level">Etapa concluída! A próxima já está liberada.</span>`;playSound('achievement');}
      renderTracks();
    }
    setFeedback(message,false);
    recoveryCardId='';
    if(newLevel===10) document.body.classList.add('celebrate');
    checkAchievements();
    awaitingContinue=true;
    ui.input.disabled=true;
    ui.submitButton.disabled=false;
    ui.submitLabel.textContent='Próxima';
    ui.submitKey.textContent='Enter';
    document.querySelector('.game-card').classList.add('is-success');
    ui.meaning.tabIndex=-1;
    ui.meaning.focus({preventScroll:true});
  }

  function onWrong(reveal=false,typed=''){
    const old=progressFor(activeCard);
    state.cards[activeCard.id]=window.VocaLearning.wrong(old,{today:localDate(),now:Date.now()});
    syncRelatedSchedule(activeCard.id,state.cards[activeCard.id]);
    ui.report.hidden=reveal;
    ui.report.dataset.answer=typed;
    state.totalWrong+=1; state.combo=0; state.answersSinceReview=(state.answersSinceReview||0)+1;
    playSound('wrong');
    const typedMessage=!reveal&&typed?`<span class="feedback-meaning">Sua resposta: ${escapeHTML(typed)}</span>`:'';
    setFeedback(`${reveal?'Resposta':'Quase! A resposta é'}: <strong>${escapeHTML(activeCard.word)}</strong>${typedMessage}<span class="feedback-meaning">Significado: ${escapeHTML((activeCard.meaning||[]).join(' · '))}</span><span class="feedback-continue">↵ Leia com calma e aperte Enter para tentar novamente</span>`,true);
    document.querySelector('.game-card').classList.add('is-error');
    recoveryCardId=activeCard.id;awaitingRecovery=true;ui.input.disabled=true;ui.submitButton.disabled=false;ui.submitLabel.textContent='Tentar de novo';ui.submitKey.textContent='Enter';ui.meaning.tabIndex=-1;ui.meaning.focus({preventScroll:true});
  }

  function renderGameResult(){
    const level=progressFor(activeCard).level||0;
    ui.level.textContent=String(level);
    if(activeCard.challengeType==='sentence') ui.tiles.hidden=true;
    else renderTiles(activeCard.word,awaitingContinue?0:level,awaitingContinue?'':ui.input.value);
    if(trackSession&&!activeIsReview){const record=stageProgress(trackSession.track.id,trackSession.stage.number),solvedCount=trackSession.isReplay?trackSession.sessionSolved.size:record.solved.length,position=awaitingContinue?Math.max(1,solvedCount):Math.min(10,solvedCount+1);ui.trackBannerCount.textContent=`${position}/10`;}
  }

  function beginPhrasePractice(){
    if(!awaitingPreparation||!trackSession) return;
    trackSession.introduced.add(activeCard.id);awaitingPreparation=false;renderGame();
  }
  function retryAfterFeedback(){
    if(!awaitingRecovery)return;
    awaitingRecovery=false;renderGame();
  }

  function advanceAfterCorrect(){
    if(!awaitingContinue) return;
    awaitingContinue=false;
    document.body.classList.remove('celebrate');
    skippedThisTurn=new Set();
    if(reviewSession){
      if(reviewSession.done.size>=reviewSession.queue.length){reviewSession=null;activeIsReview=false;setView('tracks');showToast('Revisão concluída! As palavras voltarão no momento certo.');return;}
      activeCard=chooseNext();renderGame();return;
    }
    if(trackSession){
      const record=stageProgress(trackSession.track.id,trackSession.stage.number);
      const solved=trackSession.isReplay?trackSession.sessionSolved.size:record.solved.length;
      if(solved>=trackSession.stage.items.length){
        const finished=trackSession;
        trackSession=null; selectedTrackId=finished.stage.number===5&&!finished.isReplay&&finished.track.number<tracks.length?`trail-${finished.track.number+1}`:finished.track.id; setView('tracks');
        showStageSummary(finished);
        return;
      }
    }
    activeCard=chooseNext();
    renderGame();
  }

  function setFeedback(html,isError){
    ui.feedback.innerHTML=html;
    ui.feedback.classList.toggle('is-error',isError);
    ui.feedback.hidden=false;
  }
  function showStageSummary(session){
    const cards=session.stage.items, known=cards.filter(c=>progressFor(c).seen).length;
    const recalled=cards.filter(c=>window.VocaLearning.status(progressFor(c))==='remembered');
    const pending=cards.filter(c=>progressFor(c).seen&&window.VocaLearning.status(progressFor(c))!=='remembered');
    const noun=session.stage.kind==='phrase'?'frases':'palavras';
    const list=items=>items.length?items.map(c=>escapeHTML(c.word)).join(' · '):'nenhuma ainda';
    ui.modalContent.innerHTML=`<p class="overline">ETAPA CONCLUÍDA</p><h2 id="modal-title">Bom trabalho!</h2><p class="modal-intro">${known} ${noun} conhecidas · ${recalled.length} lembradas sem pistas em outro dia · ${pending.length} em prática.</p><p><strong>Lembradas:</strong> ${list(recalled)}.</p><p><strong>Em prática:</strong> ${list(pending)}.</p><p>As revisões continuam no seu ritmo. Conhecer uma resposta é o primeiro passo para lembrá-la depois.</p><button class="modal-cta" data-close-modal type="button">Continuar pela trilha</button>`;
    ui.backdrop.hidden=false;document.body.style.overflow='hidden';$('#modal-close').focus();
  }

  function revealAnswer(){
    if(!activeCard||ui.input.disabled) return;
    state.totalAttempts+=1;onWrong(true,ui.input.value);saveState();renderSideStats();renderGameResult();
  }

  function skipCard(){
    if(!activeCard||ui.input.disabled) return;
    if(activeIsReview&&trackSession){trackSession.reviewed.add(activeCard.id);state.answersSinceReview=0;saveState();}
    recoveryCardId='';
    skippedThisTurn.add(activeCard.id);
    clearTimeout(nextTimer); activeCard=chooseNext(); renderGame();
  }

  function checkAchievements(){
    for(const achievement of ACHIEVEMENTS){
      if(!state.unlocked.includes(achievement.id)&&achievement.done(state,catalog)){
        state.unlocked.push(achievement.id);
        playSound('achievement');
        showToast(`Conquista liberada: ${achievement.name} ${achievement.icon}`);
      }
    }
  }

  function renderSideStats(){
    const today=localDate();
    ui.today.textContent=String(state.todayDate===today?(state.todaySolved||0):0);
    ui.combo.innerHTML=`${state.combo||0}<span class="tiny-fire">✦</span>`;
    ui.xp.textContent=(state.xp||0).toLocaleString('pt-BR');
    ui.xpFill.style.width=`${(state.xp||0)%100}%`;
    const unlocked=new Set(state.unlocked||[]);
    ui.achievementPreview.innerHTML=ACHIEVEMENTS.slice(0,3).map(a=>`<div class="achievement-chip ${unlocked.has(a.id)?'is-unlocked':''}" title="${escapeHTML(a.desc)}"><span class="achievement-icon">${a.icon}</span><span>${escapeHTML(a.name)}</span></div>`).join('');
  }

  function showToast(message){
    ui.toast.textContent=message; ui.toast.hidden=false; clearTimeout(toastTimer); toastTimer=setTimeout(()=>ui.toast.hidden=true,2600);
  }

  function playSound(kind){
    if(state.muted) return;
    try{
      const AudioCtx=window.AudioContext||window.webkitAudioContext;
      if(!AudioCtx) return;
      audioContext ||= new AudioCtx();
      if(audioContext.state==='suspended') audioContext.resume();
      const notes={correct:[660,880],wrong:[220,185],level:[620,790,1040],achievement:[523,659,784,1046]};
      const seq=notes[kind]||notes.correct;
      seq.forEach((freq,i)=>{
        const start=audioContext.currentTime+i*.095;
        const osc=audioContext.createOscillator(), gain=audioContext.createGain();
        osc.type=kind==='wrong'?'triangle':'sine'; osc.frequency.setValueAtTime(freq,start);
        gain.gain.setValueAtTime(.0001,start); gain.gain.exponentialRampToValueAtTime(kind==='achievement'?.11:.075,start+.012); gain.gain.exponentialRampToValueAtTime(.0001,start+.22);
        osc.connect(gain); gain.connect(audioContext.destination); osc.start(start); osc.stop(start+.23);
      });
    }catch{}
  }

  function pronounce(){
    speakText(activeCard?.word);
  }
  function speakText(text){
    if(!text||!('speechSynthesis' in window)||typeof window.SpeechSynthesisUtterance!=='function'){showToast('O áudio não está disponível neste navegador.');return;}
    window.speechSynthesis.cancel();const utterance=new window.SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.82;utterance.onerror=()=>showToast('Não foi possível reproduzir o áudio neste navegador.');window.speechSynthesis.speak(utterance);
  }
  function reportAnswer(){
    if(!activeCard||!ui.report.dataset.answer)return;
    state.reports ||= [];
    state.reports.push({cardId:activeCard.id,expected:activeCard.word,meaning:activeCard.meaning,response:ui.report.dataset.answer,reportedAt:new Date().toISOString()});
    if(saveState()){ui.report.hidden=true;showToast('Sinalização salva neste navegador. Exporte no vocabulário.');}
    else {state.reports.pop();showToast('Não foi possível salvar a sinalização neste navegador.');}
  }
  function exportReports(){
    const reports=state.reports||[];if(!reports.length){showToast('Nenhuma sinalização salva ainda.');return;}
    const url=URL.createObjectURL(new Blob([JSON.stringify(reports,null,2)],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download='voca-sprint-sinalizacoes.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function openModal(type){
    if(type==='achievements') ui.modalContent.innerHTML=achievementModal();
    if(type==='sources') ui.modalContent.innerHTML=sourcesModal();
    if(type==='help') ui.modalContent.innerHTML=helpModal();
    ui.backdrop.hidden=false; document.body.style.overflow='hidden'; $('#modal-close').focus();
  }
  function closeModal(){ui.backdrop.hidden=true;document.body.style.overflow='';}
  function achievementModal(){
    const unlocked=new Set(state.unlocked||[]);
    return `<p class="overline">CADA TECLA CONTA</p><h2 id="modal-title">Conquistas</h2><p class="modal-intro">Pequenos marcos que aparecem enquanto seu vocabulário cresce.</p><div class="modal-achievement-list">${ACHIEVEMENTS.map(a=>`<div class="modal-achievement ${unlocked.has(a.id)?'is-unlocked':''}"><div class="modal-achievement-icon">${a.icon}</div><div><strong>${escapeHTML(a.name)}</strong><span>${escapeHTML(a.desc)}</span></div><span class="achievement-status">${unlocked.has(a.id)?'LIBERADA':'BLOQUEADA'}</span></div>`).join('')}</div>`;
  }
  function sourcesModal(){
    return `<p class="overline">CATÁLOGO ABERTO</p><h2 id="modal-title">De onde vêm as palavras?</h2><p class="modal-intro">O jogo junta uma lista de vocabulário com um dicionário bilíngue e frases curtas.</p><div class="source-list"><article class="source-item"><strong>LexiCore-5000 · lista de palavras</strong><p>5 mil palavras em níveis A1–C1. A ordenação usa a frequência Zipf de 2021 fornecida junto à lista. O nível é uma estimativa; a própria fonte registra limitações em parte das classificações.<br><a href="https://github.com/X-Trivle/LexiCore" target="_blank" rel="noreferrer">Abrir o projeto e os dados ↗</a></p></article><article class="source-item"><strong>KOReader en→pt · significados e exemplos</strong><p>Dicionário inglês–português do Brasil, com formas flexionadas. Reúne Princeton WordNet, OpenWN-PT e Wiktionary.<br><a href="https://github.com/DanielGregorini/koreader-dicts" target="_blank" rel="noreferrer">Abrir a fonte do dicionário ↗</a></p></article><article class="source-item"><strong>Exemplos de treino</strong><p>As frases completas das trilhas e os exemplos curados marcados como originais foram escritos para este jogo. Os exemplos restantes vêm dos sentidos do dicionário.</p></article></div><p class="license-note">LexiCore: CC BY 4.0. Os dados do KOReader en→pt e as traduções derivadas: CC BY-SA 4.0, com avisos de atribuição das fontes originais. A lista de frequências Wordfreq tem atribuição própria. <a href="./creditos.html" target="_blank" rel="noreferrer">Ver créditos e licenças completos ↗</a></p>`;
  }
  function helpModal(){
    return `<p class="overline">COMO JOGAR</p><h2 id="modal-title">Digite, acerte, avance.</h2><p class="modal-intro">Uma rodada leva poucos segundos. O desafio fica mais difícil à medida que você lembra da palavra.</p><ol class="how-list"><li><strong>Comece copiando.</strong> No nível 0, a palavra aparece inteira. Digite-a para fixar a grafia.</li><li><strong>Ganhe autonomia.</strong> O número indica o quanto de pista foi retirado; copiar apresenta a grafia, e as próximas tentativas treinam a lembrança.</li><li><strong>No nível 10, só fica o significado.</strong> Se errar, o nível desce um passo e a palavra volta para revisão.</li><li><strong>Leia o retorno com calma.</strong> Depois do acerto ou erro, aperte Enter para continuar ou tentar novamente.</li><li><strong>Use a frase como contexto.</strong> Nos desafios finais, você pode estudar a frase antes de escrevê-la apenas pelo significado.</li><li><strong>Revise no seu ritmo.</strong> As palavras e frases voltam nas trilhas e no botão de revisão. O progresso fica salvo neste navegador.</li><li><strong>Siga o mapa das trilhas.</strong> Avance etapa por etapa; no fim de cada trilha, escreva frases inteiras vendo só o significado.</li></ol><button class="modal-cta" data-close-modal type="button">Entendi, vamos jogar</button>`;
  }

  function setView(view,{preserveTrack=false}={}){
    clearTimeout(nextTimer);
    awaitingContinue=false;awaitingRecovery=false;awaitingPreparation=false;
    if(!preserveTrack){trackSession=null;reviewSession=null;activeIsReview=false;recoveryCardId='';}
    ui.playView.hidden=view!=='play'; ui.tracksView.hidden=view!=='tracks'; ui.libraryView.hidden=view!=='library';
    document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('is-active',b.dataset.view===view));
    if(view==='tracks'){
      renderTracks();
      if(selectedTrackId==='trail-1') window.scrollTo({top:0,behavior:'smooth'});
      else requestAnimationFrame(()=>ui.trackMap.querySelector(`[data-trail-id="${selectedTrackId}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}));
    }
    if(view==='library'){libraryPage=0;renderLibrary();$('#library-search').focus({preventScroll:true});}
    if(view==='play'){
      if(!preserveTrack) activeCard=chooseNext();
      renderGame(); ui.input.focus({preventScroll:true});
    }
    if(view!=='tracks') window.scrollTo({top:0,behavior:'smooth'});
  }

  function getLibraryRows(){
    const query=normalize(ui.librarySearch.value);
    return catalog.filter(card=>{
      const p=progressFor(card), level=p.level||0;
      const status=window.VocaLearning.status(p);
      const matchesFilter=libraryFilter==='all'||(libraryFilter==='new'&&status==='new')||(libraryFilter==='learned'&&(status==='known'||status==='practice'))||(libraryFilter==='mastered'&&status==='remembered');
      const textMatches=!query||normalize(card.word).includes(query)||(card.meaning||[]).some(m=>normalize(m).includes(query));
      return matchesFilter&&textMatches;
    });
  }
  function renderLibrary(){
    if(!catalog.length) return;
    const rows=getLibraryRows(), pages=Math.max(1,Math.ceil(rows.length/PAGE_SIZE)); libraryPage=Math.min(libraryPage,pages-1);
    const visible=rows.slice(libraryPage*PAGE_SIZE,(libraryPage+1)*PAGE_SIZE);
    ui.libraryResults.textContent=rows.length.toLocaleString('pt-BR');
    ui.libraryList.innerHTML=visible.length?visible.map(card=>{
      const p=progressFor(card),level=p.level||0;
      const status=window.VocaLearning.status(p),label={new:'Ainda não vi',known:'Conhecida',practice:'Em prática',remembered:'Lembrada'}[status];
      return `<article class="library-row"><strong class="library-word">${escapeHTML(card.word)}</strong><span class="library-meaning">${escapeHTML((card.meaning||[]).join(' · '))}${card.category?`<small class="library-category"> · ${escapeHTML(card.category)}</small>`:!card.curated?'<small class="library-category"> · revisão editorial pendente</small>':''}</span><span class="library-level"><span class="level-mini-track"><span style="width:${level*10}%"></span></span>${label} · ${level}/10</span><button class="library-play" data-card="${escapeHTML(card.id)}" type="button">Treinar ↗</button></article>`;
    }).join(''):'<div class="library-empty">Nenhum significado encontrado com esse filtro. Tente outra busca.</div>';
    ui.pageLabel.textContent=`Página ${libraryPage+1} de ${pages}`;
    ui.prev.disabled=libraryPage===0; ui.next.disabled=libraryPage>=pages-1;
  }

  function bindEvents(){
    ui.form.addEventListener('submit',handleAnswer);
    ui.input.addEventListener('input',()=>{
      if(!activeCard||activeCard.challengeType==='sentence'||ui.input.disabled) return;
      renderTiles(activeCard.word,progressFor(activeCard).level||0,ui.input.value);
    });
    ui.reveal.addEventListener('click',revealAnswer);
    ui.skip.addEventListener('click',skipCard);
    ui.pronounce.addEventListener('click',pronounce);
    ui.phraseAudio.addEventListener('click',()=>speakText(activeCard?.challengeType==='sentence'?activeCard.word:activeCard?.phrase?.text?.replace(/___/g,activeCard.word)));
    ui.previewAudio.addEventListener('click',()=>speakText(ui.previewText.textContent));
    ui.report.addEventListener('click',reportAnswer);
    $('#export-reports').addEventListener('click',exportReports);
    ui.startReviews.addEventListener('click',startReviewSession);
    ui.recognitionStart.addEventListener('click',()=>startRecognition('recognition'));
    ui.listeningStart.addEventListener('click',()=>startRecognition('listening'));
    $('#jump-journey').addEventListener('click',()=>{selectedTrackId='trail-1';renderTracks();ui.trackMap.querySelector('[data-trail-id="trail-1"]')?.scrollIntoView({behavior:'smooth',block:'start'});});
    $('#explore-topics').addEventListener('click',()=>{const id=`trail-${TRACK_META.length+1}`;selectedTrackId=id;renderTracks();ui.trackMap.querySelector(`[data-trail-id="${id}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});});
    ui.sound.addEventListener('click',()=>{
      state.muted=!state.muted; saveState();
      ui.sound.classList.toggle('is-muted',state.muted); ui.sound.setAttribute('aria-pressed',String(!state.muted));
      ui.sound.setAttribute('aria-label',state.muted?'Ligar sons':'Desligar sons'); ui.sound.querySelector('.sound-label').textContent=state.muted?'Som desligado':'Som ligado';
      if(!state.muted) playSound('correct');
    });
    document.querySelectorAll('.mode-button').forEach(button=>button.addEventListener('click',()=>{
      catalogMode=button.dataset.mode; state.mode=catalogMode; saveState(); skippedThisTurn.clear(); forcedCardId=''; activeCard=chooseNext(); updateModeButtons(); renderGame();
    }));
    document.querySelectorAll('.nav-link').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
    $('.brand').addEventListener('click',event=>{event.preventDefault();setView('tracks');});
    $('#open-library').addEventListener('click',()=>setView('library')); $('#back-to-game').addEventListener('click',()=>setView('play'));
    $('#help-open').addEventListener('click',()=>openModal('help'));
    $('#achievements-open').addEventListener('click',()=>openModal('achievements')); $('#all-achievements').addEventListener('click',()=>openModal('achievements'));
    $('#track-achievements').addEventListener('click',()=>openModal('achievements'));
    $('#sources-open').addEventListener('click',()=>openModal('sources')); $('#footer-sources').addEventListener('click',()=>openModal('sources'));
    $('#modal-close').addEventListener('click',closeModal);
    ui.backdrop.addEventListener('click',event=>{if(event.target===ui.backdrop)closeModal();});
    ui.modalContent.addEventListener('click',event=>{if(event.target.closest('[data-close-modal]'))closeModal();});
    document.addEventListener('keydown',event=>{
      if(event.key==='Enter'&&(awaitingContinue||awaitingRecovery||awaitingPreparation)){
        const target=event.target;
        const isControl=target instanceof Element&&target.closest('button,input,a,textarea,select,[role="button"]');
        if(!isControl){event.preventDefault();if(awaitingPreparation)beginPhrasePractice();else if(awaitingRecovery)retryAfterFeedback();else advanceAfterCorrect();return;}
      }
      if(event.key==='Escape'&&!ui.backdrop.hidden)closeModal();
    });
    ui.librarySearch.addEventListener('input',()=>{libraryPage=0;renderLibrary();});
    document.querySelectorAll('.filter-button').forEach(button=>button.addEventListener('click',()=>{
      libraryFilter=button.dataset.filter; libraryPage=0; document.querySelectorAll('.filter-button').forEach(b=>b.classList.toggle('is-active',b===button)); renderLibrary();
    }));
    ui.prev.addEventListener('click',()=>{libraryPage=Math.max(0,libraryPage-1);renderLibrary();});
    ui.next.addEventListener('click',()=>{libraryPage++;renderLibrary();});
    ui.libraryList.addEventListener('click',event=>{
      const button=event.target.closest('[data-card]'); if(!button)return;
      forcedCardId=button.dataset.card; catalogMode='all'; state.mode='all'; updateModeButtons(); setView('play');
    });
  }

  start();
})();
