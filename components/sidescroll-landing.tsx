'use client';

import { useRef, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sunOrMoon = ['/sun.webp', '/moon.webp'];
const Background = ['/day-background.webp', '/night-bg.webp'];

function getTimeBasedBackgroundIndex(): number {
  const hours = new Date().getHours();
  return hours >= 6 && hours < 20 ? 0 : 1;
}

const buildings = [
  { id: 'market', src: '/market.png', alt: 'Market', left: '5%' },
  { id: 'pizzeria', src: '/pizzeria.png', alt: 'Pizzeria', left: '12%' },
  { id: 'bakery', src: '/bakery.png', alt: 'Bakery', left: '19%' },
  { id: 'barber', src: '/barber.png', alt: 'Barbershop', left: '26%' },
  { id: 'books', src: '/books.png', alt: 'Bookstore', left: '33%' },
  { id: 'boutique', src: '/boutique.png', alt: 'Boutique', left: '40%' },
  { id: 'flowers', src: '/flowers.png', alt: 'Flower Shop', left: '47%' },
  {
    id: 'fruits',
    src: '/fruits-and-vegetables.png',
    alt: 'Fruits & Vegetables',
    left: '54%',
  },
  { id: 'pharmacy', src: '/pharmacy.png', alt: 'Pharmacy', left: '61%' },
  {
    id: 'building-1',
    src: '/new-assets/1.webp',
    alt: 'Building 1',
    left: '68%',
  },
  {
    id: 'building-2',
    src: '/new-assets/2.webp',
    alt: 'Building 2',
    left: '75%',
  },
  {
    id: 'building-3',
    src: '/new-assets/3.webp',
    alt: 'Building 3',
    left: '82%',
  },
  {
    id: 'building-4',
    src: '/new-assets/4.webp',
    alt: 'Building 4',
    left: '89%',
  },
  {
    id: 'building-5',
    src: '/new-assets/5.webp',
    alt: 'Building 5',
    left: '96%',
  },
  {
    id: 'building-6',
    src: '/new-assets/6.webp',
    alt: 'Building 6',
    left: '103%',
  },
  {
    id: 'building-7',
    src: '/new-assets/7.webp',
    alt: 'Building 7',
    left: '110%',
  },
  {
    id: 'building-8',
    src: '/new-assets/8.webp',
    alt: 'Building 8',
    left: '117%',
  },
  {
    id: 'building-9',
    src: '/new-assets/9.webp',
    alt: 'Building 9',
    left: '124%',
  },
  {
    id: 'building-10',
    src: '/new-assets/10.webp',
    alt: 'Building 10',
    left: '131%',
  },
  {
    id: 'building-11',
    src: '/new-assets/11.webp',
    alt: 'Building 11',
    left: '138%',
  },
  {
    id: 'building-12',
    src: '/new-assets/12.webp',
    alt: 'Building 12',
    left: '145%',
  },
  {
    id: 'building-13',
    src: '/new-assets/13.webp',
    alt: 'Building 13',
    left: '152%',
  },
  {
    id: 'building-14',
    src: '/new-assets/17.webp',
    alt: 'Building 14',
    left: '159%',
  },
  {
    id: 'building-15',
    src: '/new-assets/21.webp',
    alt: 'Building 15',
    left: '166%',
  },
  {
    id: 'building-16',
    src: '/new-assets/16.webp',
    alt: 'Building 16',
    left: '173%',
  },
];

const MAX_TILES = 200;
const BASE_TILES = 3;

export function SidescrollLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);

  const lastScrollY = useRef(0);
  const airplaneX = useRef(100);

  const joystickInterval = useRef<NodeJS.Timeout | null>(null);
  const isJoystickActive = useRef(false);

  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [backgroundTiles, setBackgroundTiles] = useState(BASE_TILES);
  const [currentBgIndex, setCurrentBgIndex] = useState(
    getTimeBasedBackgroundIndex(),
  );
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const translateX = useTransform(
    smoothProgress,
    [0, 1],
    ['0%', `-${(backgroundTiles - 1) * 100}%`],
  );
  const memoizedBuildings = useMemo(() => buildings, []);

  useLayoutEffect(() => {
    const interval = setInterval(
      () => setCurrentBgIndex(getTimeBasedBackgroundIndex()),
      60000,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobileOrTablet && isLandscape) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const direction = scrollTop > lastScrollY.current ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY.current = scrollTop;

      setBackgroundTiles((prev) => {
        if (scrollTop === 0) return BASE_TILES;
        return direction === 'down'
          ? Math.min(prev + 0.3, MAX_TILES)
          : prev > BASE_TILES
            ? prev - 0.05
            : BASE_TILES;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileOrTablet, isLandscape]);

  const handleMoveStart = (dir: 'left' | 'right') => {
    if (joystickInterval.current) return;

    isJoystickActive.current = true;
    setScrollDirection(dir === 'right' ? 'down' : 'up');

    const step = dir === 'right' ? 10 : -10;

    joystickInterval.current = setInterval(() => {
      const maxScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage =
        maxScrollHeight > 0 ? currentScroll / maxScrollHeight : 0;

      if (dir === 'right') {
        setBackgroundTiles((prev) => {
          if (scrollPercentage > 0.15 && prev < MAX_TILES) {
            let tilesToAdd = 2;
            if (scrollPercentage > 0.7) tilesToAdd = 5;
            else if (scrollPercentage > 0.5) tilesToAdd = 4;
            else if (scrollPercentage > 0.3) tilesToAdd = 3;
            return Math.min(prev + tilesToAdd, MAX_TILES);
          }
          return prev;
        });
      } else {
        setBackgroundTiles((prev) => {
          if (currentScroll <= BASE_TILES) return BASE_TILES;
          if (prev > BASE_TILES) {
            const reductionRate =
              scrollPercentage < 0.1 ? 0.3 : scrollPercentage < 0.2 ? 0.2 : 0.1;
            return Math.max(prev - reductionRate, BASE_TILES);
          }
          return prev;
        });
      }

      window.scrollBy({ top: step, behavior: 'instant' });
    }, 16);
  };

  const handleMoveEnd = () => {
    if (joystickInterval.current) {
      clearInterval(joystickInterval.current);
      joystickInterval.current = null;
    }

    setTimeout(() => {
      isJoystickActive.current = false;
    }, 100);
  };
  useEffect(() => {
    let animationFrame: number;
    const loop = () => {
      const speed = 0.4;
      if (scrollDirection === 'down') {
        airplaneX.current -= speed;
        if (airplaneX.current < -30) airplaneX.current = 100;
      } else {
        airplaneX.current += speed;
        if (airplaneX.current > 120) airplaneX.current = -20;
      }
      if (airplaneRef.current) {
        airplaneRef.current.style.transform = `translateX(${airplaneX.current}vw) scaleX(${scrollDirection === 'up' ? -1 : 1})`;
      }
      animationFrame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrame);
  }, [scrollDirection]);

  return (
    <div className="w-full relative">
      {isMobileOrTablet && isLandscape && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 text-white text-lg sm:text-2xl font-bold p-4 text-center">
          Please rotate your device to{' '}
          <span className="text-yellow-400">Portrait</span> mode
        </div>
      )}

      <div
        className="fixed inset-0 w-full h-full z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${Background[currentBgIndex]}')` }}
      />

      <div className="fixed right-4 top-4 z-[999] pointer-events-none w-[120px]  lg:top-[-50] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px]">
        <Image
          src={sunOrMoon[currentBgIndex]}
          alt="Sun/Moon"
          fill
          className="object-contain"
        />
      </div>

      {currentBgIndex === 0 && (
        <div className="fixed left-4 top-4 lg:top-[-50] z-[998] pointer-events-none w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px]">
          <Image
            src="/cloud.webp"
            alt="Clouds"
            fill
            className="object-contain"
          />
        </div>
      )}

      {(!isMobileOrTablet || !isLandscape) && (
        <div
          ref={containerRef}
          style={{ height: `${backgroundTiles * 100}dvh` }}
        >
          <div className="sticky top-0 h-dvh w-screen overflow-hidden">
            <motion.div
              ref={scrollContainerRef}
              style={{ x: translateX }}
              className="absolute flex h-dvh w-[600dvw] z-10 top-40"
            >
              {Array.from({ length: backgroundTiles }).map((_, i) => (
                <div
                  key={`road-${i}`}
                  className="relative h-dvh w-[100dvw] flex-shrink-0"
                >
                  <Image
                    src="/road.webp"
                    alt="Road"
                    fill
                    className="object-fill object-bottom"
                  />
                </div>
              ))}

              <div className="pointer-events-none absolute top-0 left-0 h-dvh w-[600dvw]">
                {memoizedBuildings.map((b) => (
                  <div
                    key={b.id}
                    className="absolute bottom-[40dvh] lg:bottom-[38dvh]"
                    style={{ left: b.left }}
                  >
                    <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[330px] lg:h-[330px] xl:w-[350px] xl:h-[350px]">
                      <Image
                        src={b.src}
                        alt={b.alt}
                        fill
                        className="object-contain object-bottom"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="pointer-events-none fixed left-[8%] bottom-[8%] md:bottom-[12%] lg:bottom-[7%] z-50 w-[150px] sm:w-[180px] md:w-[300px] lg:w-[330px] xl:w-[350px]"
              style={{
                transform:
                  scrollDirection === 'up' ? 'scaleX(-1)' : 'scaleX(1)',
              }}
            >
              <Image
                src="/car.png"
                alt="Car"
                width={320}
                height={160}
                className="h-auto w-full drop-shadow-lg"
              />
            </motion.div>

            <div
              ref={airplaneRef}
              className="pointer-events-none fixed top-[10%] left-0 z-40 w-[150px] sm:w-[180px] md:w-[300px] lg:w-[330px] xl:w-[350px]"
            >
              <Image
                src="/airplane.png"
                alt="Airplane"
                width={260}
                height={130}
                className="h-auto w-full"
              />
            </div>

            <div className="fixed bottom-4 left-0 w-full flex justify-between px-8 z-50 sm:hidden">
              <button
                className="bg-gray-800/90 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl active:bg-gray-700 active:scale-95 touch-none transition-all"
                onMouseDown={() => handleMoveStart('left')}
                onMouseUp={handleMoveEnd}
                onMouseLeave={handleMoveEnd}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleMoveStart('left');
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleMoveEnd();
                }}
                onTouchCancel={(e) => {
                  e.preventDefault();
                  handleMoveEnd();
                }}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="bg-gray-800/90 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl active:bg-gray-700 active:scale-95 touch-none transition-all"
                onMouseDown={() => handleMoveStart('right')}
                onMouseUp={handleMoveEnd}
                onMouseLeave={handleMoveEnd}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleMoveStart('right');
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleMoveEnd();
                }}
                onTouchCancel={(e) => {
                  e.preventDefault();
                  handleMoveEnd();
                }}
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
