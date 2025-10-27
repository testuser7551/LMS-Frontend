// src/pages/Settings/Settings.jsx

import React, { useEffect, useState,useContext } from "react";
import { updateSettingsDetails} from "../../../../../api/carddesign/settings";
import { CardContext } from '../../../../../context/CardContext';
import {showToast} from "../../../../../components/toast";
const Settings = ({ settings, setSettings}) => {

const { userCard } = useContext(CardContext);
  const handleToggle = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedData;
      try {
        const payload = {
          settings: settings,
          user_id: userCard?.user_id || "",
        };
        savedData = await updateSettingsDetails(payload);
      } catch (err) {
        console.error(err);
      }
      showToast("Settings saved successfully!","top-center",10000,"dark");
    } catch (err) {
      console.error("Error saving settings:", err);
      showToast("Failed to save settings. Try again.","top-center",10000,"dark");
    }
  };

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow border border-gray-200 max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-primary mb-4">Domain Settings</h2>

      {/* Remove Branding */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-secondary">Remove Branding</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.removeBranding}
            onChange={(e) => handleToggle("removeBranding", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary  
            after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
            after:bg-white after:border after:rounded-full after:h-5 after:w-5 
            after:transition-all peer-checked:after:translate-x-full">
          </div>
        </label>
      </div>

      {/* Public */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-secondary">Public</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.public}
            onChange={(e) => handleToggle("public", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary  
            after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
            after:bg-white after:border after:rounded-full after:h-5 after:w-5 
            after:transition-all peer-checked:after:translate-x-full">
          </div>
        </label>
      </div>

      {/* Card Connect Section */}
      <h3 className="text-md font-semibold text-primary mb-2 mt-6">Card Connect</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-secondary">Show Save Contact</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showSaveContact}
              onChange={(e) =>
                handleToggle("showSaveContact", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary  
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border after:rounded-full after:h-5 after:w-5 
              after:transition-all peer-checked:after:translate-x-full">
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-secondary">Email Contact</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailContact}
              onChange={(e) =>
                handleToggle("emailContact", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary 
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border after:rounded-full after:h-5 after:w-5 
              after:transition-all peer-checked:after:translate-x-full">
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-secondary">Enable Exchange Contact</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableExchangeContact}
              onChange={(e) =>
                handleToggle("enableExchangeContact", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary  
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border after:rounded-full after:h-5 after:w-5 
              after:transition-all peer-checked:after:translate-x-full">
            </div>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <h3 className="text-md font-semibold text-primary mb-2 mt-6">Danger Zone</h3>
      <button
        // onClick={handleDelete}
        className="px-4 py-2 bg-transparent text-primary hover:text-white rounded-lg hover:bg-primary border-2 border-primary transition-colors "
        style={{ display: "inline-block" }} // Align left instead of full width
      >
        Delete Card
      </button>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;

