'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  animate,
  AnimationPlaybackControls,
} from 'motion/react';
import Image from 'next/image';

const buildings = [
  { id: 'market', src: '/market.png', alt: 'Market', left: '0%' },
  { id: 'pizzeria', src: '/pizzeria.png', alt: 'Pizzeria', left: '4.2%' },
  { id: 'bakery', src: '/bakery.png', alt: 'Bakery', left: '8.4%' },
  { id: 'barber', src: '/barber.png', alt: 'Barbershop', left: '12.6%' },
  { id: 'books', src: '/books.png', alt: 'Bookstore', left: '16.8%' },
  { id: 'boutique', src: '/boutique.png', alt: 'Boutique', left: '21%' },
  { id: 'flowers', src: '/flowers.png', alt: 'Flower Shop', left: '25.2%' },
  {
    id: 'fruits',
    src: '/fruits-and-vegetables.png',
    alt: 'Fruits and Vegetables',
    left: '29.4%',
  },
  { id: 'pharmacy', src: '/pharmacy.png', alt: 'Pharmacy', left: '33.6%' },
  {
    id: 'building-1',
    src: '/new-assets/1.webp',
    alt: 'Building 1',
    left: '37.8%',
  },
  {
    id: 'building-2',
    src: '/new-assets/2.webp',
    alt: 'Building 2',
    left: '42%',
  },
  {
    id: 'building-3',
    src: '/new-assets/3.webp',
    alt: 'Building 3',
    left: '46.2%',
  },
  {
    id: 'building-4',
    src: '/new-assets/4.webp',
    alt: 'Building 4',
    left: '50.4%',
  },
  {
    id: 'building-5',
    src: '/new-assets/5.webp',
    alt: 'Building 5',
    left: '54.6%',
  },
  {
    id: 'building-6',
    src: '/new-assets/6.webp',
    alt: 'Building 6',
    left: '58.8%',
  },
  {
    id: 'building-7',
    src: '/new-assets/7.webp',
    alt: 'Building 7',
    left: '63%',
  },
  {
    id: 'building-8',
    src: '/new-assets/8.webp',
    alt: 'Building 8',
    left: '67.2%',
  },
  {
    id: 'building-9',
    src: '/new-assets/9.webp',
    alt: 'Building 9',
    left: '71.4%',
  },
  {
    id: 'building-10',
    src: '/new-assets/10.webp',
    alt: 'Building 10',
    left: '75.6%',
  },
  {
    id: 'building-11',
    src: '/new-assets/11.webp',
    alt: 'Building 11',
    left: '79.8%',
  },
  {
    id: 'building-12',
    src: '/new-assets/12.webp',
    alt: 'Building 12',
    left: '84%',
  },
  {
    id: 'building-13',
    src: '/new-assets/13.webp',
    alt: 'Building 13',
    left: '88.2%',
  },
  {
    id: 'building-14',
    src: '/new-assets/14.webp',
    alt: 'Building 14',
    left: '92.4%',
  },
  {
    id: 'building-15',
    src: '/new-assets/20.webp',
    alt: 'Building 15',
    left: '96.6%',
  },
  {
    id: 'building-16',
    src: '/new-assets/16.webp',
    alt: 'Building 16',
    left: '100%',
  },
];

const BACKGROUNDS = ['/new-assets/sunday.webp', '/new-assets/night.webp'];
const BUILDING_BOTTOMS = ['27dvh', '27dvh'];
const CAR_BOTTOMS = ['20%', '20%'];

function getTimeBasedBackgroundIndex(): number {
  const now = new Date();
  const hours = now.getHours();

  const isDay = hours >= 6 && hours < 20;
  return isDay ? 0 : 1;
}

