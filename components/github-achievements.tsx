import React from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export interface AchievementItem {
  name: string;
  tier?: string;
  description: string;
  icon: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    name: "Pull Shark",
    tier: "Bronze",
    description: "Merged pull requests across repositories",
    icon: "https://github.githubassets.com/assets/pull-shark-bronze-a37accb528d1.png",
  },
  {
    name: "Quickdraw",
    tier: "Unlocked",
    description: "Quickly closed an issue or pull request",
    icon: "https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png",
  },
  {
    name: "YOLO",
    tier: "Unlocked",
    description: "Merged a pull request without code review",
    icon: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
  },
];

export default function GitHubAchievements() {
  return (
    <section className="w-full space-y-3 pt-2">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white tracking-tight">
          GitHub Achievements
        </h2>
        <a
          href="https://github.com/NuxGajurel?tab=achievements"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
        >
          <span>View on GitHub</span>
          <FiExternalLink size={12} />
        </a>
      </div>

      {/* Simple, unboxed row of badges like GitHub profile sidebar */}
      <div className="flex items-center gap-6 sm:gap-8 flex-wrap pt-2">
        {ACHIEVEMENTS.map((item) => (
          <a
            key={item.name}
            href="https://github.com/NuxGajurel?tab=achievements"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center gap-2 transition-transform duration-200 hover:scale-105"
            title={`${item.name} (${item.tier}): ${item.description}`}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <Image
                src={item.icon}
                alt={`Achievement: ${item.name}`}
                width={80}
                height={80}
                className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {item.name}
              </p>
              {item.tier && (
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                  {item.tier}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
