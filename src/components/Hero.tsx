import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import velouraHeroImage from '../assests/veloura1.png';

export const Hero = () => {
  return (
    <section
      className="
        relative
        isolate
        w-full
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* ───────────────── BACKGROUND IMAGE ───────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src={velouraHeroImage}
          alt="Veloura luxury apparel"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
            scale-[1.02]
          "
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* ───────────────── MAIN CONTENT ───────────────── */}
      <div
        className="
          relative
          z-20
          w-full
          min-h-screen
          flex
          items-center
          px-6
          sm:px-8
          md:px-14
          lg:px-20
          pt-28
          pb-20
        "
      >
        <div className="max-w-[1600px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              max-w-[760px]
            "
          >
            {/* LEFT DECORATIVE LINE */}
            <div className="absolute -left-8 top-8 hidden xl:block">
              <div className="w-px h-40 bg-gradient-to-b from-transparent via-yellow-500/60 to-transparent" />
            </div>

            {/* TOP LABEL */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-black/20
                backdrop-blur-md
                px-5
                py-2.5
                mb-8
              "
            >
              <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_16px_rgba(201,168,76,0.9)]" />

              <span
                className="
                  text-[10px]
                  md:text-[11px]
                  uppercase
                  tracking-[0.32em]
                  font-semibold
                  text-brand-accent-glow/90
                "
              >
                Luxury Essentials / 2026
              </span>
            </motion.div>

            {/* ───────────────── TITLE ───────────────── */}
            <div className="overflow-visible">
              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(68px,10vw,170px)]
                  leading-[0.9]
                  uppercase
                  font-black
                  tracking-[-0.07em]
                  whitespace-nowrap
                  text-brand-accent-glow
                  select-none
                "
                style={{
                  textShadow: `
                    0 10px 50px rgba(201,168,76,0.18),
                    0 4px 24px rgba(0,0,0,0.45)
                  `,
                }}
              >
                VELOURA
              </motion.h1>

              {/* SUBTITLE */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 1,
                }}
                className="mt-4"
              >
                <span
                  className="
                    uppercase
                    italic
                    font-light
                    tracking-[0.42em]
                    text-[11px]
                    md:text-sm
                    text-white/62
                  "
                >
                  Modern Luxury Studio
                </span>
              </motion.div>
            </div>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 1,
              }}
              className="
                mt-10
                max-w-[36rem]
                text-[17px]
                md:text-[20px]
                leading-[1.9]
                font-medium
                text-white/88
              "
              style={{
                textShadow: '0 2px 16px rgba(0,0,0,0.45)',
              }}
            >
              Timeless comfort crafted with modern luxury.
              Elevate your everyday essentials with refined
              silhouettes, premium materials, and a presence
              designed for confidence.
            </motion.p>

            {/* ───────────────── BUTTONS ───────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 1,
              }}
              className="
                mt-12
                flex
                flex-col
                sm:flex-row
                items-stretch
                sm:items-center
                gap-5
              "
            >
              {/* PRIMARY BUTTON */}
              <Link
                to="/collections"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  px-10
                  md:px-12
                  py-5
                  uppercase
                  text-center
                  font-black
                  tracking-[0.22em]
                  text-[10px]
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                  active:scale-95
                "
                style={{
                  background: '#C9A84C',
                  color: '#000',
                  boxShadow:
                    '0 20px 60px rgba(201,168,76,0.24)',
                }}
              >
                {/* Shine Effect */}
                <span className="absolute inset-y-0 -left-16 w-10 rotate-12 bg-white/40 blur-sm transition-all duration-1000 group-hover:left-[130%]" />

                <span className="relative z-10">
                  Explore Collection
                </span>
              </Link>

              {/* SECONDARY BUTTON */}
              <Link
                to="/studio"
                className="
                  rounded-2xl
                  border
                  border-white/12
                  bg-white/[0.03]
                  backdrop-blur-md
                  px-10
                  md:px-12
                  py-5
                  uppercase
                  text-center
                  font-black
                  tracking-[0.22em]
                  text-[10px]
                  text-brand-accent-glow
                  transition-all
                  duration-500
                  hover:bg-white
                  hover:text-black
                  hover:border-white
                "
              >
                Our Story
              </Link>
            </motion.div>

            {/* FOOTER LABEL */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8,
                duration: 1.5,
              }}
              className="mt-16 flex items-center gap-4"
            >
              <div className="w-12 h-px bg-brand-accent-glow/50" />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.42em]
                  text-brand-accent-glow/80
                "
              >
                Season 04 / Editorial
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ───────────────── SIDE SCROLL ───────────────── */}
      <div
        className="
          absolute
          left-5
          md:left-8
          top-1/2
          -translate-y-1/2
          hidden
          xl:flex
          flex-col
          items-center
          gap-8
          opacity-40
          z-30
        "
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent" />

        <span
          className="
            vertical-rl
            text-[10px]
            uppercase
            tracking-[0.7em]
            text-brand-accent-glow/70
          "
        >
          Scroll
        </span>
      </div>
    </section>
  );
};
