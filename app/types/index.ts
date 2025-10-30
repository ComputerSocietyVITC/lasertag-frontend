export interface User {
  id: number;
  username: string;
  email: string;
  phone_no?: string;
  team_id: number | null;
  is_leader: boolean | null;
  created_at: string;
  team: Team | null;
}

export interface Team {
  id: number;
  name: string;
  invite_code: string;
  is_public: boolean;
  created_at: string;
  // members?: User[];
}

export interface Slot {
  id: number;
  start_time: string;
  end_time: string;
  booked_by: number | null;
  created_at: string;
  team: {
    id: number;
    name: string;
    invite_code: string;
  } | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
