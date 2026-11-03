/* Prática de reconhecimento e escuta. Nenhum conteúdo é enviado para a rede.
 * VocaRecognition.open({cards, mode, onAnswer, onClose})
 * mode: 'recognition' (também aceita 'reading') ou 'listening'.
 * onAnswer(card, correct, mode, {selectedMeaning, expectedMeaning}) é chamado
 * uma vez por questão; onClose recebe {mode, answered, correct, total}.
 * O retorno é {started, total, reason?}; pode haver menos de dez questões se
 * não existirem cartões suficientes com alternativas distintas.
 */
(() => {
  'use strict';

  const MAX_QUESTIONS = 10;
  const OMIT_TOKENS = new Set(['a','as','o','os','um','uma','uns','umas','de','do','da','dos','das','em','no','na','nos','nas','ao','aos','com','para','por','e','ou']);
  let active = null;

  function escapeHTML(value){
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function normalized(value){
    return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
  }
  function meaningsOf(card){
    const values=Array.isArray(card?.meaning)?card.meaning:typeof card?.meaning==='string'?[card.meaning]:[];
    return values.map(x=>String(x||'').trim()).filter(Boolean);
  }
  function meaningTokens(card){
    const forms=meaningsOf(card).map(normalized).filter(Boolean);
    const words=new Set();
    for(const form of forms){
      for(const token of form.split(' ')){
        if(OMIT_TOKENS.has(token)) continue;
        words.add(token);
        // Evita, por exemplo, que "livro" e "livros" apareçam juntos.
        if(token.length>4 && token.endsWith('s')) words.add(token.slice(0,-1));
      }
    }
    return {forms,words};
  }
  function meaningsOverlap(a,b){
    const left=meaningTokens(a),right=meaningTokens(b);
    if(left.forms.some(x=>right.forms.includes(x))) return true;
    for(const token of left.words) if(right.words.has(token)) return true;
    return false;
  }
  function shuffle(input,random=Math.random){
    const out=input.slice();
    for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
    return out;
  }
  function partOfSpeech(card){ return String(card?.pos||'').toLowerCase().replace(/\.$/,''); }
  function prepareQuestions(input,random=Math.random,targetInput=input){
    if(!Array.isArray(input)) return [];
    const targets=Array.isArray(targetInput)?targetInput:input;
    const targetIds=new Set(targets.map(card=>card?.id).filter(Boolean));
    const byWord=new Map();
    for(const card of [...targets,...input]){
      if(!card || !card.id || typeof card.word!=='string' || !/^[a-z]+(?:[-'][a-z]+)*$/i.test(card.word.trim()) || !meaningsOf(card).length) continue;
      const key=normalized(card.word);
      if(!byWord.has(key)) byWord.set(key,card);
    }
    const pool=[...byWord.values()];
    const questions=[];
    for(const card of shuffle(pool.filter(card=>targetIds.has(card.id)),random)){
      const other=shuffle(pool.filter(candidate=>candidate!==card && !meaningsOverlap(card,candidate)),random);
      // Preferir classes gramaticais diferentes reduz a chance de sinônimos
      // não documentados aparecerem como alternativas erradas.
      const pos=partOfSpeech(card);
      other.sort((a,b)=>Number(partOfSpeech(a)===pos)-Number(partOfSpeech(b)===pos));
      const choices=[card];
      for(const candidate of other){
        if(choices.every(existing=>!meaningsOverlap(existing,candidate))) choices.push(candidate);
        if(choices.length===4) break;
      }
      if(choices.length!==4) continue;
      questions.push({card,choices:shuffle(choices,random).map(choice=>({card:choice,text:meaningsOf(choice)[0],correct:choice===card}))});
      if(questions.length===MAX_QUESTIONS) break;
    }
    return questions;
  }
  function audioAvailable(){
    return typeof window!=='undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance==='function';
  }
  function open(options={}){
    const mode=options.mode==='listening'?'listening':'recognition';
    if(mode==='listening' && !audioAvailable()) return {started:false,total:0,reason:'A reprodução de voz não está disponível neste navegador.'};
    const questions=prepareQuestions(options.cards,Math.random,options.targetCards||options.cards);
    if(!questions.length) return {started:false,total:0,reason:'São necessárias pelo menos quatro palavras com significados distintos para praticar.'};
    if(active) active.close();
    const oldFocus=document.activeElement;
    const oldOverflow=document.body.style.overflow;
    const root=document.createElement('div');
    root.className='voca-recognition';
    root.innerHTML='<section class="voca-recognition__panel" role="dialog" aria-modal="true" aria-labelledby="voca-recognition-title"><button class="voca-recognition__close" type="button" aria-label="Fechar atividade">×</button><div class="voca-recognition__content"></div></section>';
    document.body.appendChild(root);
    document.body.style.overflow='hidden';
    const content=root.querySelector('.voca-recognition__content');
    const closeButton=root.querySelector('.voca-recognition__close');
    let index=0,answered=0,correctCount=0,answeredCurrent=false,closed=false;

    function stopAudio(){try{if(audioAvailable()) window.speechSynthesis.cancel();}catch{}}
    function close(){
      if(closed) return;
      closed=true;
      stopAudio();
      document.removeEventListener('keydown',onKey);
      root.remove();
      document.body.style.overflow=oldOverflow;
      if(active?.root===root) active=null;
      if(oldFocus && typeof oldFocus.focus==='function') oldFocus.focus({preventScroll:true});
      try{options.onClose?.({mode,answered,correct:correctCount,total:questions.length});}catch(error){console.error('Não foi possível atualizar o resumo da atividade.',error);}
    }
    function speak(){
      if(!audioAvailable() || closed || !questions[index]) return;
      const status=content.querySelector('.voca-recognition__audio-status');
      try{
        stopAudio();
        const utterance=new window.SpeechSynthesisUtterance(questions[index].card.word);
        utterance.lang='en-US'; utterance.rate=.82;
        utterance.onerror=()=>{if(status && root.isConnected) status.textContent='Não foi possível reproduzir a voz. Tente novamente ou escolha outra atividade.';};
        window.speechSynthesis.speak(utterance);
        if(status) status.textContent='Reproduzindo em inglês. Você pode ouvir novamente.';
      }catch{if(status) status.textContent='Não foi possível reproduzir a voz neste navegador.';}
    }
    function showQuestion(){
      answeredCurrent=false;
      const question=questions[index],card=question.card;
      const prefix=mode==='listening'?'Prática de escuta':'Reconhecer palavras';
      const stimulus=mode==='listening'
        ? '<p class="voca-recognition__prompt">Ouça a palavra em inglês. Depois, escolha seu significado.</p><button class="voca-recognition__sound" type="button" aria-label="Ouvir palavra em inglês">🔊 <span>Ouvir palavra</span></button><p class="voca-recognition__audio-status" role="status">Você pode ouvir quantas vezes quiser.</p>'
        : `<p class="voca-recognition__prompt">Qual é o significado desta palavra?</p><div class="voca-recognition__word" lang="en">${escapeHTML(card.word)}</div>${card.phrase?.text?`<p class="voca-recognition__context" lang="en">${escapeHTML(card.phrase.text)}</p>`:''}${audioAvailable()?'<button class="voca-recognition__listen-inline" type="button">🔊 Ouvir palavra</button><p class="voca-recognition__audio-status" role="status"></p>':''}`;
      const optionsHTML=question.choices.map((choice,i)=>`<button class="voca-recognition__option" type="button" data-choice="${i}"><span class="voca-recognition__key" aria-hidden="true">${i+1}</span><span>${escapeHTML(choice.text)}</span></button>`).join('');
      content.innerHTML=`<div class="voca-recognition__header"><div><p class="voca-recognition__overline">${prefix.toUpperCase()}</p><h2 id="voca-recognition-title">Vamos praticar</h2></div><span class="voca-recognition__count">${index+1}/${questions.length}</span></div><div class="voca-recognition__progress" aria-label="Questão ${index+1} de ${questions.length}"><span style="width:${(index/questions.length)*100}%"></span></div>${questions.length<MAX_QUESTIONS?`<p class="voca-recognition__note">${questions.length} palavras disponíveis para esta rodada.</p>`:''}${stimulus}<div class="voca-recognition__options" aria-label="Alternativas de significado">${optionsHTML}</div><div class="voca-recognition__result" role="status" aria-live="polite" hidden></div><button class="voca-recognition__next" type="button" hidden>${index===questions.length-1?'Ver resultado':'Próxima'} <span aria-hidden="true">→</span></button>`;
      content.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>select(Number(button.dataset.choice))));
      content.querySelector('.voca-recognition__sound, .voca-recognition__listen-inline')?.addEventListener('click',speak);
      content.querySelector('.voca-recognition__next').addEventListener('click',next);
      const focusTarget=mode==='listening'?content.querySelector('.voca-recognition__sound'):content.querySelector('[data-choice]');
      focusTarget?.focus({preventScroll:true});
    }
    function select(choiceIndex){
      if(answeredCurrent || closed) return;
      const question=questions[index],choice=question.choices[choiceIndex];
      if(!choice) return;
      answeredCurrent=true;
      answered++;
      if(choice.correct) correctCount++;
      stopAudio();
      const buttons=[...content.querySelectorAll('[data-choice]')];
      buttons.forEach((button,i)=>{
        button.disabled=true;
        if(question.choices[i].correct) button.classList.add('is-correct');
        if(i===choiceIndex && !choice.correct) button.classList.add('is-incorrect');
      });
      const result=content.querySelector('.voca-recognition__result');
      const card=question.card;
      const context=card.phrase?.text && card.phrase?.translation?`<span class="voca-recognition__result-context">${escapeHTML(card.phrase.text.replace(/_{2,}/g,card.word))} <span>· ${escapeHTML(card.phrase.translation)}</span></span>`:'';
      result.classList.toggle('is-incorrect',!choice.correct);
      result.innerHTML=`<strong>${choice.correct?'Muito bem!':'Vamos revisar.'}</strong><span><b lang="en">${escapeHTML(card.word)}</b> significa ${escapeHTML(meaningsOf(card).join(' · '))}.</span>${context}`;
      result.hidden=false;
      const nextButton=content.querySelector('.voca-recognition__next');
      nextButton.hidden=false;
      nextButton.focus({preventScroll:true});
      try{options.onAnswer?.(card,choice.correct,mode,{selectedMeaning:choice.text,expectedMeaning:meaningsOf(card)[0]});}catch(error){console.error('Não foi possível registrar a resposta.',error);}
    }
    function next(){
      if(!answeredCurrent || closed) return;
      index++;
      if(index<questions.length){showQuestion();return;}
      content.innerHTML=`<div class="voca-recognition__finish"><span class="voca-recognition__finish-icon" aria-hidden="true">✨</span><p class="voca-recognition__overline">RODADA CONCLUÍDA</p><h2 id="voca-recognition-title">Muito bem!</h2><p>Você acertou <strong>${correctCount} de ${questions.length}</strong> significados nesta rodada.</p><p class="voca-recognition__note">Continue revisando para reencontrar essas palavras em outros momentos.</p><button class="voca-recognition__finish-button" type="button">Voltar ao mapa</button></div>`;
      content.querySelector('.voca-recognition__finish-button').addEventListener('click',close);
      content.querySelector('.voca-recognition__finish-button').focus({preventScroll:true});
    }
    function onKey(event){
      if(closed) return;
      if(event.key==='Escape'){event.preventDefault();close();return;}
      if(event.key==='Tab'){
        const focusable=[...root.querySelectorAll('button:not([disabled])')].filter(button=>!button.hidden && !button.closest('[hidden]'));
        if(focusable.length){
          const first=focusable[0],last=focusable[focusable.length-1];
          if(event.shiftKey && (document.activeElement===first || !root.contains(document.activeElement))){event.preventDefault();last.focus();}
          else if(!event.shiftKey && (document.activeElement===last || !root.contains(document.activeElement))){event.preventDefault();first.focus();}
        }
        return;
      }
      if(!answeredCurrent && /^[1-4]$/.test(event.key) && !event.altKey && !event.ctrlKey && !event.metaKey){
        event.preventDefault(); select(Number(event.key)-1);
      }
    }
    closeButton.addEventListener('click',close);
    root.addEventListener('click',event=>{if(event.target===root) close();});
    document.addEventListener('keydown',onKey);
    active={root,close};
    showQuestion();
    return {started:true,total:questions.length};
  }

  window.VocaRecognition=Object.freeze({open,prepareQuestions,audioAvailable});
})();
