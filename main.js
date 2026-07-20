(function () {
  'use strict';

  const MOD_ID = 'CookiePersianTranslationMod';
  const LANGUAGE_SLOT = 'ZH-CN';

  const IRANIAN_GRANDMA_NAMES = [
    'فاطمه', 'زهرا', 'مریم', 'خدیجه', 'زینب', 'معصومه', 'ربابه', 'سکینه', 'بتول', 'طاهره',
    'طیبه', 'کبری', 'صغری', 'اقدس', 'اشرف', 'عصمت', 'احترام', 'نصرت', 'عزت', 'رقیه',
    'کلثوم', 'جمیله', 'حلیمه', 'منصوره', 'محبوبه', 'مرضیه', 'صدیقه', 'قدسیه', 'شمسی', 'قمر',
    'گوهر', 'شهربانو', 'توران', 'پوران', 'پروین', 'مهین', 'مهری', 'فرخنده', 'فروغ',
    'ناهید', 'ژاله', 'سیمین', 'هما', 'منیژه', 'نرگس', 'مهوش', 'مه‌لقا', 'ماه‌منیر', 'کوکب',
    'ملوک', 'انیس', 'بی‌بی‌جان', 'ننه‌جان'
  ];

  function registerPersianLanguageSlot() {
    if (typeof Langs === 'undefined') return;

    Langs[LANGUAGE_SLOT] = {
      file: LANGUAGE_SLOT,
      nameEN: 'Persian',
      name: 'فارسی',
      changeLanguage: 'زبان',
      icon: 0,
      w: 1.2
    };
  }

  function addStyles(mod) {
    if (document.getElementById('cookie-clicker-fa-css')) return;

    const link = document.createElement('link');
    link.id = 'cookie-clicker-fa-css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = mod.dirURI + '/fonts.css';

    document.head.appendChild(link);
  }

  function applyPersianLayout() {
    document.documentElement.lang = 'fa';

    if (document.body) {
      document.body.lang = 'fa';
    }
  }

  function applyIranianGrandmaNames() {
    if (typeof Game === 'undefined') return;

    Game.grandmaNames = IRANIAN_GRANDMA_NAMES.slice();
    Game.customGrandmaNames = [];
  }

  function selectPersianLanguageSafely() {
    if (
      typeof localStorageGet !== 'function' ||
      typeof localStorageSet !== 'function'
    ) {
      return false;
    }

    if (localStorageGet('CookieClickerLang') === LANGUAGE_SLOT) {
      return false;
    }

    localStorageSet('CookieClickerLang', LANGUAGE_SLOT);

    if (localStorageGet('CookieClickerLang') !== LANGUAGE_SLOT) {
      console.error(
        '[' + MOD_ID + '] Could not save the Persian language preference.'
      );
      return false;
    }

    Game.toReload = true;
    return true;
  }

  registerPersianLanguageSlot();

  Game.registerMod(MOD_ID, {
    init: function () {
      this.dirURI = this.dir
        ? 'file:///' + encodeURI(this.dir.replace(/\\/g, '/'))
        : 'CookiePersianTranslationMod';

      registerPersianLanguageSlot();
      addStyles(this);
      applyIranianGrandmaNames();

      if (selectPersianLanguageSafely()) {
        return;
      }

      applyPersianLayout();

      let grandmaNameRefresh = 0;

      Game.registerHook('draw', function () {
        registerPersianLanguageSlot();

        if (localStorageGet('CookieClickerLang') === LANGUAGE_SLOT) {
          applyPersianLayout();
        }
      });

      Game.registerHook('logic', function () {
        grandmaNameRefresh++;

        if (grandmaNameRefresh >= 150) {
          grandmaNameRefresh = 0;
          applyIranianGrandmaNames();
        }
      });

      Game.registerHook('reincarnate', function () {
        applyIranianGrandmaNames();
      });

      Game.Notify(
        'فارسی‌ساز فعال شد',
        'بسی رنج بردم در این سال سی / عجم زنده کردم بدین پارسی',
        [16, 5],
        6
      );
    },

    save: function () {
      return '';
    },

    load: function () { }
  });
})();
