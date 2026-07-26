import React from 'react';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center select-none">
            {/* Custom Keyframe Styles injected directly */}
            <style>{`
                @keyframes logoSlide {
                    0% {
                        transform: translateX(-150%) scale(0.85);
                        opacity: 0;
                        filter: blur(2px);
                    }
                    45%, 55% {
                        transform: translateX(0%) scale(1.05);
                        opacity: 1;
                        filter: blur(0px);
                    }
                    100% {
                        transform: translateX(150%) scale(0.85);
                        opacity: 0;
                        filter: blur(2px);
                    }
                }
                @keyframes walkToStore {
                    0% {
                        transform: translateX(0px);
                    }
                    90%, 100% {
                        transform: translateX(170px);
                    }
                }
                @keyframes swingLeg1 {
                    0%, 100% { transform: rotate(-22deg); }
                    50% { transform: rotate(22deg); }
                }
                @keyframes swingLeg2 {
                    0%, 100% { transform: rotate(22deg); }
                    50% { transform: rotate(-22deg); }
                }
                @keyframes bounceBody {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-2px); }
                }
                @keyframes drawPath {
                    0% { stroke-dashoffset: 400; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.3; transform: scale(0.95); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
            `}</style>

            <div className="flex flex-col items-center max-w-sm w-full px-8">
                
                {/* Section 1: Logo Slider Animation (Main logo + sliding copy) */}
                <div className="relative w-24 h-24 mb-1 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50/80 border border-slate-100/50 shadow-inner">
                    {/* Background Radial Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-blue-500/5 animate-[pulseGlow_3s_infinite_ease-in-out]" />
                    
                    {/* Base Logo (Static watermark) */}
                    <img 
                        src={`${import.meta.env.BASE_URL}image.svg`} 
                        className="w-12 h-12 object-contain opacity-10" 
                        alt="Nemvol Logo Base" 
                    />
                    
                    {/* Sliding Copy Logo */}
                    <img 
                        src={`${import.meta.env.BASE_URL}image.svg`} 
                        className="absolute w-12 h-12 object-contain animate-[logoSlide_2.5s_infinite_ease-in-out]" 
                        alt="Nemvol Logo Sliding" 
                    />
                </div>

                {/* Brand name */}
                <span className="text-[10px] tracking-[0.25em] font-black text-slate-400 uppercase mb-12">NEMVOL SWIFT</span>

                {/* Section 2: Person walking to store SVG Animation */}
                <div className="w-full bg-slate-50/50 border border-slate-100/60 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <svg 
                        viewBox="0 0 280 100" 
                        className="w-full h-24"
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Floor/Road line */}
                        <line 
                            x1="10" 
                            y1="80" 
                            x2="270" 
                            y2="80" 
                            stroke="#E2E8F0" 
                            strokeWidth="2" 
                            strokeLinecap="round"
                        />

                        {/* Storefront (Right side) */}
                        <g transform="translate(210, 20)">
                            {/* Building Outline */}
                            <rect 
                                x="5" 
                                y="15" 
                                width="46" 
                                height="45" 
                                rx="3" 
                                stroke="#041E4E" 
                                strokeWidth="2.5" 
                                fill="#FFFFFF"
                            />
                            {/* Store Awning (Stripes) */}
                            <path 
                                d="M2 15 L54 15 L48 27 L8 27 Z" 
                                fill="#066AF5" 
                                stroke="#041E4E" 
                                strokeWidth="2" 
                                strokeLinejoin="round"
                            />
                            {/* Glass Door */}
                            <rect 
                                x="18" 
                                y="35" 
                                width="20" 
                                height="25" 
                                rx="1.5" 
                                stroke="#041E4E" 
                                strokeWidth="2" 
                                fill="#F8FAFC"
                            />
                            {/* Door handle */}
                            <line 
                                x1="22" 
                                y1="46" 
                                x2="22" 
                                y2="50" 
                                stroke="#041E4E" 
                                strokeWidth="1.5" 
                                strokeLinecap="round"
                            />
                            {/* Decorative Storefront Window grid line */}
                            <line 
                                x1="28" 
                                y1="35" 
                                x2="28" 
                                y2="60" 
                                stroke="#E2E8F0" 
                                strokeWidth="1"
                            />
                        </g>

                        {/* Walking Person (Slides from left to right) */}
                        <g 
                            className="animate-[walkToStore_5s_infinite_linear]" 
                            style={{ transformOrigin: 'bottom' }}
                        >
                            {/* Bouncing container for hip/torso bounce */}
                            <g className="animate-[bounceBody_0.6s_infinite_ease-in-out]">
                                {/* Head */}
                                <circle 
                                    cx="25" 
                                    cy="35" 
                                    r="5.5" 
                                    fill="#041E4E" 
                                    stroke="#041E4E" 
                                    strokeWidth="1"
                                />

                                {/* Torso */}
                                <line 
                                    x1="25" 
                                    y1="41" 
                                    x2="25" 
                                    y2="60" 
                                    stroke="#041E4E" 
                                    strokeWidth="3.5" 
                                    strokeLinecap="round"
                                />

                                {/* Swinging Arm (Left/Back) */}
                                <line 
                                    x1="25" 
                                    y1="44" 
                                    x2="17" 
                                    y2="56" 
                                    stroke="#066AF5" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round"
                                    className="animate-[swingLeg1_0.6s_infinite_ease-in-out]"
                                    style={{ transformOrigin: '25px 44px' }}
                                />

                                {/* Swinging Arm (Right/Front) */}
                                <line 
                                    x1="25" 
                                    y1="44" 
                                    x2="33" 
                                    y2="56" 
                                    stroke="#041E4E" 
                                    strokeWidth="3" 
                                    strokeLinecap="round"
                                    className="animate-[swingLeg2_0.6s_infinite_ease-in-out]"
                                    style={{ transformOrigin: '25px 44px' }}
                                />

                                {/* Shopping Bag carried in hand */}
                                <g 
                                    className="animate-[swingLeg2_0.6s_infinite_ease-in-out]"
                                    style={{ transformOrigin: '25px 44px' }}
                                >
                                    {/* Bag Handle */}
                                    <path 
                                        d="M31 56 A3 3 0 0 1 37 56" 
                                        stroke="#041E4E" 
                                        strokeWidth="1.2" 
                                        fill="none" 
                                    />
                                    {/* Bag Body */}
                                    <rect 
                                        x="30" 
                                        y="58" 
                                        width="10" 
                                        height="9" 
                                        rx="1" 
                                        fill="#066AF5" 
                                        stroke="#041E4E" 
                                        strokeWidth="1" 
                                    />
                                </g>

                                {/* Swinging Leg 1 (Back leg) */}
                                <line 
                                    x1="25" 
                                    y1="60" 
                                    x2="17" 
                                    y2="79" 
                                    stroke="#066AF5" 
                                    strokeWidth="3" 
                                    strokeLinecap="round"
                                    className="animate-[swingLeg1_0.6s_infinite_ease-in-out]"
                                    style={{ transformOrigin: '25px 60px' }}
                                />

                                {/* Swinging Leg 2 (Front leg) */}
                                <line 
                                    x1="25" 
                                    y1="60" 
                                    x2="33" 
                                    y2="79" 
                                    stroke="#041E4E" 
                                    strokeWidth="3.5" 
                                    strokeLinecap="round"
                                    className="animate-[swingLeg2_0.6s_infinite_ease-in-out]"
                                    style={{ transformOrigin: '25px 60px' }}
                                />
                            </g>
                        </g>
                    </svg>

                    {/* Cute Status subtitle */}
                    <div className="text-center mt-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 animate-pulse">
                            Loading Storefront...
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
