'use strict';
// Original, unmodified screen art. Coordinates are percentages of each source image.
const pages={};
const hit=(label,x,y,w,h,to)=>({label,x,y,w,h,to});
const phone=(file,title,spots=[])=>({file:`assets/${file}.png`,title,spots:[...spots,hit('Payments',9,90,21,7,'finances'),hit('Rewards',30,90,21,7,'rewards'),hit('Home',85,7,7,6,'home'),hit('Back',8,7,7,6,'back')]});
pages.school=phone('4','Select your school',[hit('Select Quincy College',37,50,25,12,'school'),hit('Continue',10,86,81,7,'home')]);
pages.home=phone('3','Student home',[hit('Send and request money',13,30,37,15,'finances'),hit('Rewards',51,30,37,15,'rewards'),hit('Events',13,45,37,15,'events-01'),hit('Books',51,45,37,15,'market'),hit('Make a purchase',13,61,37,15,'market'),hit('Places',51,61,37,15,'places'),hit('Receipts',13,76,37,14,'finances'),hit('Add funds',51,76,37,14,'finances')]);
pages.finances=phone('11','Your finances');pages.market=phone('2','College marketplace',[hit('College fashion',10,34,80,8,'fashion')]);
pages.rewards=phone('13','My rewards',[hit('School rewards',10,20,80,15,'school-rewards'),hit('College fashion',10,35,80,10,'fashion')]);
pages['school-rewards']=phone('9','School rewards',[hit('Concert in Central Hall',10,20,39,17,'events-12'),hit('Event rewards',50,20,40,17,'events-12')]);
pages.fashion=phone('12','College fashion',[hit('Quincy scarf',10,22,39,17,'product')]);pages.product=phone('14','Quincy scarf with logo');pages.places=phone('8','Places');
const names={'01':'Events calendar','02':'Event filters','03':'Arts filters','04':'Clear filters confirmation','05':'Filtered calendar','06':'My events calendar','07':'October calendar','08':'Events list','09':'Save event','10':'Remove saved event','11':'Event check-in action','12':'Concert in Central Hall','13':'Checked-in event','14':'Check-in confirmation','15':'My events cards','16':'All events cards','17':'Check-in unavailable','19':'Checked-in concert','20':'My events list','21':'Selected filters','30':'Orchestra hat reward','31':'Checked-in events list'};
for(const [id,title] of Object.entries(names)){
 const p={file:`assets/events-${id}.jpg`,title,spots:[]};pages[`events-${id}`]=p;
 const add=(...a)=>p.spots.push(hit(...a));
 add('Home',88,0,12,11,'home');add('Back',0,0,12,11,'back');
 if(['02','03','21'].includes(id)){
  add('Close filters',0,12,20,75,'events-01');add('Clear filters',70,12,27,8,'events-04');add('Arts',21,29,72,8,'events-03');add('Concerts',21,44,72,8,'events-21');add('Apply filters',21,84,73,8,'events-05');
 }else if(id==='04'){add('Cancel',21,53,28,9,'events-02');add('Clear filters',50,53,29,9,'events-01');}
 else if(id==='14'){add('OK',25,56,51,9,'events-13');}
 else if(id==='17'){add('OK',25,56,51,9,'events-08');}
 else if(['12','13','19'].includes(id)){
  add('Check in',0,30,31,6,id==='12'?'events-14':'events-13');add('View Orchestra hat reward',32,30,68,6,'events-30');add('Save event',0,20,14,9,'events-19');
 }else if(id==='30'){add('Where did I get this reward?',26,52,62,10,'events-13');}
 else{
  add('All events',0,12,33,4,'events-01');add('My events',33,12,33,4,'events-06');add('Rewarded events',66,12,34,4,'events-05');
  const calendar=['01','05','06','07'].includes(id);
  if(calendar){add('Next month',88,16,12,8,'events-07');add('Previous month',0,16,12,8,'events-01');add('Show events list',15,23,72,39,'events-08');add('Filter events',81,62,19,6,'events-02');add('Open event',16,68,84,10,'events-12');add('Save concert',0,68,16,10,'events-09');}
  else{add('Calendar view',14,16,72,6,'events-01');add('Save concert',0,22,16,8,'events-09');add('Open concert',17,22,66,8,'events-12');add('Check in to concert',83,22,17,8,'events-14');add('Open another event',16,30,84,8,'events-12');add('Switch to cards',0,82,100,9,'events-16');}
 }
 add('Payments',0,92,25,8,'finances');add('Rewards',25,92,25,8,'rewards');
}
const screen=document.querySelector('#screen'),jump=document.querySelector('#jump');
for(const [key,p] of Object.entries(pages)){const o=document.createElement('option');o.value=key;o.textContent=p.title;jump.append(o);}
function go(key){if(key==='back'){history.back();return;}location.hash=key;}
function render(){const key=location.hash.slice(1)||'school',p=pages[key]||pages.school;screen.replaceChildren();const img=document.createElement('img');img.src=p.file;img.alt=p.title;img.onload=()=>screen.style.setProperty('--ratio',img.naturalWidth/img.naturalHeight);screen.append(img);for(const s of p.spots){const b=document.createElement('button');b.className='hotspot';b.setAttribute('aria-label',s.label);b.title=s.label;Object.assign(b.style,{left:s.x+'%',top:s.y+'%',width:s.w+'%',height:s.h+'%'});b.onclick=()=>go(s.to);screen.append(b);}jump.value=pages[key]?key:'school';document.title=`${p.title} — Looped In`;}
window.addEventListener('hashchange',render);document.querySelector('#back').onclick=()=>go('back');document.querySelector('#home').onclick=()=>go('home');document.querySelector('#hints').onclick=e=>{const on=screen.classList.toggle('hints');e.target.setAttribute('aria-pressed',on);e.target.textContent=on?'Hide hotspots':'Show hotspots';};jump.onchange=()=>go(jump.value);render();
