export interface UserDocument {
  id?: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: Date;
  updatedAt: Date;
}