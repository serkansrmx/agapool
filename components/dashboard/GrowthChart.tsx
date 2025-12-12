"use client";

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export function GrowthChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Destroy previous chart if exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(127, 58, 240, 0.5)'); // Purple top
        gradient.addColorStop(1, 'rgba(127, 58, 240, 0.0)'); // Transparent bottom

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Balance',
                    data: [1200, 3500, 1800, 4200, 1500, 6800, 2400],
                    borderColor: '#7F3AF0',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#1E182F',
                        titleColor: '#fff',
                        bodyColor: '#ccc',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#666' }
                    },
                    y: {
                        display: false
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-dark-card rounded-2xl p-6 col-span-1 lg:col-span-2 border border-gray-800/50">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white">Fund Growth</h3>
                    <p className="text-gray-500 text-xs">Last 7 Days performance</p>
                </div>
                <div className="bg-white/5 rounded-lg p-1 flex text-xs">
                    <button className="px-3 py-1 bg-white/10 text-white rounded shadow transition-colors">Week</button>
                    <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">Month</button>
                    <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">Year</button>
                </div>
            </div>
            <div className="h-48 w-full">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}
