import React from 'react';
import { Landmark, ShieldCheck, Database, Code, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-[#0c4a34] px-6 py-12 text-center text-white">
        <Landmark className="h-16 w-16 mx-auto mb-4 opacity-90" />
        <h1 className="text-3xl font-bold mb-2">Somali Natural Resource Management System</h1>
        <p className="text-[#0c4a34] bg-white inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4">Federal Oversight Portal</p>
        <p className="max-w-2xl mx-auto text-green-50 text-lg">
          A comprehensive digital infrastructure for monitoring, managing, and reporting on the national wealth and resources of the Federal Republic of Somalia.
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <ShieldCheck className="h-6 w-6 mr-2 text-[#0c4a34]" />
              Project Mission
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The NRM System aims to provide transparency, accountability, and efficient management of Somalia's diverse natural resources including land, water, minerals, and maritime assets. By centralizing data, the federal government can ensure sustainable exploitation and fair revenue distribution.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Code className="h-6 w-6 mr-2 text-[#0c4a34]" />
              Technologies Used
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-3">F</div>
                <span className="text-gray-600"><strong>Frontend:</strong> React.js, Vite, Tailwind CSS, Recharts</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs mr-3">B</div>
                <span className="text-gray-600"><strong>Backend:</strong> ASP.NET Core Web API (C#)</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs mr-3">D</div>
                <span className="text-gray-600"><strong>Database:</strong> Microsoft SQL Server, Entity Framework Core</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Contact Information</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-3 text-[#0c4a34]" />
              support@nrm.gov.so
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-3 text-[#0c4a34]" />
              +252 61 000 0000
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3 text-[#0c4a34]" />
              Mogadishu, Somalia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
