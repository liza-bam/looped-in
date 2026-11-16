
'use strict';
const peopleAliases={"Alanna Berg": "Jim Carlson", "Bertha Smith": "Leo Daniels", "Cindy Jones": "Emma Brewer", "James Allston": "Ron Owens", "Kelly Patrowski": "Peter Webb", "Sandy Dandy": "Jeffrey Hunt", "Melinda Goth": "Phyllis Weaver", "Lary Farnsworth": "Larry Foster"};
const peoplePortraits={"Jim Carlson": "assets/people/person-1.jpg", "Leo Daniels": "assets/people/person-2.jpg", "Emma Brewer": "assets/people/person-3.jpg", "Ron Owens": "assets/people/person-4.jpg", "Peter Webb": "assets/people/person-5.jpg", "Jeffrey Hunt": "assets/people/person-6.jpg", "Phyllis Weaver": "assets/people/person-7.jpg"};
for(const [oldName,newName] of Object.entries(peopleAliases)){if(S.chats[oldName]){S.chats[newName]=[...(S.chats[newName]||[]),...S.chats[oldName]];delete S.chats[oldName];}S.read=S.read.map(n=>n===oldName?newName:n);S.receipts.forEach(r=>{if(r.name===oldName)r.name=newName;});}save();
const beforePeople=afterRender;
afterRender=function(){beforePeople();document.querySelectorAll('.contact-initial').forEach(holder=>{const name=holder.closest('[data-value]')?.dataset.value;if(peoplePortraits[name]){holder.classList.add('contact-photo');holder.innerHTML=`<img src="${peoplePortraits[name]}" alt="">`;}else if(name==='Quincy College'){holder.classList.add('contact-photo');holder.innerHTML=collegeLogo('QC');}});if(route==='chat'&&peoplePortraits[currentContact]){const h=document.querySelector('header h1');if(h){h.classList.add('chat-person-heading');h.innerHTML=`<img src="${peoplePortraits[currentContact]}" alt=""><span>${esc(currentContact)}<small class="contact-header-phone">${contactPhones[currentContact]||''}</small></span>`;}}};
render();

if(location.hash.startsWith('#chat/')){const n=decodeURIComponent(location.hash.slice(6));if(peopleAliases[n])location.replace('#chat/'+encodeURIComponent(peopleAliases[n]));}
