import apiClient from "../lib/apiClient";
import { Team } from "../types";

export const getOpenTeams = async (): Promise<Team[]> => {
  const response = await apiClient.get("/teams/public");
  return response.data.teams;
};

export const joinTeamWithCode = async (inviteCode: string) => {
  const response = await apiClient.post("/teams/join", {
    invite_code: inviteCode,
  });
  return response.data;
};

export const createNewTeam = async (name: string) => {
  const response = await apiClient.post("/teams/create", { name });
  return response.data;
};

export const leaveTeam = () => {
  return apiClient.patch("/teams/exit");
};

export const updateTeamPrivacy = (isPublic: boolean) => {
  return apiClient.patch("/teams/makePublic", { is_public: isPublic });
};

export const kickMember = (userId: number) => {
  return apiClient.delete("/teams/kick", { data: { userId } });
};

export const makeTeamPublic = () => {
  return apiClient.patch("/teams/makePublic");
};
