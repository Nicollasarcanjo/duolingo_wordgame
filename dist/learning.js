/* Pure learning rules, shared by the game and its checks. */
(() => {
  'use strict';
  const intervals=[0,35_000,90_000,300_000,1_200_000,3_600_000,10_800_000,86_400_000,259_200_000,604_800_000,2_592_000_000];
  function correct(old, options){
    const level=Math.max(0,Math.min(10,Number(old.level)||0));
    const firstDate=old.firstSeenDate||options.today;
    const copied=!options.sentence&&level===0;
    const assisted=Boolean(options.assisted||options.alternate||options.prepared);
    const independent=!assisted&&!copied&&(options.sentence||level===10);
    const nextLevel=assisted?level:copied?1:Math.min(10,level+1);
    return {...old,seen:true,firstSeenDate:firstDate,level:nextLevel,
      correct:(old.correct||0)+1,wrong:old.wrong||0,
      recallCorrect:(old.recallCorrect||0)+(independent?1:0),
      remembered:Boolean(old.remembered||(independent&&firstDate!==options.today)),lastAssisted:assisted||copied,
      nextAt:options.now+((copied||assisted)?intervals[1]:(intervals[nextLevel]||intervals[10]))};
  }
  function wrong(old,options){
    return {...old,seen:true,firstSeenDate:old.firstSeenDate||options.today,
      level:Math.max(0,(old.level||0)-1),correct:old.correct||0,
      wrong:(old.wrong||0)+1,remembered:false,lastAssisted:true,nextAt:options.now+intervals[1]};
  }
  function status(p){return !p?.seen?'new':p.remembered?'remembered':(p.level||0)<=1?'known':'practice';}
  const api={correct,wrong,status,intervals};
  if(typeof window!=='undefined') window.VocaLearning=api;
  if(typeof module!=='undefined') module.exports=api;
})();
