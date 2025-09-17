import { useState, useEffect } from 'react';
import '@src/Options.css';
import { Button } from '@extension/ui';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { GeneralSettings } from './components/GeneralSettings';
import { ModelSettings } from './components/ModelSettings';

const Options = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings isDarkMode={isDarkMode} />;
      case 'integration':
        return <ModelSettings isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex min-h-screen min-w-[768px] ${isDarkMode ? 'bg-gray-900' : 'bg-white'} ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      {/* Vertical Navigation Bar */}
      <nav
        className={`w-48 border-r ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="p-4">
          <h1 className={`mb-6 text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Settings</h1>
          <ul className="space-y-2">
            {[
              { id: 'general', label: 'General' },
              { id: 'integration', label: 'Integration' },
            ].map(item => (
              <li key={item.id}>
                <Button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center rounded-lg px-4 py-2 text-left text-base 
                    ${
                      activeTab === item.id
                        ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} font-medium`
                        : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                    } transition-colors`}>
                  <span>{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
        <div className="mx-auto min-w-[512px] max-w-screen-lg">{renderTabContent()}</div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div>Loading...</div>), <div>Error Occurred</div>);