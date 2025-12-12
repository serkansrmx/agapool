// Type definitions for user roles, statuses, and transaction types
export type UserRole = 'admin' | 'user';
export type UserStatus = 'pending' | 'active' | 'banned';
export type TransactionStatus = 'pending' | 'approved' | 'rejected';

/**
 * User Profile interface
 * Represents a user in the system
 */
export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
}

/**
 * Transaction interface
 * Represents a financial transaction
 */
export interface Transaction {
  id: number;
  user_id: string;
  amount: number;
  type: 'deposit' | 'expense';
  status: TransactionStatus;
  created_at: string;
  profiles?: Profile; // Joined data from profiles table
}

// Legacy Database type (kept for backward compatibility with Supabase)
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile
                Insert: Omit<Profile, 'id'>
                Update: Partial<Omit<Profile, 'id'>>
            }
            transactions: {
                Row: Transaction
                Insert: Omit<Transaction, 'id' | 'created_at'>
                Update: Partial<Omit<Transaction, 'id' | 'created_at'>>
            }
        }
    }
}
