import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, MapPin, Search, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Images
import heroImg from '../assets/home_resources_hero.jpg';
import agImg from '../assets/somali_agriculture_vast_green_banana_plantations_and_golden_sesame_fields_in.png';
import fishImg from '../assets/somali_fisheries_traditional_white_fishing_boats_on_the_deep_blue_indian_ocean.png';
import forestImg from '../assets/somali_forest_resources_ancient_frankincense_and_myrrh_trees_on_a_rocky.png';
import livestockImg from '../assets/somali_livestock_a_majestic_herd_of_camels_walking_across_an_arid_landscape.png';
import marineImg from '../assets/somali_marine_resources_underwater_photography_of_vibrant_coral_reefs_sea.png';
import mineralImg from '../assets/somali_minerals_mining_rugged_limestone_rock_formations_and_gold_exploration.png';
import waterImg from '../assets/somali_water_resources_the_jubba_river_flowing_through_verdant_banks_natural.png';
import wildlifeImg from '../assets/somali_wildlife_a_rare_somali_wild_ass_and_graceful_gazelles_in_a_protected.png';
import mapPlaceholder from '../assets/hero.png'; 

const Home = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Somalia Landscape" className="w-full h-full object-cover" />
          {/* Lighter, more professional gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b42]/80 via-[#004a70]/40 to-transparent"></div>
          {/* Bottom curved gradient overlay to blend with the next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#f8fafc] dark:to-gray-900 transition-colors duration-300"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-xl whitespace-pre-line">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg md:text-2xl text-white/95 mb-10 leading-relaxed font-medium drop-shadow-md max-w-2xl">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#resources" className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#004a70] hover:bg-[#003b5c] transition-transform hover:scale-105">
                {t('home.hero.btnExplore')}
                <ArrowRight className="ml-2 h-6 w-6" />
              </a>
              <a href="#about" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/80 rounded-full shadow-lg text-lg font-bold text-white hover:bg-white hover:text-[#004a70] transition-colors backdrop-blur-sm">
                {t('home.hero.btnLearnMore')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Foundation Section */}
      <section id="about" className="py-20 relative z-20 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Grid */}
            <div className="relative h-[500px]">
              <div className="absolute top-0 left-0 w-[55%] h-[280px] rounded-2xl overflow-hidden shadow-lg border-4 border-white z-10">
                <img src={livestockImg} alt="Livestock" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-10 right-0 w-[50%] h-[240px] rounded-2xl overflow-hidden shadow-lg border-4 border-white z-20">
                <img src={wildlifeImg} alt="Wildlife" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-10 left-10 w-[45%] h-[220px] rounded-2xl overflow-hidden shadow-lg border-4 border-white z-30">
                <img src={waterImg} alt="Water" className="w-full h-full object-cover" />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-0 right-10 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 max-w-[220px]">
                <h3 className="text-3xl font-bold text-[#004a70] dark:text-blue-400 mb-1">3,333km</h3>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('home.about.coastline')}</p>
              </div>
            </div>
            
            {/* Text Content */}
            <div>
              <p className="text-sm font-bold tracking-widest text-[#004a70] dark:text-blue-400 uppercase mb-3">{t('home.about.subtitle')}</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{t('home.about.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t('home.about.p1')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t('home.about.p2')}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6 mt-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex-1 text-center border border-gray-100 dark:border-gray-700 border-t-4 border-t-[#004a70] dark:border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#004a70] dark:text-blue-400">8.2M+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-2">{t('home.about.stat1')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex-1 text-center border border-gray-100 dark:border-gray-700 border-t-4 border-t-[#004a70] dark:border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#004a70] dark:text-blue-400">115+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-2">{t('home.about.stat2')}</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Alternating Resources Sections */}
      <section id="resources" className="py-32 bg-white dark:bg-gray-950 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t('home.resources.title')}</h2>
          <div className="w-24 h-1.5 bg-[#004a70] dark:bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Water Resources (Image Left) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={waterImg} alt="Water Resources" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 left-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-[#004a70] dark:text-blue-400 mb-6 tracking-tight">{t('home.resources.water.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.water.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex-1 text-center border border-gray-100 dark:border-gray-700 border-t-4 border-t-[#004a70] dark:border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#004a70] dark:text-blue-400">2</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-2">{t('home.resources.water.stat1')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex-1 text-center border border-gray-100 dark:border-gray-700 border-t-4 border-t-[#004a70] dark:border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#004a70] dark:text-blue-400">14.3B</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-2">{t('home.resources.water.stat2')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex-1 text-center border border-gray-100 dark:border-gray-700 border-t-4 border-t-[#004a70] dark:border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#004a70] dark:text-blue-400">12</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-2">{t('home.resources.water.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                {t('home.resources.water.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Agriculture (Image Right) */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-green-700 mb-6 tracking-tight">{t('home.resources.ag.title')}</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.ag.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-green-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-green-700">8.2M</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.ag.stat1')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-green-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-green-700">#1</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.ag.stat2')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-green-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-green-700">4.2M</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.ag.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-green-700 hover:text-green-900 transition-colors">
                {t('home.resources.ag.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={agImg} alt="Agriculture" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>

          {/* Fisheries (Image Left) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={fishImg} alt="Fisheries" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-[#0ea5e9]" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-[#0ea5e9] mb-6 tracking-tight">{t('home.resources.fish.title')}</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.fish.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-[#0ea5e9] shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#0ea5e9]">3,333</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.fish.stat1')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-[#0ea5e9] shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#0ea5e9]">800K</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.fish.stat2')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-[#0ea5e9] shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-[#0ea5e9]">14</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.fish.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-[#0ea5e9] hover:text-blue-600 transition-colors">
                {t('home.resources.fish.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Livestock (Image Right) */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-amber-700 mb-6 tracking-tight">{t('home.resources.live.title')}</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.live.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-amber-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-amber-700">#1</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.live.stat1')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-amber-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-amber-700">40M+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.live.stat2')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-amber-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-amber-700">65%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.live.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-amber-700 hover:text-amber-900 transition-colors">
                {t('home.resources.live.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={livestockImg} alt="Livestock" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>

          {/* Minerals & Mining (Image Left) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={mineralImg} alt="Minerals & Mining" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-gray-800" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">{t('home.resources.mine.title')}</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.mine.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-gray-800">24</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.mine.stat1')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-gray-800">16</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.mine.stat2')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-gray-800">800%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.mine.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-gray-800 hover:text-black transition-colors">
                {t('home.resources.mine.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Forest Conservation (Image Right) */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-emerald-800 mb-6 tracking-tight">{t('home.resources.forest.title')}</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.forest.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-emerald-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-emerald-800">11%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.forest.stat1')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-emerald-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-emerald-800">2.4M</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.forest.stat2')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-emerald-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-emerald-800">#1</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.forest.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
                {t('home.resources.forest.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={forestImg} alt="Forest Conservation" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </div>

          {/* Wildlife Heritage (Image Left) */}
          <div className="flex flex-col lg:flex-row items-center gap-16 group">
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={wildlifeImg} alt="Wildlife Heritage" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-yellow-600 mb-6 tracking-tight">{t('home.resources.wildlife.title')}</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.wildlife.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-yellow-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-yellow-600">15</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.wildlife.stat1')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-yellow-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-yellow-600">200+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.wildlife.stat2')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-yellow-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-yellow-600">3</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.wildlife.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-yellow-600 hover:text-yellow-800 transition-colors">
                {t('home.resources.wildlife.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marine Biodiversity (Image Right) */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 group pb-16">
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-extrabold text-cyan-600 mb-6 tracking-tight">{t('home.resources.marine.title')}</h3>
              <p className="text-gray-600 mb-10 text-xl leading-relaxed font-light">
                {t('home.resources.marine.desc')}
              </p>
              <div className="flex gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-cyan-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-cyan-600">1.2k</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.marine.stat1')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-cyan-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-cyan-600">5</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.marine.stat2')}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl flex-1 text-center border border-gray-100 border-t-4 border-t-cyan-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-cyan-600">45%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">{t('home.resources.marine.stat3')}</div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center text-base font-bold text-cyan-600 hover:text-cyan-800 transition-colors">
                {t('home.resources.marine.link')} <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
            <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img src={marineImg} alt="Marine Biodiversity" className="w-full h-[450px] object-cover" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-md">
                <MapPin className="w-6 h-6 text-cyan-500" />
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 4. Portal Statistics Section */}
      <section className="bg-[#003b5c] py-20 border-t border-[#004a70]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12 uppercase tracking-widest">{t('home.stats.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur p-8 rounded-2xl text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white mb-2">3.3k</h3>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">{t('home.stats.s1')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-2xl text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white mb-2">12M</h3>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">{t('home.stats.s2')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-2xl text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white mb-2">2</h3>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">{t('home.stats.s3')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-2xl text-center border border-white/20">
              <h3 className="text-4xl font-bold text-white mb-2">8.5M</h3>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">{t('home.stats.s4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive GIS Map Section */}
      <section id="map" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('home.map.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t('home.map.desc')}
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400"><MapPin className="w-4 h-4" /></div>
                  {t('home.map.f1')}
                </li>
                <li className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 text-green-600 dark:text-green-400"><Search className="w-4 h-4" /></div>
                  {t('home.map.f2')}
                </li>
                <li className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-purple-600 dark:text-purple-400"><Download className="w-4 h-4" /></div>
                  {t('home.map.f3')}
                </li>
              </ul>
              
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-[#004a70] hover:bg-[#003b5c] transition-colors">
                {t('home.map.btn')}
              </button>
            </div>
            
            <div className="lg:col-span-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 border border-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15904940.358509338!2d38.38479532505545!3d5.421714777478793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x181d2a149c4d9241%3A0xc3f6a27e05eaf5f7!2sSomalia!5e0!3m2!1sen!2sus!4v1717201089921!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Somalia GIS Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 6. National Resource Gallery */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('home.gallery.title')}</h2>
          <div className="w-24 h-1 bg-[#004a70] dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={waterImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={forestImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={livestockImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={mineralImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={wildlifeImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={marineImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={agImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="h-48 rounded-xl overflow-hidden group">
              <img src={fishImg} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Sustainability Roadmap */}
      <section id="sustainability" className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('home.roadmap.title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4">{t('home.roadmap.desc')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          
          <div className="space-y-16">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between w-full">
              <div className="w-5/12 text-right pr-8">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{t('home.roadmap.p1Title')}</h3>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('home.roadmap.p1Sub')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t('home.roadmap.p1Desc')}</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-gray-950 shadow-md"></div>
              <div className="w-5/12 pl-8"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex items-center justify-between w-full">
              <div className="w-5/12 pr-8"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-600 border-4 border-white dark:border-gray-950 shadow-md"></div>
              <div className="w-5/12 pl-8 text-left">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{t('home.roadmap.p2Title')}</h3>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('home.roadmap.p2Sub')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t('home.roadmap.p2Desc')}</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex items-center justify-between w-full">
              <div className="w-5/12 text-right pr-8">
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">{t('home.roadmap.p3Title')}</h3>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('home.roadmap.p3Sub')}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t('home.roadmap.p3Desc')}</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600 border-4 border-white dark:border-gray-950 shadow-md"></div>
              <div className="w-5/12 pl-8"></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="bg-[#48809f] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto font-light">
            {t('home.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent rounded-full shadow-sm text-base font-bold text-[#004a70] bg-white hover:bg-gray-50 transition-colors">
              {t('home.cta.btn1')}
            </Link>
            <a href="#about" className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 rounded-full text-base font-bold text-white hover:bg-white/10 transition-colors">
              {t('home.cta.btn2')}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
