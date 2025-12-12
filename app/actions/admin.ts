'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Helper to get Admin Client (bypasses RLS)
function getAdminClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined!');
    }
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );
}

export async function approveUserAction(targetUserId: string) {
    const supabase = await createClient();

    // 1. Check if CURRENT user is admin (using normal client)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: You are not an admin.' };
    }

    // 2. Perform Update using ADMIN CLIENT (Bypasses RLS)
    try {
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        console.log('Admin Action: Approving user', targetUserId);
        console.log('Service Role Key Exists:', !!serviceRoleKey);

        if (!serviceRoleKey) {
            return { error: 'Server Error: SUPABASE_SERVICE_ROLE_KEY is missing in .env.local' };
        }

        const supabaseAdmin = getAdminClient();
        const { error } = await supabaseAdmin
            .from('profiles')
            .update({ status: 'active' })
            .eq('id', targetUserId);

        if (error) {
            console.error('Admin Update Error details:', error);
            return { error: 'Update Failed: ' + error.message };
        }
    } catch (err: any) {
        console.error('Service Role Error details:', err);
        return { error: 'Server Configuration Error: ' + err.message };
    }

    revalidatePath('/admin');
    return { success: true };
}

export async function handleTransactionAction(transactionId: number, status: 'approved' | 'rejected') {
    const supabase = await createClient();

    // 1. Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Unauthorized' };

    // 2. Update with Admin Client
    try {
        const supabaseAdmin = getAdminClient();
        const { error } = await supabaseAdmin
            .from('transactions')
            .update({ status })
            .eq('id', transactionId);

        if (error) return { error: error.message };
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/admin');
    return { success: true };
}

export async function deleteTransactionAction(transactionId: number) {
    const supabase = await createClient();

    // 1. Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Unauthorized' };

    // 2. Delete with Admin Client
    try {
        const supabaseAdmin = getAdminClient();
        const { error } = await supabaseAdmin
            .from('transactions')
            .delete()
            .eq('id', transactionId);

        if (error) return { error: error.message };
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/admin');
    return { success: true };
}

export async function deleteProposalAction(proposalId: number) {
    const supabase = await createClient();

    // 1. Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'Unauthorized' };

    // 2. Delete with Admin Client
    try {
        const supabaseAdmin = getAdminClient();

        // Delete votes first (foreign key constraint)
        await supabaseAdmin
            .from('votes')
            .delete()
            .eq('proposal_id', proposalId);

        // Delete proposal
        const { error } = await supabaseAdmin
            .from('proposals')
            .delete()
            .eq('id', proposalId);

        if (error) return { error: error.message };
    } catch (err: any) {
        return { error: err.message };
    }

    revalidatePath('/admin');
    revalidatePath('/'); // Refresh dashboard too
    return { success: true };
}

export async function getAdminData() {
    const supabase = await createClient();

    // 1. Check if CURRENT user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized' };
    }

    // 2. Fetch Data using ADMIN CLIENT (Bypasses RLS)
    try {
        const supabaseAdmin = getAdminClient();

        // Fetch pending users
        const { data: users, error: usersError } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('status', 'pending');

        if (usersError) throw usersError;

        // Fetch pending transactions
        const { data: trans, error: transError } = await supabaseAdmin
            .from('transactions')
            .select('*, profiles(username)')
            .eq('status', 'pending');

        if (transError) throw transError;

        // Fetch history transactions (approved/rejected)
        const { data: history, error: historyError } = await supabaseAdmin
            .from('transactions')
            .select('*, profiles(username)')
            .in('status', ['approved', 'rejected'])
            .order('created_at', { ascending: false })
            .limit(50);

        if (historyError) throw historyError;

        // Fetch proposals
        const { data: proposals, error: propError } = await supabaseAdmin
            .from('proposals')
            .select(`
                *,
                profiles (username)
            `)
            .order('created_at', { ascending: false });

        if (propError) throw propError;

        return {
            users,
            transactions: trans,
            history,
            proposals
        };

    } catch (err: any) {
        console.error('Service Role Fetch Error:', err);
        return { error: 'Fetch Failed: ' + err.message };
    }
}
