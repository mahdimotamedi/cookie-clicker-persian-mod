(function(){
'use strict';
const MOD_ID='CookieClickerFA';
const LANGUAGE_SLOT='ZH-CN';

// نام‌های رایج در نسل مادربزرگ‌های ایرانی؛ نام‌های حامیان خارجی غیرفعال می‌شوند.
const IRANIAN_GRANDMA_NAMES=[
  'فاطمه','زهرا','مریم','خدیجه','زینب','معصومه','ربابه','سکینه','بتول','طاهره',
  'طیبه','کبری','صغری','اقدس','اشرف','عصمت','احترام','نصرت','عزت','رقیه',
  'کلثوم','جمیله','حلیمه','منصوره','محبوبه','مرضیه','صدیقه','قدسیه','شمسی','قمر',
  'گوهر','شهربانو','توران','ایران','پوران','پروین','مهین','مهری','فرخنده','فروغ',
  'ناهید','ژاله','سیمین','هما','منیژه','نرگس','مهوش','مه‌لقا','ماه‌منیر','کوکب',
  'ملوک','انیس','افسر','دل‌آرام','خانم‌جان','بی‌بی‌جان','ننه‌جان','جان‌جان'
];

function registerPersianLanguageSlot(){
  if(typeof Langs==='undefined') return;
  Langs[LANGUAGE_SLOT]={
    file:LANGUAGE_SLOT,
    nameEN:'Persian',
    name:'فارسی',
    changeLanguage:'زبان',
    icon:0,
    w:1.2
  };
}

function addStyles(mod){
  if(!document.getElementById('cookie-clicker-fa-css')){
    const link=document.createElement('link');
    link.id='cookie-clicker-fa-css';
    link.rel='stylesheet';
    link.type='text/css';
    link.href=mod.dirURI+'/fonts.css';
    document.head.appendChild(link);
  }
}

function applyPersianLayout(){
  document.documentElement.lang='fa';
  // document.documentElement.dir='rtl';
  if(document.body){
    document.body.lang='fa';
    // document.body.dir='rtl';
  }
}

function applyIranianGrandmaNames(){
  if(typeof Game==='undefined') return;
  Game.grandmaNames=IRANIAN_GRANDMA_NAMES.slice();
  // جلوی آمیخته‌شدن نام‌های Patreon با فهرست ایرانی را می‌گیرد.
  Game.customGrandmaNames=[];
}

registerPersianLanguageSlot();

Game.registerMod(MOD_ID,{
  init:function(){
    this.dirURI=this.dir?'file:///'+encodeURI(this.dir.replace(/\\/g,'/')):'CookieClickerFAMod';
    registerPersianLanguageSlot();
    addStyles(this);
    applyIranianGrandmaNames();

    if(localStorageGet('CookieClickerLang')==='FA'){
      localStorageSet('CookieClickerLang',LANGUAGE_SLOT);
      Game.toSave=true;
      Game.toReload=true;
    }

    if(localStorageGet('CookieClickerLang')===LANGUAGE_SLOT) applyPersianLayout();

    let grandmaNameRefresh=0;
    Game.registerHook('draw',function(){
      registerPersianLanguageSlot();
      if(localStorageGet('CookieClickerLang')===LANGUAGE_SLOT) applyPersianLayout();
    });
    Game.registerHook('logic',function(){
      if(++grandmaNameRefresh>=150){
        grandmaNameRefresh=0;
        applyIranianGrandmaNames();
      }
    });

    Game.Notify('فارسی‌ساز را فعال کنید','انتخاب زبان فارسی در لیست زبان ها',[16,5],6);
  },
  save:function(){return '';},
  load:function(){}
});
})();
