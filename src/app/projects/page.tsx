import ProjectCard from "@/components/ProjectCard";

// This data would ideally come from a CMS or API
const projects = [
  {
    id: 1,
    title: "Modern E-commerce Website",
    description: "A fully responsive e-commerce website built with React, Next.js and integrated with a headless CMS for content management.",
    imageUrl: "/projects/project1.jpg",
    tags: ["React", "Next.js", "Tailwind CSS", "Headless CMS"],
    link: "/projects/ecommerce-website",
  },
  {
    id: 2,
    title: "Task Management iOS App",
    description: "A beautiful and functional task management application for iOS, built with Swift and SwiftUI with seamless cloud synchronization.",
    imageUrl: "/projects/project2.jpg",
    tags: ["Swift", "SwiftUI", "iOS", "CloudKit"],
    link: "/projects/task-management-app",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A clean and modern portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
    imageUrl: "/projects/project3.jpg",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    link: "/projects/portfolio-website",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A sleek weather dashboard that provides real-time weather information with beautiful visualizations.",
    imageUrl: "/projects/project4.jpg",
    tags: ["React", "API Integration", "Chart.js"],
    link: "/projects/weather-dashboard",
  },
  {
    id: 5,
    title: "Fitness Tracking iOS App",
    description: "An iOS application for tracking workouts, nutrition, and progress towards fitness goals with Apple Health integration.",
    imageUrl: "/projects/project5.jpg",
    tags: ["Swift", "UIKit", "HealthKit", "iOS"],
    link: "/projects/fitness-app",
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    description: "A real-time chat application with private messaging, group chats, and file sharing capabilities.",
    imageUrl: "/projects/project6.jpg",
    tags: ["React", "Node.js", "Socket.io", "Firebase"],
    link: "/projects/chat-app",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl">
          Here's a selection of my recent work spanning web development and iOS applications. Each project represents my passion for clean design and quality code.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              link={project.link}
            />
          ))}
        </div>
      </section>
      
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold mb-8">My Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-xl mb-3">Discovery</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Understanding the problem, defining goals, and researching the target audience to ensure the solution meets their needs.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-xl mb-3">Design</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Creating wireframes and visual designs that focus on user experience, aesthetics, and functional requirements.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <span className="text-green-600 dark:text-green-400 font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-xl mb-3">Development</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Writing clean, efficient, and maintainable code to bring the design to life, with attention to performance and accessibility.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <span className="text-yellow-600 dark:text-yellow-400 font-bold text-xl">4</span>
            </div>
            <h3 className="font-semibold text-xl mb-3">Testing & Launch</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Thorough testing across devices and browsers, followed by deployment and ongoing support and improvements.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Have a project idea?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            I'm always interested in new and challenging projects. If you have an idea you'd like to discuss, feel free to reach out.
          </p>
          <a
            href="/contact"
            className="btn btn-primary inline-block"
          >
            Let's Talk
          </a>
        </div>
      </section>
    </>
  );
} 