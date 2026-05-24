// hooks/useDiary.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export function useDiary() {
  const { data: session } = useSession();
  const [files,    setFiles]    = useState([]);
  const [grouped,  setGrouped]  = useState({});
  const [loading,  setLoading]  = useState(false);
  const [uploading,setUploading]= useState(false);
  const [error,    setError]    = useState(null);

  const fetchFiles = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/diary");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFiles(data.files);
      setGrouped(data.grouped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const uploadFile = useCallback(async (file, category, notes) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file",     file);
      formData.append("category", category);
      if (notes) formData.append("notes", notes);

      const res  = await fetch("/api/diary", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchFiles();
      return data.file;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, [fetchFiles]);

  const deleteFile = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/diary/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setFiles(prev => prev.filter(f => f.id !== id));
      await fetchFiles();
    } catch (err) {
      setError(err.message);
    }
  }, [fetchFiles]);

  const CATEGORY_META = {
    prescription:   { icon: "💊", label: "Prescriptions" },
    blood_report:   { icon: "🩸", label: "Blood Reports"  },
    ultrasound:     { icon: "🔬", label: "Ultrasounds"    },
    doctor_notes:   { icon: "🩺", label: "Doctor Notes"   },
    lab_test:       { icon: "📋", label: "Lab Tests"       },
    medicine_photo: { icon: "📷", label: "Medicine Photos" },
  };

  return {
    files, grouped, loading, uploading, error,
    uploadFile, deleteFile, fetchFiles,
    CATEGORY_META,
  };
}