// src/pages/Discussion/components/GradingPanel.jsx
import React, { useState } from "react";
import { Award, Check, X } from "lucide-react";

const GradingPanel = ({ targetId, currentGrade, maxGrade, isThread, onGrade }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gradeValue, setGradeValue] = useState(currentGrade?.toString() || "");

  const handleSubmit = () => {
    const grade = parseFloat(gradeValue);
    if (grade >= 0 && grade <= maxGrade) {
      onGrade(targetId, grade, isThread);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setGradeValue(currentGrade?.toString() || "");
    setIsEditing(false);
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">
            Grade {isThread ? "Thread" : "Reply"}
          </span>
        </div>

        {!isEditing ? (
          <div className="flex items-center space-x-2">
            {currentGrade !== undefined ? (
              <span className="text-sm text-green-600 font-medium">
                {currentGrade}/{maxGrade}
              </span>
            ) : (
              <span className="text-sm text-gray-500">Not graded</span>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
            >
              {currentGrade !== undefined ? "Edit" : "Grade"}
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              max={maxGrade}
              step="0.5"
              value={gradeValue}
              onChange={(e) => setGradeValue(e.target.value)}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
            <span className="text-sm text-gray-500">/ {maxGrade}</span>
            <button
              onClick={handleSubmit}
              className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradingPanel;
