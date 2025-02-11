import React from "react";

interface ProfileProps {
    profileImage: string;
    username: string;
    postCount: number;
}

export default function Profile({ profileImage, username, postCount }: ProfileProps) {
    return (
        <div className="flex items-center space-x-12 mb-6">
            <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover"/>
            <div className="ml-8">
                <h2 className="text-l font-semibold">{username}</h2>
                <p className="text-gray-600 text-sm font-medium">{postCount.toLocaleString()} posts</p>
            </div>
        </div>
    );
}
