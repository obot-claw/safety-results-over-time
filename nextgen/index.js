const DATA_URL = 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv';
let chart;
function uniq(a){ return [...new Set(a.filter(v => v !== undefined && v !== null && v !== ''))].sort((x,y)=>String(x).localeCompare(String(y), undefined, {numeric:true})); }
function num(v){ const n=Number(v); return Number.isFinite(n) ? n : null; }
function mean(vals){ vals=vals.map(num).filter(v=>v!==null); return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null; }
function sd(vals){ vals=vals.map(num).filter(v=>v!==null); if(vals.length<2) return null; const m=mean(vals); return Math.sqrt(vals.reduce((s,v)=>s+(v-m)**2,0)/(vals.length-1)); }
function q(vals,p){ vals=vals.map(num).filter(v=>v!==null).sort((a,b)=>a-b); if(!vals.length) return null; const i=(vals.length-1)*p, lo=Math.floor(i), hi=Math.ceil(i); return lo===hi ? vals[lo] : vals[lo]+(vals[hi]-vals[lo])*(i-lo); }
function stats(vals){ vals=vals.map(num).filter(v=>v!==null); return {n:vals.length,min:q(vals,0),p05:q(vals,.05),q1:q(vals,.25),median:q(vals,.5),q3:q(vals,.75),p95:q(vals,.95),max:q(vals,1),mean:mean(vals),sd:sd(vals)}; }
function fmt(v,d=2){ return v==null || Number.isNaN(v) ? 'NA' : Number(v).toFixed(d); }
function el(tag, attrs={}, text=''){ const e=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v)); if(text) e.textContent=text; return e; }
function select(label, values, value){ const w=el('div',{class:'control'}); w.append(el('label',{},label)); const s=el('select'); values.forEach(v=>{const o=el('option',{value:v},v); if(v===value) o.selected=true; s.append(o);}); w.append(s); return [w,s]; }
function checkbox(label, checked=false){ const w=el('div',{class:'control'}); const l=el('label'); const i=el('input',{type:'checkbox'}); i.checked=checked; l.append(i, document.createTextNode(' '+label)); w.append(l); return [w,i]; }
function input(label, value=''){ const w=el('div',{class:'control'}); w.append(el('label',{},label)); const i=el('input',{type:'number', value}); w.append(i); return [w,i]; }
function table(rows, cols){ return `<table><thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.slice(0,75).map(r=>`<tr>${cols.map(c=>`<td>${r[c] ?? ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }
function participantNote(rows, allRows){ const ids=uniq(rows.map(d=>d.USUBJID)); const total=uniq(allRows.map(d=>d.USUBJID)).length; return `${ids.length} of ${total} participants shown (${total ? (100*ids.length/total).toFixed(1) : '0.0'}%).`; }

d3.csv(DATA_URL).then(data => {
  const measures = uniq(data.map(d => d.TEST));
  const app = document.getElementById('app');
  app.innerHTML = '<div class="controls"></div><div class="note" id="note"></div><div class="chartBox"><canvas id="chart"></canvas></div><div class="listing" id="listing"></div>';
  const controls = app.querySelector('.controls');
  const [mW,mS] = select('Measure', measures, measures[0]);
  const [gW,gS] = select('Group', ['ARM','SEX','RACE'], 'ARM');
  const [aW,aS] = select('Treatment Group', ['All', ...uniq(data.map(d=>d.ARM))], 'All');
  const [sW,sS] = select('Sex', ['All', ...uniq(data.map(d=>d.SEX))], 'All');
  const [loW,loI] = input('Lower Limit');
  const [hiW,hiI] = input('Upper Limit');
  const reset = el('button', {type:'button'}, 'Reset Limits'); const resetW=el('div',{class:'control'}); resetW.append(el('label',{},'Y-axis'), reset);
  const [scaleW,scaleS] = select('Scale', ['linear','log'], 'linear');
  const [emptyW,emptyC] = checkbox('Visits without data', false);
  const [unsW,unsC] = checkbox('Unscheduled visits', false);
  const [boxW,boxC] = checkbox('Box plots', true);
  const [vioW,vioC] = checkbox('Violin plots', false);
  const [outW,outC] = checkbox('Outliers', true);
  controls.append(mW,gW,aW,sW,loW,hiW,resetW,scaleW,emptyW,unsW,boxW,vioW,outW);
  [...controls.querySelectorAll('select,input')].forEach(x => x.onchange = render);
  reset.onclick = () => { loI.value=''; hiI.value=''; render(); };

  function filteredAll(){ return data.filter(d => d.TEST === mS.value && d.STRESN !== '' && d.STRESN != null); }
  function filteredRows(){ return filteredAll().filter(d => (aS.value === 'All' || d.ARM === aS.value) && (sS.value === 'All' || d.SEX === sS.value) && (unsC.checked || !/unscheduled/i.test(d.VISIT || ''))); }
  function visitValues(rows){ const observed=uniq(rows.map(d=>d.VISITN)); if(emptyC.checked) return uniq(filteredAll().map(d=>d.VISITN)); return observed; }
  function render(){
    const all = filteredAll();
    const rows = filteredRows();
    const visits = visitValues(rows);
    const groupCol = gS.value;
    const groups = uniq(rows.map(d=>d[groupCol]));
    const datasets = [];
    const colors = ['#2563eb','#16a34a','#dc2626','#7c3aed','#f59e0b','#0ea5e9'];
    groups.forEach((group, i) => {
      const color = colors[i % colors.length];
      const byVisit = visits.map(v => rows.filter(d => d[groupCol] === group && d.VISITN === v).map(d => d.STRESN));
      datasets.push({type:'line', label:`${group} mean`, data:byVisit.map(vals=>mean(vals)), borderColor:color, backgroundColor:color, spanGaps:true, tension:.15});
      if (boxC.checked) datasets.push({type:'bar', label:`${group} IQR`, data:byVisit.map(vals=>{const s=stats(vals); return s.n ? [s.q1,s.q3] : null;}), backgroundColor:color+'33', borderColor:color, borderWidth:1, borderSkipped:false});
      if (vioC.checked) datasets.push({type:'bar', label:`${group} 5–95%`, data:byVisit.map(vals=>{const s=stats(vals); return s.n ? [s.p05,s.p95] : null;}), backgroundColor:color+'18', borderColor:color+'66', borderWidth:1, borderSkipped:false});
      if (outC.checked) datasets.push({type:'scatter', label:`${group} outliers`, data:visits.flatMap((v, idx)=>{const vals=rows.filter(d=>d[groupCol]===group && d.VISITN===v); const s=stats(vals.map(d=>d.STRESN)); return vals.filter(d=>+d.STRESN < s.p05 || +d.STRESN > s.p95).map(d=>({x:idx,y:+d.STRESN,id:d.USUBJID,visit:v}));}), backgroundColor:color, pointRadius:4});
    });
    document.getElementById('note').textContent = participantNote(rows, all) + ` ${visits.length} visits shown. ${unsC.checked ? 'Unscheduled visits included.' : 'Unscheduled visits hidden.'}`;
    if(chart) chart.destroy();
    chart = new Chart(document.getElementById('chart'), {
      data:{labels:visits,datasets},
      options:{responsive:true, interaction:{mode:'nearest',intersect:false}, plugins:{title:{display:true,text:mS.value}, tooltip:{callbacks:{afterBody:items=>{const idx=items[0].dataIndex; const g=(items[0].dataset.label||'').replace(/ (mean|IQR|5–95%|outliers)$/,''); const vals=rows.filter(d=>d[groupCol]===g && d.VISITN===visits[idx]).map(d=>d.STRESN); const s=stats(vals); return `N=${s.n}; Min=${fmt(s.min)}; 5%=${fmt(s.p05)}; Q1=${fmt(s.q1)}; Median=${fmt(s.median)}; Q3=${fmt(s.q3)}; 95%=${fmt(s.p95)}; Mean=${fmt(s.mean)}; SD=${fmt(s.sd)}`;}}}}, scales:{y:{type:scaleS.value,min:loI.value===''?undefined:+loI.value,max:hiI.value===''?undefined:+hiI.value,title:{display:true,text:mS.value}},x:{title:{display:true,text:'Visit'}}}, onClick:()=>{document.getElementById('listing').innerHTML='<strong>Filtered records</strong>'+table(rows,['USUBJID','ARM','SEX','RACE','VISIT','VISITN','TEST','STRESN']);}}
    });
  }
  render();
});
