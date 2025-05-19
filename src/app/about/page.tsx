"use client"
import React from "react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent opacity-50"></div>
            
            {/* Hero Section */}
            <div className="relative container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-gradient">
                            About Meme Minto AI
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                        Meme Minto AI is a community-powered platform where memes evolve into interactive AI agents, tradable meme coins, and generative art machines.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="relative container mx-auto px-6 py-12">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    What We Offer
                </h2>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: "🪙", title: "Mint Meme Coins", desc: "Create and mint meme coins instantly" },
                        { icon: "🤖", title: "AI Agents", desc: "Interact with unique meme personalities" },
                        { icon: "🎨", title: "Generative Art", desc: "Create meme-based art on demand" },
                        { icon: "🌐", title: "Community", desc: "Join the community-owned memeverse" }
                    ].map((feature, index) => (
                        <div 
                            key={index}
                            className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 border border-gray-800 hover:border-purple-500/50 shadow-xl hover:shadow-purple-500/20"
                        >
                            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="relative container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-12 rounded-3xl backdrop-blur-sm border border-gray-800">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                            Our Mission
                        </h2>
                        <p className="text-xl text-gray-300 text-center leading-relaxed">
                        We are building the world&apos;s first AI-powered meme marketplace, turning internet culture into on-chain assets and giving power back to creators and communities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why We Exist Section */}
            <div className="relative container mx-auto px-6 py-12">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Why We Exist
                </h2>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: "🤖", title: "AI Agents" },
                        { icon: "😎", title: "Meme Culture" },
                        { icon: "💰", title: "Tokenization" },
                        { icon: "🗳️", title: "Community Governance" }
                    ].map((item, index) => (
                        <div 
                            key={index}
                            className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 border border-gray-800 hover:border-pink-500/50 shadow-xl hover:shadow-pink-500/20"
                        >
                            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                            <h3 className="text-2xl font-semibold text-white group-hover:text-pink-400 transition-colors">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Join Section */}
            <div className="relative container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-12 rounded-3xl backdrop-blur-sm border border-gray-800 text-center">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                            🚀 Join the Movement
                        </h2>
                        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                            Whether you are a memer, dev, artist, or curious fan — Meme Minto AI is your playground.
                        </p>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Create, chat, trade, and shape the future of memes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Add custom styles for gradient animation */}
            <style jsx global>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 8s linear infinite;
                }
            `}</style>
        </div>
    )
}