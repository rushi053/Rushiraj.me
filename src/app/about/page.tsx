import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <section className="py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About Me</h1>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src="/profile.PNG"
                alt="Rushiraj"
                fill
                className="object-contain bg-white"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
              Hello! I&apos;m Rushiraj, a passionate frontend developer and iOS engineer dedicated to creating clean, modern, and user-friendly digital experiences.
            </p>
            
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              With a strong foundation in web and mobile development, I enjoy bringing ideas to life through code. I specialize in building responsive websites and intuitive iOS applications that prioritize user experience and performance.
            </p>
            
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              My journey in tech began several years ago, and I&apos;ve been continuously learning and growing since then. I&apos;m always excited to explore new technologies and methodologies to improve my craft.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">My Skills</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Frontend Development</h3>
                <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li>React & Next.js</li>
                  <li>JavaScript/TypeScript</li>
                  <li>HTML5 & CSS3</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">iOS Development</h3>
                <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li>Swift</li>
                  <li>SwiftUI</li>
                  <li>UIKit</li>
                  <li>Core Data</li>
                  <li>XCode</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Beyond Coding</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-3">
              When I&apos;m not immersed in code, you can find me:
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1 mb-6">
              <li>Exploring new music and making playlists</li>
              <li>Reading books on technology, design, and fiction</li>
              <li>Taking photos of urban landscapes and nature</li>
              <li>Traveling and experiencing different cultures</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold mb-8">My Journey</h2>
        
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">2021 - Present</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-xl mb-2">Senior Frontend Developer</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">Company Name</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Leading frontend development for various web applications, implementing modern UI/UX designs, and optimizing performance across all platforms.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">2019 - 2021</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-xl mb-2">iOS Developer</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">Company Name</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Developed and maintained iOS applications, collaborated with design and product teams, and contributed to the app architecture and code quality.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">2017 - 2019</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-xl mb-2">Junior Web Developer</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">Company Name</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Built responsive websites and web applications, worked closely with senior developers to learn best practices, and participated in code reviews and team discussions.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">2013 - 2017</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-xl mb-2">Computer Science Degree</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">University Name</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Studied computer science with a focus on software development and user experience design.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold mb-8">Things I Love</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Music</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              I enjoy a wide range of music genres, from indie rock to electronic. Some of my favorite artists include Radiohead, Bonobo, and Tycho.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Books</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              I&apos;m an avid reader of both fiction and non-fiction. Some recent favorites include &quot;Atomic Habits&quot; by James Clear and &quot;The Design of Everyday Things&quot; by Don Norman.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Technology</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Beyond my work, I&apos;m passionate about technology and gadgets. I enjoy exploring new tools and platforms that enhance productivity and creativity.
            </p>
          </div>
        </div>
      </section>
    </>
  );
} 