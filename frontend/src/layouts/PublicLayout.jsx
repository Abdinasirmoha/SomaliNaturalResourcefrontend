import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Globe, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from '../components/ThemeToggle';

import logoImg from '../assets/logo.png';

const PublicLayout = () => {
  const location = useLocation();
  const isGISMap = location.pathname === '/gis-map';
  const { t, toggleLanguage, language } = useLanguage();

  const navLinks = [
    { name: t('nav.resources'), path: '/' },
    { name: t('nav.projects'), path: '/public-projects' },
    { name: t('nav.research'), path: '/research' },
    { name: t('nav.gis'), path: '/gis-map' },
    { name: t('nav.about'), path: '/about-us' },
  ];

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${isGISMap ? 'bg-white dark:bg-gray-950' : 'bg-[#f8fafc] dark:bg-gray-900'} text-gray-900 dark:text-gray-100`}>
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logoImg} alt="SNRMS Logo" className="h-12 w-auto object-contain" />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-[#004a70] dark:text-blue-400 leading-tight transition-colors duration-300">{t('header.title')}</h1>
                </div>
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8 h-full items-center">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={`${link.name}-${index}`}
                    to={link.path} 
                    className={`h-full flex items-center font-bold text-sm uppercase tracking-wider transition-colors border-b-2 ${
                      isActive 
                        ? 'text-[#004a70] dark:text-blue-400 border-[#004a70] dark:border-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-300 border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              <ThemeToggle />
              <button 
                onClick={toggleLanguage}
                className="text-sm font-bold text-[#004a70] dark:text-blue-400 bg-[#004a70]/10 dark:bg-blue-400/10 px-4 py-1.5 rounded-full hover:bg-[#004a70]/20 dark:hover:bg-blue-400/20 uppercase tracking-wider transition-colors"
              >
                {language === 'en' ? 'SO' : 'ENG'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col relative">
        <Outlet />
      </main>

      {/* Footer */}
      {!isGISMap && (
      <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img src={logoImg} alt="SNRMS Logo" className="h-12 w-auto object-contain" />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-[#003b5c] dark:text-blue-400 leading-tight">{t('footer.title')}</h1>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-[#004a70] dark:text-blue-400 shadow-sm hover:shadow-md transition-shadow">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-[#004a70] dark:text-blue-400 shadow-sm hover:shadow-md transition-shadow">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-[#004a70] dark:text-blue-400 shadow-sm hover:shadow-md transition-shadow">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">{t('footer.resources')}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.dataArchives')}</a></li>
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.publicReports')}</a></li>
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.legalFramework')}</a></li>
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.apiPortal')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.aboutMinistry')}</a></li>
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.partnerOrgs')}</a></li>
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.contactSupport')}</a></li>
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#004a70] dark:hover:text-blue-400 transition-colors">{t('footer.links.privacyPolicy')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {t('footer.copyright')}
            </p>
            <div className="mt-4 md:mt-0 space-x-6 text-xs text-gray-400 dark:text-gray-500">
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">{t('footer.terms')}</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">{t('footer.privacy')}</a>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default PublicLayout;
