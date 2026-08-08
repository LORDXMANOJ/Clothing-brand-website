import React from 'react';
import { Shirt, Flower2, Ruler, Footprints, Watch, Dumbbell } from 'lucide-react';

export const CategoryIcon = ({ category, className = "w-3.5 h-3.5 inline-block" }) => {
  switch (category) {
    case 'Outerwear':
      return <Shirt className={className} />;
    case 'Dresses':
      return <Flower2 className={className} />;
    case 'Tops':
      return <Shirt className={className} />;
    case 'Bottoms':
      return <Ruler className={className} />;
    case 'Footwear':
      return <Footprints className={className} />;
    case 'Accessories':
      return <Watch className={className} />;
    case 'Activewear':
      return <Dumbbell className={className} />;
    default:
      return <Shirt className={className} />;
  }
};
