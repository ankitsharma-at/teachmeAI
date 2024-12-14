import { Sun, Moon } from 'lucide-react';

interface ToggleSwitchProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center">
      <Sun className={`h-5 w-5 text-yellow-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'} transition-opacity`} />
      <label htmlFor="toggle" className="inline-flex items-center cursor-pointer ml-2">
        <span className="sr-only">Toggle Dark Mode</span>
        <div
          onClick={toggleDarkMode}
          className="relative"
        >
          <input
            id="toggle"
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="sr-only"
          />
          <div className="block w-10 h-6 bg-gray-300 rounded-full"></div>
          <div
            className={`dot absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ease-in-out ${
              isDarkMode ? 'transform translate-x-4' : ''
            }`}
          ></div>
        </div>
      </label>
      <Moon className={`h-5 w-5 text-gray-400 ${isDarkMode ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
    </div>
  );
};

export default ToggleSwitch;
