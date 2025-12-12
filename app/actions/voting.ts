'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createProposal(content: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Giriş yapmalısınız.' };

    const { error } = await supabase
        .from('proposals')
        .insert({ content, user_id: user.id });

    if (error) {
        console.error('Proposal Create Error:', error);
        return { error: 'Öneri eklenemedi.' };
    }

    revalidatePath('/');
    return { success: true };
}

export async function toggleVote(proposalId: number) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Giriş yapmalısınız.' };

    // Check if voted
    const { data: existingVote } = await supabase
        .from('votes')
        .select('*')
        .eq('user_id', user.id)
        .eq('proposal_id', proposalId)
        .single();

    if (existingVote) {
        // Remove vote
        await supabase
            .from('votes')
            .delete()
            .eq('user_id', user.id)
            .eq('proposal_id', proposalId);
    } else {
        // Add vote
        await supabase
            .from('votes')
            .insert({ user_id: user.id, proposal_id: proposalId });
    }

    revalidatePath('/');
    return { success: true };
}

export async function getProposals() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch proposals
    const { data: proposals, error } = await supabase
        .from('proposals')
        .select(`
      id,
      content,
      created_at,
      user_id,
      profiles (username)
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Fetch Proposals Error details:', JSON.stringify(error, null, 2));
        return [];
    }

    // Fetch all votes to count them and check if current user voted
    const { data: votes } = await supabase.from('votes').select('*');

    // Process data
    return proposals.map(p => {
        const pVotes = votes?.filter(v => v.proposal_id === p.id) || [];
        // Handle Supabase join returning array or object
        const profileData = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles;

        return {
            ...p,
            profiles: profileData,
            voteCount: pVotes.length,
            hasVoted: user ? pVotes.some(v => v.user_id === user.id) : false
        };
    }).sort((a, b) => b.voteCount - a.voteCount); // Sort by popularity
}
