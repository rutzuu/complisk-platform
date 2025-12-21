"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import Image from "next/image"

const buildings = [
  { id: "market", src: "/market.png", alt: "Market", left: "15%" },
  { id: "pizzeria", src: "/pizzeria.png", alt: "Pizzeria", left: "21%" },
  { id: "bakery", src: "/bakery.png", alt: "Bakery", left: "27%" },
  { id: "barber", src: "/barber.png", alt: "Barbershop", left: "34%" },
  { id: "books", src: "/books.png", alt: "Bookstore", left: "41%" },
  { id: "boutique", src: "/boutique.png", alt: "Boutique", left: "48%" },
  { id: "flowers", src: "/flowers.png", alt: "Flower Shop", left: "55%" },
  { id: "fruits", src: "/fruits-and-vegetables.png", alt: "Fruits and Vegetables", left: "61.5%" },
  { id: "pharmacy", src: "/pharmacy.png", alt: "Pharmacy", left: "68%" },
]

export function SidescrollLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const translateX = useTransform(smoothProgress, [0, 1], ["0%", "-66.666%"])

  const scrollByAmount = useCallback((amount: number) => {
    window.scrollBy({
      top: amount,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollStep = window.innerHeight * 0.3

      if (e.key === "ArrowRight") {
        e.preventDefault()
        scrollByAmount(scrollStep)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollByAmount(-scrollStep)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [scrollByAmount])

  return (
    <div ref={containerRef} className="relative h-[300dvh]">
      <div className="sticky top-0 h-dvh w-screen overflow-hidden">
        <motion.div
          ref={scrollContainerRef}
          style={{ x: translateX }}
          className="absolute flex h-dvh w-[300dvw]"
        >
          <div className="relative h-dvh w-[100dvw] flex-shrink-0">
            <Image
              src="/bg.png"
              alt="Road background"
              fill
              className="object-fill object-bottom"
              priority
            />
          </div>
          <div className="relative h-dvh w-[100dvw] flex-shrink-0">
            <Image
              src="/bg.png"
              alt="Road background"
              fill
              className="object-fill object-bottom"
            />
          </div>
          <div className="relative h-dvh w-[100dvw] flex-shrink-0">
            <Image
              src="/bg.png"
              alt="Road background"
              fill
              className="object-fill object-bottom"
            />
          </div>

          <div className="pointer-events-none absolute inset-0">
            {buildings.map((building) => (
              <div
                key={building.id}
                className="absolute bottom-[16dvh]"
                style={{ left: building.left }}
              >
                <Image
                  src={building.src}
                  alt={building.alt}
                  width={360}
                  height={360}
                  className="h-auto w-[120px] md:w-[150px] lg:w-[360px]"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="pointer-events-none fixed bottom-[8%] left-[10%] z-50 w-[200px] md:w-[280px] lg:w-[320px]">
          <Image
            src="/car.png"
            alt="Car"
            width={320}
            height={160}
            className="h-auto w-full drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
}

