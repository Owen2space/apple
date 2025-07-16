import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Import photos with correct .jpeg extension
import photo1 from '@/assets/photos/photo1.jpeg';
import photo2 from '@/assets/photos/photo2.jpeg';
import photo3 from '@/assets/photos/photo3.jpeg';
import photo4 from '@/assets/photos/photo4.jpeg';
import photo5 from '@/assets/photos/photo5.jpeg';

// Updated photos array using local files and no captions
const photos = [
  { id: 1, url: photo1 },
  { id: 2, url: photo2 },
  { id: 3, url: photo3 },
  { id: 4, url: photo4 },
  { id: 5, url: photo5 }
];

interface PhotoGalleryProps {
  isVisible: boolean;
}

const PhotoGallery = ({ isVisible }: PhotoGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    const onChange = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onChange);
    return () => {
      api.off("select", onChange);
    };
  }, [api]);

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-8 animate-fade-in">
      <h3 className="text-2xl font-bold text-center mb-4 text-primary">Our Special Memories 📸</h3>
      
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo.id} className="basis-full">
              <div className="p-1">
                <Card className="overflow-hidden border-primary/20">
                  <CardContent className="p-0 flex items-center justify-center bg-black/5" style={{ minHeight: '300px' }}>
                    <img 
                      src={photo.url} 
                      alt={`Memory ${index + 1}`} 
                      className="object-contain max-h-[300px] max-w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      <div className="flex justify-center gap-1 mt-2">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              current === index ? "bg-primary" : "bg-primary/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery; 