import { motion } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { Trophy } from "lucide-react";
import { getLevelIcon, getLevelInfo } from "@/components/icons/level-icons";
interface DJLevelProgressProps {
  currentLevel: number;
  currentPoints: number;
  nextLevelPoints: number;
  levelName: string;
  className?: string;
}
export function DJLevelProgress({
  currentLevel,
  currentPoints,
  nextLevelPoints,
  levelName,
  className = "",
}: DJLevelProgressProps) {
  const progress = (currentPoints / nextLevelPoints) * 100;
  const LevelIcon = getLevelIcon(currentLevel);
  const levelInfo = getLevelInfo(currentLevel);
  const getLevelBorderColor = (level: number) => {
    switch (level) {
      case 1:
        return "border-gray-400/30";
      case 2:
        return "border-blue-400/30";
      case 3:
        return "border-orange-400/30";
      case 4:
        return "border-purple-400/30";
      case 5:
        return "border-pink-400/30";
      default:
        return "border-gray-400/30";
    }
  };
  const getLevelBgColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-gray-500/10";
      case 2:
        return "bg-blue-500/10";
      case 3:
        return "bg-orange-500/10";
      case 4:
        return "bg-purple-500/10";
      case 5:
        return "bg-pink-500/10";
      default:
        return "bg-gray-500/10";
    }
  };
  const getLevelGlowColor = (level: number) => {
    switch (level) {
      case 1:
        return "rgba(156, 163, 175, 0.4)";
      case 2:
        return "rgba(59, 130, 246, 0.4)";
      case 3:
        return "rgba(249, 115, 22, 0.4)";
      case 4:
        return "rgba(139, 92, 246, 0.4)";
      case 5:
        return "rgba(236, 72, 153, 0.4)";
      default:
        return "rgba(156, 163, 175, 0.4)";
    }
  };
  const pointsToNext = nextLevelPoints - currentPoints;
  return (
    <div className={`${className}`}>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-3xl ${getLevelBgColor(currentLevel)} border ${getLevelBorderColor(currentLevel)} backdrop-blur-xl relative overflow-hidden`}
      >
        {" "}
        {/* Background glow effect */}{" "}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${getLevelGlowColor(currentLevel)} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />{" "}
        {/* Contenu principal */}{" "}
        <div className="relative z-10">
          {" "}
          {/* Header with icon and level */}{" "}
          <div className="flex items-center gap-6 mb-8">
            {" "}
            <motion.div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${levelInfo.colors.gradient} p-1 shadow-2xl border-2 ${getLevelBorderColor(currentLevel)}`}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: `0 0 30px ${getLevelGlowColor(currentLevel)}`,
              }}
            >
              {" "}
              <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                {" "}
                <LevelIcon
                  className={`w-12 h-12 text-gray-900 drop-shadow-lg`}
                />{" "}
              </div>{" "}
            </motion.div>{" "}
            <div>
              {" "}
              <motion.h3
                className={`text-3xl font-bold text-gray-900 mb-2`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {" "}
                {levelInfo.name}{" "}
              </motion.h3>{" "}
              <motion.p
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {" "}
                {levelInfo.description}{" "}
              </motion.p>{" "}
              <motion.p
                className="text-gray-500 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {" "}
                Level {currentLevel} • {levelInfo.emoji}{" "}
              </motion.p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Progression vers le niveau suivant */}{" "}
          <div className="space-y-4">
            {" "}
            <div className="flex justify-between items-center">
              {" "}
              <span className="text-gray-600 text-lg font-medium">
                {" "}
                Progression vers Level {currentLevel + 1}{" "}
              </span>{" "}
              <div className="text-right">
                {" "}
                <div className={`text-2xl font-bold text-gray-900`}>
                  {" "}
                  {currentPoints.toLocaleString()}{" "}
                </div>{" "}
                <div className="text-gray-500 text-sm">
                  {" "}
                  / {nextLevelPoints.toLocaleString()} pts{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Barre de progression */}{" "}
            <ProgressBar
              progress={progress}
              className="h-4"
              color={levelInfo.colors.gradient}
              showValue={true}
              animated={true}
              glowEffect={true}
            />{" "}
            {/* Additional information */}{" "}
            <div className="flex justify-between items-center text-sm">
              {" "}
              <span className="text-gray-600">
                {" "}
                {pointsToNext > 0
                  ? `${pointsToNext.toLocaleString()} points restants`
                  : "Niveau maximum atteint!"}{" "}
              </span>{" "}
              <span className={`font-bold text-gray-900`}>
                {" "}
                {Math.round(progress)}% completed{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
          {/* Next level rewards */}{" "}
          {currentLevel < 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              {" "}
              <h4 className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                {" "}
                <Trophy className="w-4 h-4 text-yellow-400" /> Level{" "}
                {currentLevel + 1} Rewards{" "}
              </h4>{" "}
              <div className="flex items-center gap-2 mb-2">
                {" "}
                <span className="text-2xl">
                  {getLevelInfo(currentLevel + 1).emoji}
                </span>{" "}
                <span className={`font-bold text-gray-900`}>
                  {" "}
                  {getLevelInfo(currentLevel + 1).name}{" "}
                </span>{" "}
              </div>{" "}
              <ul className="text-gray-600 text-sm space-y-1">
                {" "}
                <li>• {getLevelInfo(currentLevel + 1).description}</li>{" "}
                <li>• New missions unlocked</li>{" "}
                <li>• Access to advanced tools</li>{" "}
              </ul>{" "}
            </motion.div>
          )}{" "}
        </div>{" "}
        {/* Animated particles for high levels */}{" "}
        {currentLevel >= 4 && (
          <div className="absolute inset-0 pointer-events-none">
            {" "}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}{" "}
          </div>
        )}{" "}
      </motion.div>{" "}
    </div>
  );
}
