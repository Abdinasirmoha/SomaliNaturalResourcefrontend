import React, { useEffect } from 'react';
import { Target, Eye, ShieldCheck, Leaf, Users, Globe, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Use a beautiful, clear hero image
import heroImg from '../../assets/about_hero.jpg';
import logoImg from '../../assets/logo.png';

const PublicAbout = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-gray-900 pb-24 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Beautiful Somalia Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#004a70]/95 via-[#004a70]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl flex items-center gap-8">
            <div className="hidden md:flex w-48 h-48 shrink-0 bg-white p-2 rounded-full shadow-2xl items-center justify-center overflow-hidden">
              <img src={logoImg} alt="SNRMS Logo" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="mb-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/30">
                  {t('about.hero.badge')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                {t('about.hero.title')}
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-light drop-shadow">
                {t('about.hero.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-[30px] p-12 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-start relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#004a70]/5 dark:bg-blue-500/5 rounded-bl-[100px] -z-10 group-hover:bg-[#004a70]/10 dark:group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="w-16 h-16 bg-[#f0f7fb] dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Target className="w-8 h-8 text-[#004a70] dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">{t('about.mission.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light">
              {t('about.mission.desc')}
            </p>
          </div>
          
          <div className="bg-[#004a70] dark:bg-blue-900 rounded-[30px] p-12 shadow-xl border border-[#003b5c] dark:border-blue-800 flex flex-col items-start relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] -z-10 group-hover:bg-white/10 transition-colors"></div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner backdrop-blur-sm">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-6">{t('about.vision.title')}</h2>
            <p className="text-blue-100 leading-relaxed text-lg font-light">
              {t('about.vision.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Core Mandates */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-widest text-[#004a70] dark:text-blue-400 uppercase mb-2">{t('about.pillars.subtitle')}</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t('about.pillars.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: t('about.pillars.p1Title'),
              desc: t('about.pillars.p1Desc'),
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-900/30"
            },
            {
              icon: Leaf,
              title: t('about.pillars.p2Title'),
              desc: t('about.pillars.p2Desc'),
              color: "text-green-600 dark:text-green-400",
              bg: "bg-green-50 dark:bg-green-900/30"
            },
            {
              icon: Users,
              title: t('about.pillars.p3Title'),
              desc: t('about.pillars.p3Desc'),
              color: "text-amber-600 dark:text-amber-400",
              bg: "bg-amber-50 dark:bg-amber-900/30"
            }
          ].map((pillar, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-[24px] p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 ${pillar.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <pillar.icon className={`w-7 h-7 ${pillar.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{pillar.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Details - Map on the Left */}
      <section className="py-20 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15904940.358509338!2d38.38479532505545!3d5.421714777478793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x181d2a149c4d9241%3A0xc3f6a27e05eaf5f7!2sSomalia!5e0!3m2!1sen!2sus!4v1717201089921!5m2!1sen!2sus" 
                  className="w-full h-[500px] dark:grayscale dark:invert dark:contrast-125 dark:brightness-90 transition-all duration-500" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Somalia Map"
                ></iframe>
                
                {/* Floating badge over the map */}
                <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#004a70] dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Building2 className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[#004a70] dark:text-blue-400 font-bold tracking-widest text-[10px] uppercase block mb-1">{t('about.institution.badge')}</span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{t('about.institution.location')}</h3>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
                {t('about.institution.title')}
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0f7fb] dark:bg-gray-800 flex items-center justify-center shrink-0 border border-[#bae6fd] dark:border-gray-700">
                    <span className="text-lg font-black text-[#004a70] dark:text-blue-400">01</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('about.institution.f1Title')}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {t('about.institution.f1Desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0f7fb] dark:bg-gray-800 flex items-center justify-center shrink-0 border border-[#bae6fd] dark:border-gray-700">
                    <span className="text-lg font-black text-[#004a70] dark:text-blue-400">02</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('about.institution.f2Title')}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {t('about.institution.f2Desc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0f7fb] dark:bg-gray-800 flex items-center justify-center shrink-0 border border-[#bae6fd] dark:border-gray-700">
                    <span className="text-lg font-black text-[#004a70] dark:text-blue-400">03</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('about.institution.f3Title')}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {t('about.institution.f3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">{t('about.cta.title')}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 font-light">
          {t('about.cta.desc')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-[#004a70] dark:bg-blue-600 text-white rounded-full text-sm font-bold shadow-xl hover:bg-[#003b5c] dark:hover:bg-blue-700 hover:-translate-y-1 transition-all">
            {t('about.cta.btn1')}
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#004a70] dark:text-blue-400 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center">
            <Globe className="w-4 h-4 mr-2" /> {t('about.cta.btn2')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default PublicAbout;
