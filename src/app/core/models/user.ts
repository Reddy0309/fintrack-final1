export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string; // In a real app, never store plain text passwords
}