export function SidescrollLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [airplaneX, setAirplaneX] = useState(100);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);
  const airplaneAnimationRef = useRef<AnimationPlaybackControls | null>(null);
  const [backgroundTiles, setBackgroundTiles] = useState(3);
  const [currentBgIndex, setCurrentBgIndex] = useState(() =>
    getTimeBasedBackgroundIndex()
  );

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const translateX = useTransform(
    smoothProgress,
    [0, 1],
    ['0%', `-${(backgroundTiles - 1) * 100}%`]
  );
  const scrollByAmount = useCallback((amount: number) => {
    window.scrollBy({
      top: amount,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const updateBackground = () => {
      const newIndex = getTimeBasedBackgroundIndex();
      setCurrentBgIndex(newIndex);
    };

    updateBackground();

    const interval = setInterval(updateBackground, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastTileCheck = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;
          const clientHeight = window.innerHeight;
          const currentScrollY = scrollTop;

          if (currentScrollY > lastScrollY.current) {
            setScrollDirection('down');
          } else if (currentScrollY < lastScrollY.current) {
            setScrollDirection('up');
          }
          lastScrollY.current = currentScrollY;

          const now = Date.now();
          if (
            scrollTop + clientHeight > scrollHeight * 0.8 &&
            now - lastTileCheck > 500
          ) {
            setBackgroundTiles((prev) => prev + 3);
            lastTileCheck = now;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollStep = window.innerHeight * 0.3;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByAmount(scrollStep);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByAmount(-scrollStep);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollByAmount]);

  useEffect(() => {
    if (airplaneAnimationRef.current) {
      airplaneAnimationRef.current.stop();
    }

    let currentX = airplaneX;

    const animateAirplane = () => {
      const startX = currentX;
      const endX = scrollDirection === 'down' ? -20 : 120;
      const duration = Math.abs(endX - startX) / 15;

      const controls = animate(startX, endX, {
        duration: duration,
        ease: 'linear',
        onUpdate: (latest) => {
          setAirplaneX(latest);
          currentX = latest;
        },
        onComplete: () => {
          if (scrollDirection === 'down') {
            currentX = 100;
            setAirplaneX(100);
          } else {
            currentX = -20;
            setAirplaneX(-20);
          }
          animateAirplane();
        },
      });

      airplaneAnimationRef.current = controls;
      return controls;
    };

    const controls = animateAirplane();
    return () => {
      if (controls) controls.stop();
    };
  }, [scrollDirection]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const direction = scrollTop > lastScrollY.current ? 'down' : 'up';
      setScrollDirection(direction);

      if (scrollTop === 0) {
        setBackgroundTiles(3);
      } else {
        setBackgroundTiles((prev) => {
          if (direction === 'down') return prev + 0.3;
          else return prev > 3 ? prev - 0.05 : 2;
        });
      }

      lastScrollY.current = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative "
      style={{ height: `${backgroundTiles * 100}dvh` }}
    >
      <div className="sticky top-0 h-dvh w-screen overflow-hidden ">
        <motion.div
          ref={scrollContainerRef}
          style={{ x: translateX }}
          className="absolute flex h-dvh w-[600dvw]"
        >
          {Array.from({ length: backgroundTiles }).map((_, index) => (
            <div
              key={index}
              className="relative h-dvh w-[100dvw] flex-shrink-0"
            >
              <Image
                src={BACKGROUNDS[currentBgIndex]}
                alt="Road background"
                fill
                className="object-fill object-bottom"
                priority
              />
            </div>
          ))}

          <div className="pointer-events-none absolute inset-0">
            {buildings.map((building) => (
              <motion.div
                key={building.id}
                className="absolute  flex items-end pointer-events-auto cursor-pointer"
                style={{
                  left: building.left,
                  height: '360px',
                  bottom: BUILDING_BOTTOMS[currentBgIndex],
                  translateX,
                }}
                whileHover={{
                  y: -10,
                  filter: 'drop-shadow(0 0 20px rgba(255, 200, 100, 0.6))',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <div className="relative h-full w-[360px]">
                  <Image
                    src={building.src}
                    alt={building.alt}
                    fill
                    priority
                    className="object-contain object-bottom"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`pointer-events-none fixed left-[10%] z-50 w-[200px] md:w-[280px] lg:w-[320px]`}
          style={{
            bottom: CAR_BOTTOMS[currentBgIndex],
            transform: scrollDirection === 'up' ? 'scaleX(-1)' : 'scaleX(1)',
            transformOrigin: 'center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            willChange: 'transform',
          }}
          animate={{
            scaleX: scrollDirection === 'up' ? -1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/car.png"
            alt="Car"
            width={320}
            height={160}
            className="h-auto w-full drop-shadow-lg"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
            }}
            priority
            quality={100}
            unoptimized
          />
        </motion.div>

        <motion.div
          style={{
            x: `${airplaneX}vw`,
            transform: scrollDirection === 'up' ? 'scaleX(-1)' : 'scaleX(1)',
            transformOrigin: 'center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            willChange: 'transform',
          }}
          animate={{
            scaleX: scrollDirection === 'up' ? -1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="pointer-events-none fixed top-[10%] left-0 z-40 w-[250px] md:w-[300px] lg:w-[260px]"
        >
          <Image
            src="/airplane.png"
            alt="Airplane"
            width={260}
            height={130}
            className="h-auto w-full"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
            }}
            quality={100}
            unoptimized
          />
        </motion.div>
      </div>
    </div>
  );
}
