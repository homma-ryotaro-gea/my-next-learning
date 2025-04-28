export type ThreadType = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type OfferType = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type InterviewScheduleType = {
  id: number;
  date: string;
  time: string;
  created_at: string;
  updated_at: string;
};

export type ThreadAdminMessageType = {
  id: number;
  content: string;
  link: string;
  message_status: boolean;
  matching_status_flg: number;
  matching_status_at: string;
  button_display: boolean;
  parent_thread: number;
  thread: ThreadType;
  matching_user: UserType | null;
  offer: OfferType;
  to_user: number;
  create_at: string;
  update_at: string;
  interview_schedule: InterviewScheduleType;
  matching_review_id: number;
};

export type ThreadAdminMessagePaginationType = {
  count: number;
  next: boolean;
  previous: boolean;
  results: ThreadAdminMessageType[];
};
