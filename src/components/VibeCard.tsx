import React from 'react';

interface VibeCardProps {
  title: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

export const VibeCard: React.FC<VibeCardProps> = ({
  title,
  imageUrl,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
        isSelected ? 'ring-4 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
      }`}
    >
      <div className="aspect-video relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h3 className="text-white text-2xl font-bold tracking-wider">
            {title.toUpperCase()}
          </h3>
        </div>
      </div>
    </div>
  );
};