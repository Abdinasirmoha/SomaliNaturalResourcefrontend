import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, MapPin, ChevronRight, Globe, Building2, ShieldCheck, Zap, Diamond, TreePine, Droplets, Calendar, Search } from 'lucide-react';
import { getAllProjects, searchProjects } from '../../services/projectService';
import { useLanguage } from '../../context/LanguageContext';

import heroImg from '../../assets/projects_hero_beautiful.jpg';
import marineImg from '../../assets/somali_marine_resources_underwater_photography_of_vibrant_coral_reefs_sea.png';
import forestImg from '../../assets/somali_forest_resources_ancient_frankincense_and_myrrh_trees_on_a_rocky.png';
import renewableEnergyImg from '../../assets/renewable_energy.jpg';

const PublicProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (searchTerm.trim()) {
        const data = await searchProjects(searchTerm);
        setProjects(data);
      } else {
        const data = await getAllProjects();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to search projects", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('fish') || name.includes('marine')) return <Droplets className="w-4 h-4 text-emerald-600" />;
    if (name.includes('mineral') || name.includes('mining') || name.includes('oil') || name.includes('gas')) return <Diamond className="w-4 h-4 text-yellow-600" />;
    if (name.includes('forest') || name.includes('wood')) return <TreePine className="w-4 h-4 text-green-700" />;
    return <Globe className="w-4 h-4 text-blue-500" />;
  };

  const getStatusColor = (status) => {
    if (status === 'Ongoing') return 'text-emerald-600 bg-emerald-500';
    if (status === 'Completed') return 'text-gray-600 bg-gray-500';
    if (status === 'Planned') return 'text-blue-600 bg-blue-500';
    return 'text-amber-600 bg-amber-500';
  };

  const getProgressWidth = (status) => {
    if (status === 'Completed') return '100%';
    if (status === 'Ongoing') return '65%';
    if (status === 'Planned') return '15%';
    return '0%';
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Sustainable Future" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003b5c]/90 via-[#004a70]/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight whitespace-pre-line">
              {t('projects.hero.title')}
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl font-light">
              {t('projects.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#004a70] rounded-full shadow-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                {t('projects.hero.btn1')}
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/80 text-white rounded-full text-sm font-bold hover:bg-white hover:text-[#004a70] transition-colors backdrop-blur-sm">
                {t('projects.hero.btn2')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#004a70] dark:text-blue-400 uppercase mb-2">{t('projects.opportunities.subtitle')}</p>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t('projects.opportunities.title')}</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center text-sm font-bold text-[#004a70] dark:text-blue-400 hover:text-[#003b5c] dark:hover:text-blue-300 transition-colors">
            {t('projects.opportunities.link')} <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
            <div className="h-56 overflow-hidden">
              <img src={renewableEnergyImg} alt="Renewable Energy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight whitespace-pre-line">{t('projects.opportunities.c1.title')}</h3>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t('projects.opportunities.c1.badge')}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-8 leading-relaxed">
                {t('projects.opportunities.c1.desc')}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-black text-[#004a70] dark:text-blue-400">$450M</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">{t('projects.opportunities.c1.target')}</div>
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors">
                  <span className="text-xl leading-none mb-1">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
            <div className="h-56 overflow-hidden">
              <img src={marineImg} alt="Blue Economy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight whitespace-pre-line">{t('projects.opportunities.c2.title')}</h3>
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t('projects.opportunities.c2.badge')}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-8 leading-relaxed">
                {t('projects.opportunities.c2.desc')}
              </p>
              <div className="flex justify-between items-end mt-auto">
                <div>
                  <div className="text-3xl font-black text-[#004a70] dark:text-blue-400">$120M</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">{t('projects.opportunities.c2.target')}</div>
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors">
                  <span className="text-xl leading-none mb-1">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
            <div className="h-56 overflow-hidden">
              <img src={forestImg} alt="Carbon Credits" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight whitespace-pre-line">{t('projects.opportunities.c3.title')}</h3>
                <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t('projects.opportunities.c3.badge')}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-8 leading-relaxed">
                {t('projects.opportunities.c3.desc')}
              </p>
              <div className="flex justify-between items-end mt-auto">
                <div>
                  <div className="text-3xl font-black text-[#004a70] dark:text-blue-400">$85M</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">{t('projects.opportunities.c3.target')}</div>
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors">
                  <span className="text-xl leading-none mb-1">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Initiatives */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">{t('projects.active.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t('projects.active.desc')}</p>
            </div>
            
            <form onSubmit={handleSearch} className="w-full md:w-96 relative">
              <input
                type="text"
                placeholder={t('projects.active.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-3 pl-5 pr-12 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#004a70] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#004a70] dark:focus:ring-blue-500 shadow-sm transition-shadow"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#004a70] text-white rounded-full hover:bg-[#003b5c] transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-10 text-gray-500">{t('projects.active.loading')}</div>
            ) : projects.length > 0 ? (
              projects.map(project => (
                <div key={project.projectID} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3">
                    <h4 className="text-xl font-bold text-[#004a70] dark:text-blue-400 mb-1 leading-tight">{project.projectName}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                      {project.resource?.category?.categoryName || t('projects.active.generalProject')}
                    </p>
                  </div>
                  
                  <div className="w-full md:w-1/3">
                    <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
                      <span className="truncate pr-2">{project.companyName || t('projects.active.govInitiative')}</span>
                      <span className={getStatusColor(project.status).split(' ')[0]}>{project.status}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getStatusColor(project.status).split(' ')[1]}`} style={{ width: getProgressWidth(project.status) }}></div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3 flex items-center justify-end gap-6 md:border-l border-gray-100 dark:border-gray-700 md:pl-8">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-bold text-gray-900 dark:text-white mb-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {formatDisplayDate(project.startDate)} - {formatDisplayDate(project.endDate) || t('projects.active.present')}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        <MapPin className="w-3 h-3" />
                        {project.resource?.location || t('projects.active.somalia')}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600 shadow-sm">
                        {getCategoryIcon(project.resource?.category?.categoryName)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">{t('projects.active.empty')}</div>
            )}
          </div>
        </div>
      </section>

      {/* Global Impact Dashboard */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-[40px] p-12 shadow-xl shadow-blue-900/5 border border-gray-100 dark:border-gray-700 text-center">
          <h2 className="text-3xl font-extrabold text-[#004a70] dark:text-blue-400 mb-4">{t('projects.dashboard.title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl mx-auto mb-16 leading-relaxed">
            {t('projects.dashboard.desc')}
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {/* Icons row */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-yellow-400 flex items-center justify-center text-white shadow-md">
                <Zap className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t('projects.dashboard.g1')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-rose-700 flex items-center justify-center text-white shadow-md">
                <ArrowRight className="w-8 h-8 -rotate-45" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t('projects.dashboard.g2')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-green-700 flex items-center justify-center text-white shadow-md">
                <MapPin className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t('projects.dashboard.g3')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-md">
                <Globe className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t('projects.dashboard.g4')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t('projects.dashboard.g5')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-[#004a70] flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t('projects.dashboard.g6')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 dark:bg-gray-900 rounded-3xl p-10 border border-gray-100 dark:border-gray-700">
            <div>
              <div className="text-5xl font-black text-green-700 dark:text-green-500 mb-2">2.4M</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{t('projects.dashboard.stat1')}</p>
            </div>
            <div className="border-y md:border-y-0 md:border-x border-gray-200 dark:border-gray-700 py-6 md:py-0">
              <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-2">32%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{t('projects.dashboard.stat2')}</p>
            </div>
            <div>
              <div className="text-5xl font-black text-yellow-600 dark:text-yellow-500 mb-2">$1.2B</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{t('projects.dashboard.stat3')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicProjects;
