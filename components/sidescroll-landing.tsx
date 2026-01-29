'use client';

import {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  animate,
  AnimationPlaybackControls,
} from 'motion/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

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
    alt: 'Fruits and Vegetables',
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

const sunOrMoon = ['/sun.webp', '/moon.webp'];

const Background = ['/day-background.webp', '/night-bg.webp'];
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
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const joystickRef = useRef<NodeJS.Timeout | null>(null);
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
  const scrollByAmount = useCallback((amount: number) => {
    window.scrollBy({
      top: amount,
      behavior: 'smooth',
    });
  }, []);

  useLayoutEffect(() => {
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
  const handleMove = (dir: 'left' | 'right') => {
    const scrollStep = dir === 'right' ? 30 : -30;
    const move = () => {
      window.scrollBy({ top: scrollStep, behavior: 'auto' });
      joystickRef.current = setTimeout(move, 16);
    };
    move();
  };

  const stopMove = () => {
    if (joystickRef.current) clearTimeout(joystickRef.current);
  };

  console.log(
    'Rendering SidescrollLanding with background index:',
    backgroundTiles,
  );
  return (
    <div className="w-full relative">
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white text-center p-6 lg:hidden landscape:hidden">
        <motion.div
          animate={{ rotate: 90 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <RotateCw size={64} className="mb-4 text-amber-400" />
        </motion.div>
        <h2 className="text-xl font-bold uppercase tracking-widest">
          Landscape Mode Required
        </h2>
      </div>

      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${Background[currentBgIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="fixed top-[-10dvh] right-5 w-[400px] h-[400px] z-[5] pointer-events-none max-lg:right-[-20] max-md:right-[-40] max-md:w-[200px] max-md:h-[200px]">
        <div className="relative w-full h-full">
          <Image
            src={sunOrMoon[currentBgIndex]}
            alt="Sun"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {currentBgIndex === 0 && (
        <div className="fixed top-[-10dvh] left-5 w-[400px] h-[400px] z-[5] pointer-events-none max-lg:left-[-20] max-md:right-[-40] max-md:w-[200px] max-md:h-[200px]">
          <div className="relative w-full h-full">
            <Image
              src="/cloud.webp"
              alt="Clouds"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      <div ref={containerRef} style={{ height: `${backgroundTiles * 100}dvh` }}>
        <div className="sticky top-50 h-dvh w-screen overflow-hidden max-md:top-18">
          <motion.div
            ref={scrollContainerRef}
            style={{ x: translateX }}
            className="absolute flex h-dvh w-[600dvw] z-10"
          >
            {Array.from({ length: backgroundTiles }).map((_, index) => (
              <div
                key={`road-${index}`}
                className="relative h-dvh w-[100dvw] flex-shrink-0  "
              >
                <Image
                  src="/road.webp"
                  alt="Road"
                  fill
                  className="object-fill object-bottom"
                  priority
                />
              </div>
            ))}

            <div className="pointer-events-none absolute top-0 left-0 h-dvh w-[600dvw]">
              {buildings.map((building) => (
                <motion.div
                  key={building.id}
                  className="absolute pointer-events-auto cursor-pointer bottom-[38dvh] max-lg:bottom-[40dvh] max-md:bottom-[37dvh]"
                  style={{
                    left: building.left,
                  }}
                >
                  <div className="relative w-[300px] h-[300px] max-md:w-[150px] max-md:h-[150px]">
                    <Image
                      src={building.src}
                      alt={building.alt}
                      fill
                      className="object-contain object-bottom"
                      priority
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none fixed left-[10%] z-50 w-[200px] md:w-[280px] lg:w-[320px] bottom-[3%] max-xl:bottom-[1%] max-md:w-[150px]  max-md:h-[150px] max-md:bottom-[-15%]"
            style={{
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
            className="pointer-events-none fixed top-[10%] left-0 z-40 w-[250px] md:w-[300px] lg:w-[260px] max-md:w-[150px] max-md:h-[150px]"
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

      <div className="hidden landscape:flex">
        <div className="fixed bottom-5 left-5 z-[10000] lg:hidden">
          <button
            onPointerDown={() => handleMove('left')}
            onPointerUp={stopMove}
            onPointerLeave={stopMove}
            onTouchStart={() => handleMove('left')}
            onTouchEnd={stopMove}
            className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center active:scale-90 transition-transform touch-none select-none shadow-2xl"
          >
            <ChevronLeft size={35} className="text-white" />
          </button>
        </div>

        <div className="fixed bottom-5 right-5 z-[10000] lg:hidden">
          <button
            onPointerDown={() => handleMove('right')}
            onPointerUp={stopMove}
            onPointerLeave={stopMove}
            onTouchStart={() => handleMove('right')}
            onTouchEnd={stopMove}
            className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center active:scale-90 transition-transform touch-none select-none shadow-2xl"
          >
            <ChevronRight size={35} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
