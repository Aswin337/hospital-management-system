import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState({
    doctors: true,
    departments: true,
    appointments: true,
    messages: true,
  });

  const refreshDoctors = useCallback(async () => {
    setLoading((l) => ({ ...l, doctors: true }));
    try {
      const res = await api.get("/api/doctors");
      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load doctors:", err);
      setDoctors([]);
    } finally {
      setLoading((l) => ({ ...l, doctors: false }));
    }
  }, []);

  const refreshDepartments = useCallback(async () => {
    setLoading((l) => ({ ...l, departments: true }));
    try {
      const res = await api.get("/api/departments");
      setDepartments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load departments:", err);
      setDepartments([]);
    } finally {
      setLoading((l) => ({ ...l, departments: false }));
    }
  }, []);

  const refreshAppointments = useCallback(async () => {
    setLoading((l) => ({ ...l, appointments: true }));
    try {
      const res = await api.get("/api/appointments");
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setAppointments([]);
    } finally {
      setLoading((l) => ({ ...l, appointments: false }));
    }
  }, []);

  const refreshMessages = useCallback(async () => {
    setLoading((l) => ({ ...l, messages: true }));
    try {
      const res = await api.get("/api/messages");
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    } finally {
      setLoading((l) => ({ ...l, messages: false }));
    }
  }, []);

  useEffect(() => {
    refreshDoctors();
    refreshDepartments();
    refreshAppointments();
    refreshMessages();
  }, [refreshDoctors, refreshDepartments, refreshAppointments, refreshMessages]);

  const value = {
    doctors,
    departments,
    appointments,
    messages,
    loading,
    refreshDoctors,
    refreshDepartments,
    refreshAppointments,
    refreshMessages,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used inside a <DataProvider>");
  }
  return ctx;
};