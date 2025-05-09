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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome</h1>
          <p className="text-xl text-gray-600 mb-12">
            I&apos;m passionate about creating elegant solutions to complex problems.
          </p>
        </div>
      </div>
    </div>
  );
}
