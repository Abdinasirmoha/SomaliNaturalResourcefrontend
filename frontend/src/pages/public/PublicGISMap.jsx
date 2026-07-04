import React, { useState, useEffect } from 'react';
import { Layers, Droplets, Leaf, Shield, Anchor, BarChart2, FileText, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

import mineralImg from '../../assets/somali_minerals_mining_rugged_limestone_rock_formations_and_gold_exploration.png';
import marineImg from '../../assets/somali_marine_resources_underwater_photography_of_vibrant_coral_reefs_sea.png';
import agricultureImg from '../../assets/somali_agriculture_vast_green_banana_plantations_and_golden_sesame_fields_in.png';
import waterImg from '../../assets/somali_water_resources_the_jubba_river_flowing_through_verdant_banks_natural.png';
import forestImg from '../../assets/somali_forest_resources_ancient_frankincense_and_myrrh_trees_on_a_rocky.png';
import wildlifeImg from '../../assets/somali_wildlife_a_rare_somali_wild_ass_and_graceful_gazelles_in_a_protected.png';

const getMapLayers = (t) => [
  {
    id: 'mineral',
    name: t('gismap.layers.mineral.name'),
    icon: Layers,
    color: '#004a70',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.25624792612!2d45.2818!3d2.0469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58425955ce6b53%3A0x6d11b3e839dc3175!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2sus!4v1707011234567!5m2!1sen!2sus',
    regionData: {
      name: t('gismap.layers.mineral.region'),
      description: t('gismap.layers.mineral.desc'),
      densityIndex: '84.2',
      activeProjects: '12',
      reserves: '1.2B',
      reservesUnit: t('gismap.layers.mineral.unit'),
      surveys: [
        { name: t('gismap.layers.mineral.s1'), progress: t('gismap.layers.mineral.s1p'), img: mineralImg },
        { name: t('gismap.layers.mineral.s2'), progress: t('gismap.layers.mineral.s2p'), img: marineImg }
      ]
    }
  },
  {
    id: 'water',
    name: t('gismap.layers.water.name'),
    icon: Droplets,
    color: '#0284c7',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2039281.4243685955!2d42.5458!3d2.0469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1707011234568!5m2!1sen!2sus',
    regionData: {
      name: t('gismap.layers.water.region'),
      description: t('gismap.layers.water.desc'),
      densityIndex: '92.5',
      activeProjects: '8',
      reserves: '4.5B',
      reservesUnit: t('gismap.layers.water.unit'),
      surveys: [
        { name: t('gismap.layers.water.s1'), progress: t('gismap.layers.water.s1p'), img: waterImg },
        { name: t('gismap.layers.water.s2'), progress: t('gismap.layers.water.s2p'), img: agricultureImg }
      ]
    }
  },
  {
    id: 'agriculture',
    name: t('gismap.layers.ag.name'),
    icon: Leaf,
    color: '#16a34a',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1019640.7121842977!2d44.5!3d2.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1707011234569!5m2!1sen!2sus',
    regionData: {
      name: t('gismap.layers.ag.region'),
      description: t('gismap.layers.ag.desc'),
      densityIndex: '78.1',
      activeProjects: '15',
      reserves: '2M',
      reservesUnit: t('gismap.layers.ag.unit'),
      surveys: [
        { name: t('gismap.layers.ag.s1'), progress: t('gismap.layers.ag.s1p'), img: agricultureImg },
        { name: t('gismap.layers.ag.s2'), progress: t('gismap.layers.ag.s2p'), img: waterImg }
      ]
    }
  },
  {
    id: 'protected',
    name: t('gismap.layers.protected.name'),
    icon: Shield,
    color: '#d97706',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2039281.4243685955!2d48.5!3d9.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1707011234570!5m2!1sen!2sus',
    regionData: {
      name: t('gismap.layers.protected.region'),
      description: t('gismap.layers.protected.desc'),
      densityIndex: '99.9',
      activeProjects: '5',
      reserves: '500k',
      reservesUnit: t('gismap.layers.protected.unit'),
      surveys: [
        { name: t('gismap.layers.protected.s1'), progress: t('gismap.layers.protected.s1p'), img: wildlifeImg },
        { name: t('gismap.layers.protected.s2'), progress: t('gismap.layers.protected.s2p'), img: forestImg }
      ]
    }
  },
  {
    id: 'coastal',
    name: t('gismap.layers.coastal.name'),
    icon: Anchor,
    color: '#0369a1',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2039281.4243685955!2d50.5!3d11.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1707011234571!5m2!1sen!2sus',
    regionData: {
      name: t('gismap.layers.coastal.region'),
      description: t('gismap.layers.coastal.desc'),
      densityIndex: '65.4',
      activeProjects: '22',
      reserves: '3.3k',
      reservesUnit: t('gismap.layers.coastal.unit'),
      surveys: [
        { name: t('gismap.layers.coastal.s1'), progress: t('gismap.layers.coastal.s1p'), img: marineImg },
        { name: t('gismap.layers.coastal.s2'), progress: t('gismap.layers.coastal.s2p'), img: marineImg }
      ]
    }
  }
];

const PublicGISMap = () => {
  const { t } = useLanguage();
  const mapLayers = getMapLayers(t);
  const [activeLayerId, setActiveLayerId] = useState(mapLayers[0].id);

  useEffect(() => {
    // Hide body scroll since this is a full-screen app
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const activeLayer = mapLayers.find(layer => layer.id === activeLayerId);

  return (
    <div className="flex w-full h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-950 overflow-hidden relative transition-colors duration-300">
      
      {/* Left Sidebar - Layer Control */}
      <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-10 shadow-sm relative shrink-0 transition-colors duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-extrabold text-[#004a70] dark:text-blue-400 mb-2">{t('gismap.sidebar.title')}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t('gismap.sidebar.desc')}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {mapLayers.map((layer) => {
            const isActive = activeLayerId === layer.id;
            return (
              <div 
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors border ${
                  isActive ? 'bg-[#f0f7fb] dark:bg-blue-900/20 border-[#bae6fd] dark:border-blue-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <layer.icon className={`w-5 h-5 ${isActive ? `text-[${layer.color}]` : 'text-gray-400 dark:text-gray-500'}`} style={{ color: isActive ? layer.color : undefined }} />
                  <span className={`text-sm font-bold ${isActive ? `text-[${layer.color}]` : 'text-gray-700 dark:text-gray-300'}`} style={{ color: isActive ? layer.color : undefined }}>
                    {layer.name}
                  </span>
                </div>
                <div className={`w-10 h-6 rounded-full relative shadow-inner transition-colors duration-300 ${isActive ? 'bg-[#004a70]' : 'bg-gray-200'}`} style={{ backgroundColor: isActive ? layer.color : undefined }}>
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all duration-300 ${isActive ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 mt-auto transition-colors duration-300">
          <h4 className="text-xs font-bold text-gray-900 dark:text-gray-300 mb-4">{t('gismap.sidebar.legendTitle')}</h4>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-yellow-200 via-amber-600 to-[#004a70] dark:to-blue-600 mb-2"></div>
          <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
            <span>{t('gismap.sidebar.low')}</span>
            <span>{t('gismap.sidebar.mod')}</span>
            <span>{t('gismap.sidebar.high')}</span>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative z-0 bg-gray-200 dark:bg-gray-800">
        <iframe
          key={activeLayer.id}
          src={activeLayer.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Somalia Map"
          className="absolute inset-0 grayscale contrast-125 brightness-110 dark:brightness-90 dark:contrast-150 dark:hue-rotate-180 dark:invert transition-all duration-500" 
        ></iframe>
        
        {/* Bottom Footer Overlay */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-lg border border-gray-100 dark:border-gray-800 rounded-full py-3 px-8 flex items-center gap-8 z-20 transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="flex items-center gap-4 border-r border-gray-200 dark:border-gray-700 pr-8">
            <span className="text-sm font-bold text-[#004a70] dark:text-blue-400">{t('gismap.footer.portal')}</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{t('gismap.footer.copyright')}</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-[#004a70] dark:hover:text-blue-400">{t('gismap.footer.data')}</a>
            <a href="#" className="hover:text-[#004a70] dark:hover:text-blue-400">{t('gismap.footer.laws')}</a>
            <a href="#" className="hover:text-[#004a70] dark:hover:text-blue-400">{t('gismap.footer.access')}</a>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Region Details */}
      <div className="w-[400px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col z-10 shadow-xl relative overflow-y-auto shrink-0 transition-colors duration-300">
        <div className="p-8">
          <div className="mb-6">
            <span 
              className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors"
              style={{ backgroundColor: `${activeLayer.color}15`, color: activeLayer.color }}
            >
              {t('gismap.details.activeRegion')}
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">{activeLayer.regionData.name}</h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-8 h-20">
            {activeLayer.regionData.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">{t('gismap.details.density')}</p>
              <div className="text-3xl font-black text-[#004a70] dark:text-blue-400">{activeLayer.regionData.densityIndex}</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 border border-green-100 dark:border-green-800 hover:shadow-md transition-shadow cursor-pointer">
              <p className="text-[10px] text-green-700 dark:text-green-400 uppercase tracking-widest font-bold mb-1">{t('gismap.details.projects')}</p>
              <div className="text-3xl font-black text-green-700 dark:text-green-400">{activeLayer.regionData.activeProjects}</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-10 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">{t('gismap.details.reserves')}</p>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-black text-gray-900 dark:text-white">{activeLayer.regionData.reserves}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">{activeLayer.regionData.reservesUnit}</div>
            </div>
          </div>

          <h3 className="text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-widest mb-4">{t('gismap.details.surveys')}</h3>
          
          <div className="space-y-4 mb-10">
            {activeLayer.regionData.surveys.map((survey, index) => (
              <div key={index} className="flex gap-4 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-inner">
                  <img src={survey.img} alt={survey.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{survey.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1" style={{ color: activeLayer.color }}>
                    {survey.progress}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-auto pt-4">
            <button className="w-full py-4 bg-[#004a70] dark:bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-[#003b5c] dark:hover:bg-blue-700 transition-all flex justify-center items-center">
              <BarChart2 className="w-4 h-4 mr-2" /> {t('gismap.details.btnReport')}
            </button>
            <button className="w-full py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#004a70] dark:hover:text-blue-400 hover:shadow-sm transition-all hover:-translate-y-0.5">
              {t('gismap.details.btnAccess')}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PublicGISMap;
