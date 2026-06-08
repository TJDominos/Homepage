import React from 'react';

interface ProductLogoProps {
  src?: string;
  className?: string;
  alt?: string;
}

const ProductLogo: React.FC<ProductLogoProps> = ({ src, className = '', alt = 'Product logo' }) => {
  if (!src) {
    return (
      <div className={`bg-gradient-to-br from-[#4CAF50] to-[#2196F3] flex items-center justify-center text-white text-lg font-bold ${className}`}>
        ?
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = `bg-gradient-to-br from-[#4CAF50] to-[#2196F3] flex items-center justify-center text-white text-lg font-bold ${className}`;
        placeholder.textContent = '?';
        target.parentNode?.replaceChild(placeholder, target);
      }}
    />
  );
};

export default ProductLogo;
