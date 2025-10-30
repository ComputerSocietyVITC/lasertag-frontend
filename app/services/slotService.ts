import apiClient from "../lib/apiClient";
import { Slot } from "../types";

export const getAvailableSlots = async (): Promise<Slot[]> => {
  const response = await apiClient.get("/slots");
  return response.data.data;
};

export const bookSlot = (slotId: number) => {
  return apiClient.post(`/slots/${slotId}/book`);
};

export const leaveSlot = (slotId: number) => {
  return apiClient.patch(`/slots/${slotId}/leave`);
};
