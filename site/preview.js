'use strict';
if((!new URLSearchParams(location.search).has('audit')||new URLSearchParams(location.search).has('flow'))){S.skin='college';S.layout='preset';save();}
function sizePhone(){const mask=document.querySelector('.screen-mask');document.documentElement.style.setProperty('--available-height',Math.max(300,innerHeight-document.querySelector('.preview-controls').offsetHeight-46)+'px');document.querySelector('.screen-content').style.transform=`scale(${mask.clientWidth/375})`;}
new ResizeObserver(sizePhone).observe(document.querySelector('.screen-mask'));sizePhone();
document.querySelector('#preview-college').value=S.school in {QC:1,BU:1,GC:1}?S.school:'QC';document.querySelector('#preview-skin').value=S.skin||'college';
document.querySelector('#preview-college').onchange=e=>{S.school=e.target.value;schoolChoice=S.school;save();applySkin();render();};
document.querySelector('#preview-skin').onchange=e=>{S.skin=e.target.value;save();applySkin();};
document.querySelector('#preview-start').onclick=()=>{formStage=0;authData={};close();nav('onboarding');if(route==='onboarding')render();};document.querySelector('.hardware-home').onclick=()=>{close();nav('home');};
function applySkin(){document.body.className=`college-${schoolChoice||S.school} skin-${S.skin||'college'}`;const a=document.querySelector('#app');a.dataset.college=schoolChoice||S.school;const c=document.querySelector('#preview-college');if(c)c.value=schoolChoice||S.school;const skinControl=document.querySelector('#preview-skin');if(skinControl)skinControl.value=S.skin||'college';const l=document.querySelector('#preview-layout');if(l)l.value=S.layout||'preset';}
applySkin();

document.querySelector('#preview-layout').value=S.layout||'preset';document.querySelector('#preview-layout').onchange=e=>{S.layout=e.target.value;save();render();};
new ResizeObserver(sizePhone).observe(document.querySelector('.preview-controls'));window.addEventListener('resize',sizePhone);

document.querySelector("#preview-home").onclick=()=>{close();nav("home");};

if((!new URLSearchParams(location.search).has('audit')||new URLSearchParams(location.search).has('flow')))document.querySelector('#preview-skin')?.closest('label').remove();

if((!new URLSearchParams(location.search).has('audit')||new URLSearchParams(location.search).has('flow')))document.querySelector('#preview-layout')?.closest('label').remove();
