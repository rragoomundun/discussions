export interface UserWarningModerator {
  id: number;
  name: string;
}

export interface UserWarning {
  id: number;
  message: string | null;
  date: string;
  moderator: UserWarningModerator;
}
