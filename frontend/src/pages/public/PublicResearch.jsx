import React, { useEffect, useState } from 'react';
import { Search, Filter, BookOpen, Download, Database, FlaskConical, Sprout, Tent } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

import heroImg from '../../assets/research_hero_innovative_somali.jpg';
import fishImg from '../../assets/somali_fisheries_traditional_white_fishing_boats_on_the_deep_blue_indian_ocean.png';
import mineralImg from '../../assets/somali_minerals_mining_rugged_limestone_rock_formations_and_gold_exploration.png';
import livestockImg from '../../assets/somali_livestock_a_majestic_herd_of_camels_walking_across_an_arid_landscape.png';

const researchData = [
  {
    id: 1,
    title: 'Coral Reef Ecosystems of the Indian Ocean Coast',
    category: 'Marine Biology',
    author: 'Dr. Amina Warsame',
    year: '2024',
    type: 'Impact Study',
    img: fishImg,
    icon: FlaskConical,
    iconColor: 'text-[#0ea5e9]'
  },
  {
    id: 2,
    title: 'Mineral Mapping & Rare Earth Potential in Central Region',
    category: 'Geology',
    author: 'Ministry of Petroleum',
    year: '2023',
    type: 'Policy Brief',
    img: mineralImg,
    icon: Tent,
    iconColor: 'text-amber-600'
  },
  {
    id: 3,
    title: 'Traditional Rangeland Management & Modern Shifts',
    category: 'Pastoralism',
    author: 'Omar Ali Hassan',
    year: '2024',
    type: 'Paper',
    img: livestockImg,
    icon: Sprout,
    iconColor: 'text-green-600'
  }
];

const categories = ['all', 'marine', 'hydro', 'geo', 'pastoral'];

const PublicResearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryKey, setActiveCategoryKey] = useState('all');
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredResearch = researchData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // We map the keys back to English category names for filtering the hardcoded data
    const categoryMap = {
      'all': 'All Research',
      'marine': 'Marine Biology',
      'hydro': 'Hydrology',
      'geo': 'Geology',
      'pastoral': 'Pastoralism'
    };
    
    const matchesCategory = activeCategoryKey === 'all' || item.category === categoryMap[activeCategoryKey];
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-gray-900 pb-24 transition-colors duration-300">
      {/* Featured Research Hero */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Climate Resilience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003b5c]/90 via-[#004a70]/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="bg-[#004a70] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/20">
                {t('research.hero.badge')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
              {t('research.hero.title')}
            </h1>
            <p className="text-lg text-white/95 mb-10 leading-relaxed max-w-2xl font-medium drop-shadow">
              {t('research.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#004a70] rounded-full shadow-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                <BookOpen className="w-4 h-4 mr-2" /> {t('research.hero.btnRead')}
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white bg-black/30 rounded-full text-sm font-bold hover:bg-black/50 transition-colors backdrop-blur-md">
                <Download className="w-4 h-4 mr-2" /> {t('research.hero.btnDownload')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Library */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-[#004a70] dark:text-blue-400 tracking-tight mb-2">{t('research.library.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('research.library.desc')}</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-900 dark:text-white focus:ring-[#004a70] dark:focus:ring-blue-500 focus:border-[#004a70] dark:focus:border-blue-500 shadow-sm transition-shadow hover:shadow-md outline-none" 
                placeholder={t('research.library.searchPlaceholder')} 
              />
            </div>
          </div>
        </div>

        {/* Categories / Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((catKey) => (
            <button 
              key={catKey}
              onClick={() => setActiveCategoryKey(catKey)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-colors shadow-sm ${
                activeCategoryKey === catKey 
                  ? 'bg-[#004a70] dark:bg-blue-500 text-white border border-transparent' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#004a70] dark:hover:border-blue-400 hover:text-[#004a70] dark:hover:text-blue-400'
              }`}
            >
              {t(`research.categories.${catKey}`)}
            </button>
          ))}
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredResearch.length > 0 ? (
            filteredResearch.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-gray-800 dark:text-gray-200 shadow-sm">
                    {item.type}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{item.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug flex-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-6">{item.author} • {item.year}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button className="flex items-center gap-2 text-xs font-bold text-[#004a70] dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
                      <Database className="w-4 h-4" /> {t('research.library.openData')}
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors">
                      <Download className="w-3 h-3 mr-2" /> {t('research.library.pdf')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 font-medium">
              {t('research.library.noResults')}
            </div>
          )}
        </div>

        {filteredResearch.length > 0 && (
          <div className="flex justify-center mb-24">
            <button className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 shadow-sm transition-colors">
              {t('research.library.loadMore')}
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-[#0b5f8c] rounded-[40px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
          
          <div className="md:w-1/2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">{t('research.cta.title')}</h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed font-light">
              {t('research.cta.desc')}
            </p>
            <button className="px-8 py-4 bg-white text-[#0b5f8c] rounded-full text-sm font-bold shadow-lg hover:bg-gray-50 transition-colors">
              {t('research.cta.btn')}
            </button>
          </div>
          
          <div className="md:w-1/3 relative z-10 w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center flex flex-col gap-8 shadow-inner">
              <div>
                <div className="text-5xl font-black text-white mb-2 drop-shadow-md">1,240+</div>
                <div className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">{t('research.cta.stat1')}</div>
              </div>
              <div className="w-16 h-px bg-white/20 mx-auto"></div>
              <div>
                <div className="text-5xl font-black text-white mb-2 drop-shadow-md">42</div>
                <div className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">{t('research.cta.stat2')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicResearch;
