"use client";
// hooks/useDiary.js
// Stores files as metadata in localStorage + opens real files in browser
// No backend needed — works completely offline

import { useState, useEffect, useCallback } from "react";

export const CATEGORY_META = {
  prescription:   { icon:"💊", label:"Prescriptions"   },
  blood_report:   { icon:"🩸", label:"Blood Reports"   },
  ultrasound:     { icon:"🔬", label:"Ultrasounds"     },
  doctor_notes:   { icon:"🩺", label:"Doctor Notes"    },
  lab_test:       { icon:"📋", label:"Lab Tests"       },
  medicine_photo: { icon:"📷", label:"Medicine Photos" },
};

export function useDiary() {
  const [files,     setFiles]     = useState([]);
  const [grouped,   setGrouped]   = useState({});
  const [loading,   setLoading]   = useState(false);
  const [uploading, setUploading] = useState(false);

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem("diaryFiles") || "[]");
      setFiles(saved);
      const g = {};
      saved.forEach(f => {
        if (!g[f.category]) g[f.category] = [];
        g[f.category].push(f);
      });
      setGrouped(g);
    } catch(e) {}
  }

  useEffect(() => { load(); }, []);

  const uploadFile = useCallback(async (file, category, notes) => {
    setUploading(true);
    try {
      // Read file as base64 so we can store and display it
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const entry = {
        id:         Date.now().toString(),
        name:       file.name,
        category:   category || "prescription",
        fileUrl:    base64,        // store as data URL
        fileSize:   file.size,
        mimeType:   file.type,
        notes:      notes || null,
        uploadedAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("diaryFiles") || "[]");

      // localStorage limit ~5MB — warn if file is large
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File too large for local storage. Please use files under 2MB.");
      }

      const updated = [entry, ...existing];
      localStorage.setItem("diaryFiles", JSON.stringify(updated));
      load();
      return entry;
    } finally {
      setUploading(false);
    }
  }, []);

  const deleteFile = useCallback((id) => {
    const existing = JSON.parse(localStorage.getItem("diaryFiles") || "[]");
    const updated  = existing.filter(f => f.id !== id);
    localStorage.setItem("diaryFiles", JSON.stringify(updated));
    load();
  }, []);

  return {
    files, grouped, loading, uploading,
    uploadFile, deleteFile,
    CATEGORY_META,
  };
}