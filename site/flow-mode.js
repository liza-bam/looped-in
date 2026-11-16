'use strict';
if(new URLSearchParams(location.search).has('flow')){
 const mode=new URLSearchParams(location.search).get('flow');
 S=structuredClone(initial);S.skin='college';S.storeCart=[];S.storeOrders=[];S.cart=0;S.migratedStoreCart=true;
 if(['cart','checkout'].includes(mode))S.storeCart=[{id:'scarf',size:'One size',quantity:1},{id:'baseball-tee',size:'M',quantity:1}];
 if(mode==='order')S.storeOrders=[{id:'LI-1002401',items:[{id:'scarf',size:'One size',quantity:1},{id:'baseball-tee',size:'M',quantity:1}],total:53,delivery:'pickup'}];
 if(mode==='favorites'){S.favorites=['Pizza Place in Quincy','the camera corner'];placeTab='favorites';}
 const flowAfterRender=afterRender;let seededError=false,seededCoupon=false;
 afterRender=function(){flowAfterRender();if(mode==='coupon'&&!seededCoupon&&route==='coupon'){seededCoupon=true;document.querySelector('[data-action=present-coupon]')?.click();}if(mode==='pin-error'&&!seededError&&document.querySelector('#onboarding-form [name=pin]')){seededError=true;document.querySelector('[name=pin]').value='1234';document.querySelector('[name=confirmPin]').value='4321';document.querySelector('#onboarding-form').requestSubmit();}};
 if(new URLSearchParams(location.search).has('embed'))document.documentElement.classList.add('flow-embed');
 if(location.hash.startsWith('#audit/'))appliedSource='';
 render();
}
