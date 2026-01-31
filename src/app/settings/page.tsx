'use client'
import { useState } from "react";
import { PaletteIcon, GlobeIcon } from "@phosphor-icons/react";
import Dropdown from "@/components/dropdown/dropdown";

const themes = [
  { id: "light", title: "Light Mode" },
  { id: "dark", title: "Dark Mode" },
  { id: "system", title: "System Default" },
];

function SettingsPage() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="max-w-4xl mx-auto w-full p-4">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-500/[0.1]">
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>

      <div className="space-y-6">

        {/* Preferences */}
        <div className="border border-gray-500/[0.1] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <GlobeIcon size={24} className="text-primary" />
            <h2 className="text-lg font-semibold">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <PaletteIcon size={20} className="text-gray-600" />
                <label className="font-medium">Theme</label>
              </div>
              <p className="text-sm opacity-[0.7] mb-3">Choose your preferred color theme</p>
              <Dropdown
                options={themes}
                value={theme}
                onChange={(value) => setTheme(value)}
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="border border-gray-500/[0.1] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <div className="space-y-2 text-sm opacity-[0.7]">
            <p>Posterly - poster generation platform</p>
            <p>Version 1.0.0</p>
            <p>© 2026 Posterly. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
