import { motion } from "framer-motion";
import Image from "next/image";
import { GlassContainer } from "./GlassContainer";
import { ProgressBar } from "./ProgressBar";
import { getLevelIcon, getLevelInfo } from "@/components/icons/level-icons";
interface DJProfileCardProps {
  name: string;
  level: string;
  points: number;
  maxPoints: number;
  imageUrl: string;
}
export function DJProfileCard({
  name,
  level,
  points,
  maxPoints,
  imageUrl,
}: DJProfileCardProps) {
  const progress = (points / maxPoints) * 100;
  const levelNumber = parseInt(level);
  const LevelIcon = getLevelIcon(levelNumber);
  const levelInfo = getLevelInfo(levelNumber);
  const getLevelBorderColor = (level: string) => {
    switch (level) {
      case "1":
        return "border-gray-400/30";
      case "2":
        return "border-blue-400/30";
      case "3":
        return "border-orange-400/30";
      case "4":
        return "border-purple-400/30";
      case "5":
        return "border-pink-400/30";
      default:
        return "border-gray-400/30";
    }
  };
  return (
    <GlassContainer className="p-6">
      {" "}
      <div className="space-y-6">
        {" "}
        {/* Profile Image */}{" "}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full aspect-square rounded-2xl overflow-hidden"
        >
          {" "}
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />{" "}
          {/* Overlay gradient */}{" "}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />{" "}
          {/* Level Badge - Positioned on the image */}{" "}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: 0.2,
            }}
            className="absolute top-4 right-4"
          >
            {" "}
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${levelInfo.colors.gradient} p-1 shadow-2xl border-2 ${getLevelBorderColor(level)}`}
            >
              {" "}
              <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                {" "}
                <LevelIcon className="w-10 h-10 text-gray-900 drop-shadow-lg" />{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>{" "}
        </motion.div>{" "}
        {/* Profile Info */}{" "}
        <div className="space-y-4">
          {" "}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {" "}
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              {name}
            </h2>{" "}
            <div className="flex items-center gap-3">
              {" "}
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${levelInfo.colors.gradient} p-0.5 shadow-xl`}
              >
                {" "}
                <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  {" "}
                  <LevelIcon className="w-7 h-7 text-gray-900 drop-shadow-sm" />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <div className={`text-lg font-bold text-gray-900`}>
                  {" "}
                  {levelInfo.name}{" "}
                </div>{" "}
                <div className="text-gray-600 text-sm">
                  {" "}
                  {levelInfo.description}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>{" "}
          {/* Progress */}{" "}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-2"
          >
            {" "}
            <div className="flex justify-between items-center text-sm">
              {" "}
              <span className="text-gray-600">Progression</span>{" "}
              <span className={`font-bold text-gray-900`}>
                {points}/{maxPoints} pts
              </span>{" "}
            </div>{" "}
            <ProgressBar
              progress={progress}
              className="h-3"
              color={levelInfo.colors.gradient}
              showValue={true}
              animated={true}
              glowEffect={true}
            />{" "}
          </motion.div>{" "}
        </div>{" "}
      </div>{" "}
    </GlassContainer>
  );
}
