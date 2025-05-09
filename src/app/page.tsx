'use client';

import Image from "next/image";
import Link from "next/link";
import FadeInSection from "@/components/animations/FadeInSection";
import StaggeredList from "@/components/animations/StaggeredList";
import HoverCard from "@/components/animations/HoverCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Add type for iOS app
interface IOSApp {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  icon_url?: string;
  slug: string;
}

export default function Home() {
  const [featuredApps, setFeaturedApps] = useState<IOSApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedApps() {
      setLoading(true);
      const { data, error } = await supabase
        .from('ios_apps')
        .select('id, title, description, image_url, icon_url, slug')
        .eq('is_featured', true)
        .order('updated_at', { ascending: false })
        .limit(3);
      if (!error && data) {
        console.log('Featured apps data:', data);
        data.forEach(app => {
          console.log(`App ${app.title} icon URL:`, app.icon_url);
        });
        setFeaturedApps(data);
      }
      setLoading(false);
    }
    fetchFeaturedApps();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <FadeInSection className="w-full">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-7xl mb-6 text-neutral-900 dark:text-neutral-100 font-bold">
              Hello, I&apos;m Rushiraj
            </h1>
            <h2 className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 font-normal">
              Frontend Developer & iOS Engineer
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-10 max-w-lg mx-auto leading-relaxed">
              I design and build clean, minimal, and modern websites and mobile applications. This is my digital home where I share my work, thoughts, and things I love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/ios-apps" className="btn btn-primary">
                  View My Apps
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/contact" 
                  className="btn border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Featured iOS Apps */}
      <ScrollReveal className="py-24 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Featured iOS Apps</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Here are some of my iOS applications. I specialize in creating intuitive and beautiful experiences for Apple devices with clean interfaces and optimal performance.
          </p>
        </div>
        <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-lg" />
            ))
          ) : featuredApps.length > 0 ? (
            featuredApps.map(app => (
              <HoverCard key={app.id} className="bg-sand-50 dark:bg-neutral-800 overflow-hidden group">
                <div className="flex flex-col items-center justify-center pt-8">
                  {app.icon_url ? (
                    <Image
                      src={app.icon_url}
                      alt={app.title + ' icon'}
                      width={64}
                      height={64}
                      className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow mb-4"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mb-4 text-neutral-400">
                      <span className="text-2xl">📱</span>
                    </div>
                  )}
                </div>
                <div className="p-8 pt-4">
                  <h3 className="text-lg font-medium mb-3 text-center">{app.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6 text-sm leading-relaxed text-center">
                    {app.description}
                  </p>
                  <div className="flex justify-center">
                    <Link 
                      href={`/ios-apps#${app.slug}`}
                      className="text-neutral-900 dark:text-neutral-100 text-sm flex items-center uppercase tracking-wide hover:opacity-60"
                    >
                      View Details
                      <motion.svg 
                        className="ml-2 w-3 h-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </motion.svg>
                    </Link>
                  </div>
                </div>
              </HoverCard>
            ))
          ) : (
            <div className="col-span-3 text-center text-neutral-500 dark:text-neutral-400 py-12">
              No featured iOS apps found.
            </div>
          )}
        </StaggeredList>
        <div className="mt-16 text-center">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link 
              href="/ios-apps"
              className="text-sm uppercase tracking-wide flex items-center hover:opacity-60"
            >
              View All iOS Apps
              <motion.svg 
                className="ml-2 w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>

      {/* About Me Teaser */}
      <ScrollReveal className="py-24 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-16">
            <h2 className="text-4xl md:text-5xl mb-6">About Me</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              I&apos;m a frontend developer and iOS engineer passionate about creating beautiful and functional user experiences. I enjoy working with modern technologies and frameworks.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new music, reading, or enjoying nature.
            </p>
            <Link 
              href="/about"
              className="text-sm uppercase tracking-wide flex items-center hover:opacity-60 inline-flex"
            >
              Learn more about me
              <motion.svg 
                className="ml-2 w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </motion.svg>
            </Link>
          </div>
          <div className="md:w-1/2">
            <StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.15}>
              <motion.div 
                className="bg-cream-100 dark:bg-neutral-800 p-8 group hover:bg-cream-200 dark:hover:bg-neutral-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm uppercase tracking-wide mb-4">Frontend</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">React, Next.js, Tailwind CSS, TypeScript</p>
              </motion.div>
              <motion.div 
                className="bg-cream-100 dark:bg-neutral-800 p-8 group hover:bg-cream-200 dark:hover:bg-neutral-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm uppercase tracking-wide mb-4">iOS</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Swift, SwiftUI, UIKit, XCode</p>
              </motion.div>
              <motion.div 
                className="bg-cream-100 dark:bg-neutral-800 p-8 group hover:bg-cream-200 dark:hover:bg-neutral-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm uppercase tracking-wide mb-4">Interests</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Music, Books, Photography, Travel</p>
              </motion.div>
              <motion.div 
                className="bg-cream-100 dark:bg-neutral-800 p-8 group hover:bg-cream-200 dark:hover:bg-neutral-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm uppercase tracking-wide mb-4">Tools</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">VS Code, Figma, Git, Adobe Suite</p>
              </motion.div>
            </StaggeredList>
          </div>
        </div>
      </ScrollReveal>

      {/* Contact CTA */}
      <ScrollReveal 
        className="py-24 border-t border-neutral-200 dark:border-neutral-800" 
        direction="up"
        delay={0.1}
      >
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-6">Let's Work Together</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
            Have a project in mind or just want to say hello? I&apos;m always open to discussing new opportunities and interesting ideas.
          </p>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link 
              href="/contact"
              className="btn btn-primary"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>
    </>
  );
}
