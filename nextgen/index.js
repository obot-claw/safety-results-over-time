d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv').then(data => {
  const measure = 'Aminotransferase, alanine';
  const rows = data.filter(d => d.TEST === measure && d.ARM && d.VISITN && d.STRESN);
  const visits = [...new Set(rows.map(d => +d.VISITN))].sort((a,b)=>a-b);
  const arms = [...new Set(rows.map(d => d.ARM))].sort();
  const colors = ['#2563eb','#16a34a','#dc2626'];
  new Chart(document.getElementById('chart'), { type:'line', data:{ labels:visits, datasets:arms.map((arm,i)=>({ label:arm, borderColor:colors[i], data:visits.map(v=>{const vals=rows.filter(d=>d.ARM===arm && +d.VISITN===v).map(d=>+d.STRESN).filter(Number.isFinite); return vals.reduce((a,b)=>a+b,0)/vals.length;}) })) }, options:{responsive:true,plugins:{title:{display:true,text:`${measure} over time`}},scales:{x:{title:{display:true,text:'Visit'}},y:{title:{display:true,text:'Mean result'}}}} });
});
