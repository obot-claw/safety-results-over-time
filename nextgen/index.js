const DATA_URL = 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv';
const state = {};
let chart;
function uniq(a){ return [...new Set(a.filter(v => v !== undefined && v !== null && v !== ''))].sort((x,y)=>String(x).localeCompare(String(y), undefined, {numeric:true})); }
function mean(vals){ vals = vals.map(Number).filter(Number.isFinite); return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null; }
function el(tag, attrs={}, text=''){ const e=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v)); if(text) e.textContent=text; return e; }
function select(label, values, value){ const w=el('div',{class:'control'}); w.append(el('label',{},label)); const s=el('select'); values.forEach(v=>{const o=el('option',{value:v},v); if(v===value) o.selected=true; s.append(o);}); w.append(s); return [w,s]; }
function input(label, value=''){ const w=el('div',{class:'control'}); w.append(el('label',{},label)); const i=el('input',{type:'number', value}); w.append(i); return [w,i]; }
function table(rows, cols){ return `<table><thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.slice(0,50).map(r=>`<tr>${cols.map(c=>`<td>${r[c] ?? ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }
function participantNote(rows, allRows){ const ids=uniq(rows.map(d=>d.USUBJID)); const total=uniq(allRows.map(d=>d.USUBJID)).length; return `${ids.length} of ${total} participants shown (${total ? (100*ids.length/total).toFixed(1) : '0.0'}%).`; }

d3.csv(DATA_URL).then(data => {
  const measures=uniq(data.map(d=>d.TEST)); Object.assign(state,{measure:measures[0], arm:'All', sex:'All', yMin:'', yMax:''});
  const app=document.getElementById('app'); app.innerHTML='<div class="controls"></div><div class="note" id="note"></div><div class="chartBox"><canvas id="chart"></canvas></div><div class="listing" id="listing"></div>';
  const controls=app.querySelector('.controls');
  const [mW,mS]=select('Measure',measures,state.measure), [aW,aS]=select('Treatment Group',['All',...uniq(data.map(d=>d.ARM))],state.arm), [sW,sS]=select('Sex',['All',...uniq(data.map(d=>d.SEX))],state.sex), [loW,loI]=input('Lower Limit'), [hiW,hiI]=input('Upper Limit');
  controls.append(mW,aW,sW,loW,hiW); [mS,aS,sS,loI,hiI].forEach(x=>x.onchange=render);
  function render(){ state.measure=mS.value; state.arm=aS.value; state.sex=sS.value; state.yMin=loI.value; state.yMax=hiI.value; const all=data.filter(d=>d.TEST===state.measure && d.STRESN); const rows=all.filter(d=>(state.arm==='All'||d.ARM===state.arm)&&(state.sex==='All'||d.SEX===state.sex)); document.getElementById('note').textContent=participantNote(rows, all); const visits=uniq(rows.map(d=>d.VISITN)); const arms=state.arm==='All'?uniq(rows.map(d=>d.ARM)):[state.arm]; const datasets=arms.map((arm,i)=>({label:arm,data:visits.map(v=>mean(rows.filter(d=>d.ARM===arm && d.VISITN===v).map(d=>d.STRESN))),borderColor:['#2563eb','#16a34a','#dc2626','#f59e0b'][i],spanGaps:true})); if(chart) chart.destroy(); chart=new Chart(document.getElementById('chart'),{type:'line',data:{labels:visits,datasets},options:{plugins:{title:{display:true,text:state.measure},tooltip:{mode:'index'}},scales:{y:{min:state.yMin===''?undefined:+state.yMin,max:state.yMax===''?undefined:+state.yMax,title:{display:true,text:'Mean result'}},x:{title:{display:true,text:'Visit'}}},onClick:()=>{document.getElementById('listing').innerHTML='<strong>Filtered records</strong>'+table(rows,['USUBJID','ARM','SEX','VISIT','TEST','STRESN']);}}}); }
  render();
});
