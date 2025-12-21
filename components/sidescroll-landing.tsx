"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import Image from "next/image"

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
          className="flex h-full w-[300dvw]"
        >
          <div className="relative h-full w-[100vw] flex-shrink-0">
            <Image
              src="/bg.png"
              alt="Road background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative h-full w-[100vw] flex-shrink-0">
            <Image
              src="/bg.png"
              alt="Road background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-full w-[100vw] flex-shrink-0">
            <Image
              src="/bg.png"
              alt="Road background"
              fill
              className="object-cover"
            />
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

