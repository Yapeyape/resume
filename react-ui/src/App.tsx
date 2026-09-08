import { useEffect, useRef, useState } from 'react'
import { BriefcaseBusiness, FolderKanban, GraduationCap, Mail, Palette, Sparkles } from 'lucide-react'
import { BackgroundPaths } from '@/components/ui/background-paths'

const media = (name: string) => `${import.meta.env.BASE_URL}resume-media/${encodeURIComponent(name)}`
const videos = ['Adobe Express - Timeline 2.mp4', 'Sequence 01.mp4', 'referenssi.mp4']
const stills = ['Photo 1.jpg', 'Photo 2.jpg', 'Photo 3.jpg', 'Photo 4.jpg', 'Photo 5.webp', 'Photo 6.jpg', 'Photo 7.jpg', 'Photo 8.jpg', 'Photo 9.jpg', 'Photo 10.jpg', 'Photo 11.jpg']
const profiles = ['Harri.jpg', 'Johannes.jpg', 'Mikael.jpg', 'Minna.jpg', 'Olli.jpg']
const courses = ['Digital Systems Design, Development and Deployment (DS3D)', 'IT ja ihmisen käyttäytyminen', 'Kuluttajakäyttäytyminen digitalisoituvassa ympäristössä', 'Disruptive Technologies in Digital Business', 'Johdatus tiedusteluun', 'Digital Services and Innovation', 'Data ja sen hallinta', 'Digitalisaatio ja sen johtaminen', 'Tilinpäätös- ja verosuunnittelu', 'Kustannuslaskenta', 'Kirjanpito ja tuloslaskenta', 'Johdatus rahoitukseen', 'Suomen talous ja talouspolitiikka', 'Asiakassuhde- ja palvelujohtaminen', 'Kuluttajakäyttäytyminen', 'Digitaalinen markkinointi', 'Tilastomenetelmien peruskurssi', 'Tietokannat ja tiedonhallinta', 'Tuotekehitysprojekti', 'Uudet teknologiat yhteiskunnassa', 'Projektin hallinta', 'Palvelumuotoiluprojekti', 'Tietohallinnon perusteet', 'Ihmisen ja tietokoneen vuorovaikutus', 'Ohjelmointi 1', 'Johdatus algoritmiseen ajatteluun', 'IT-infrastruktuuri ja palveluiden hallinta', 'Kokonaisarkkitehtuuri käytännössä', 'Tietoverkot', 'Johdatus sovelluskehitykseen', 'Tietojärjestelmien kehittäminen', 'Yritysjärjestelmät ja niiden arkkitehtuurit', 'Liiketoimintaosaamisen perusteiden soveltaminen', 'Laskentatoimen perusteet', 'Markkinoinnin perusteet', 'Viestinnän johtamisen perusteet', 'Johtamisen ja johtajuuden perusteet']
const experiences = [
  ['2024 — 2026', 'Freelancer', 'Self-employed · Central Finland', 'Social media management and content creation, WordPress development and façade painting projects alongside university studies and the master\'s thesis.'],
  ['2017 — 2024', 'Founder & Business Owner', 'Suojaväri Oy — house painting & façade maintenance · Central Finland', 'Founded and grew a façade painting business, managing everything from client acquisition to project delivery.'],
  ['2020 — 2021', 'Sales', 'Fonum · Part-time', 'Sale of telephone subscriptions and phone maintenance.'],
  ['2018 — 2020', 'Point of Sale Manager', 'Rakettitukku · Part-time', 'Responsible for the point of sale during the New Year\'s season.'],
  ['2016 — 2017', 'Customer Procurer', 'Koreka Oy · Part-time', 'Arranged sales meetings by phone.'],
  ['2012 — 2016', 'Earlier roles', 'Sutiva Oy · Travaille Oy · Rakennustoimisto Kalevi Alonen Oy', 'Summer and part-time work as a house painter and construction worker.'],
]

type Icon = typeof Sparkles
function SectionTitle({ icon: IconComponent, children }: { icon: Icon; children: string }) {
  return <h2 className="section-title"><IconComponent aria-hidden="true" />{children}</h2>
}

function App() {
  const [videoIndex, setVideoIndex] = useState(0)
  const [stillIndex, setStillIndex] = useState(0)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const projectVideoRef = useRef<HTMLVideoElement>(null)
  const stillCount = stills.length + 1
  const showingProfiles = stillIndex === stills.length

  useEffect(() => {
    const timer = window.setTimeout(() => setStillIndex((index) => (index + 1) % stillCount), showingProfiles ? 2000 : 1000)
    return () => window.clearTimeout(timer)
  }, [stillIndex, showingProfiles, stillCount])

  useEffect(() => {
    videoRef.current?.load()
    void videoRef.current?.play().catch(() => undefined)
  }, [videoIndex])

  // Pause videos while scrolled out of view so they don't decode frames off-screen.
  useEffect(() => {
    const videos = [projectVideoRef.current, videoRef.current].filter((v): v is HTMLVideoElement => v !== null)
    if (videos.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) void video.play().catch(() => undefined)
          else video.pause()
        }
      },
      { threshold: 0.2 },
    )
    videos.forEach((video) => observer.observe(video))
    return () => observer.disconnect()
  }, [])

  return (
    <BackgroundPaths>
      <nav className="resume-nav" aria-label="Resume sections">
        {['about', 'experience', 'projects', 'creative', 'education', 'contact'].map((id) => <a key={id} href={`#${id}`}>{id[0].toUpperCase() + id.slice(1)}</a>)}
      </nav>
      <main className="resume-sheet">
        <header className="resume-hero" id="about">
          <img className="hero-portrait" src={media('Jasper_Anttila.webp')} alt="Portrait of Jasper Anttila" />
          <h1>Jasper Anttila</h1>
          <p className="hero-role">M.Sc. in Information Systems — <mark>digital services, data &amp; design</mark></p>
          <p className="hero-lede">I am interested in working with digital services, data and visual design. I enjoy optimizing and automating processes to make work easier and more efficient. I recently completed my master&apos;s degree and have experience running a business with nearly €300k in turnover.</p>
          <ul className="hero-links"><li><a href="mailto:jasper.a.anttila@gmail.com">jasper.a.anttila@gmail.com</a></li><li><a href="https://www.linkedin.com/in/jasper-anttila-210ba91b9/">LinkedIn</a></li><li><a href="tel:+358405672193">+358 40 567 2193</a></li><li>Jyväskylä, Finland</li></ul>
          <div className="about-copy"><p>I&apos;m a 27-year-old recent graduate with an M.Sc. in Information Systems from the University of Jyväskylä, where my thesis examined how software developers experience generative AI tools. Before and during my studies, I founded and ran a house painting business that grew to 10+ seasonal employees and nearly €300k in turnover.</p><p>I combine that hands-on business background with technical skills and practical experience in web development, visual content editing and creation, alongside earlier experience in sales, customer service, and customer acquisition.</p><p>Outside of work, I spend time with family and friends, stay active through sports, love traveling, and enjoy photography and video editing when I get the chance.</p></div>
        </header>
        <section className="resume-section capabilities"><SectionTitle icon={Sparkles}>Capabilities</SectionTitle>{[['Web Development', 'AI-assisted development · WordPress · Website maintenance'], ['Creative', 'Content creation · Graphic design · UX/UI design · Photoshop · Illustrator · Photography · Video editing'], ['Business', 'Project management · Client acquisition · Marketing · Team leadership · Sales']].map(([title, text]) => <div className="cap-row" key={title}><h3>{title}</h3><p>{text}</p></div>)}</section>
        <section className="resume-section" id="experience"><SectionTitle icon={BriefcaseBusiness}>Experience</SectionTitle>{experiences.map(([when, title, org, text]) => <article className="job" key={title}><p className="job-when">{when}</p><div><h3>{title}</h3><p className="job-org">{org}</p><p>{text}</p></div></article>)}</section>
        <section className="resume-section" id="education"><SectionTitle icon={GraduationCap}>Education</SectionTitle><article className="job"><p className="job-when">2021 — 2026</p><div><h3>B.Sc. &amp; M.Sc., Information Systems</h3><p className="job-org">University of Jyväskylä · Kauppatieteiden maisteri, pääaineena tietojärjestelmätiede</p><p>Information systems, data, digitalization, marketing and finance.</p><div className="theses"><a href="https://jyx.jyu.fi/jyx/Record/jyx_123456789_92372"><span>Bachelor&apos;s thesis · Grade 5</span><strong>AI Utilization in Consumer Customer Journey</strong><em>Check thesis →</em></a><a href="https://jyx.jyu.fi/jyx/Record/jyx_123456789_112063"><span>Master&apos;s thesis · Grade 4</span><strong>Software Developers and Generative AI: Job Demands and Resources</strong><em>Check thesis →</em></a></div></div></article><button className="courses-toggle" onClick={() => setCoursesOpen(!coursesOpen)} aria-expanded={coursesOpen}>Selected university courses <span>37</span><b>{coursesOpen ? '−' : '+'}</b></button>{coursesOpen && <div className="courses-grid">{courses.map((course) => <span key={course}>{course}</span>)}</div>}</section>
        <section className="resume-section" id="projects"><SectionTitle icon={FolderKanban}>Selected projects</SectionTitle><p className="section-intro">A few recent projects.</p><div className="project-grid"><article><video ref={projectVideoRef} className="project-media" autoPlay muted loop playsInline preload="metadata"><source src={media('Keittiövisu.mp4')} type="video/mp4" /></video><h3>Kitchen Renovation Visualizer</h3><p>Browser-based sales tool built with JavaScript, n8n workflows, and AI APIs for image generation and automation.</p></article><article><img className="project-media" src={media('Shift planning.png')} alt="Shift planning application dashboard" /><h3>Custom shift planning application in a few days</h3><p>Built a functioning app for gym workforce management using AI-assisted development.</p></article><article><div className="project-media-grid"><img src={media('wordpress1.png')} alt="Website example" /><img src={media('wordpress2.png')} alt="Website example" /></div><h3>High ranking websites</h3><p>WordPress websites built and optimized for search results and user experience.</p></article><article><img className="project-media" src={media('content.png')} alt="Media content creation example" /><h3>Media content creation</h3><p>Social media content creation and account management for business clients.</p></article></div></section>
        <section className="resume-section" id="creative"><SectionTitle icon={Palette}>Bonus: Content creation</SectionTitle><p className="section-intro">A glimpse at the photography, editing and visual content I create.</p><div className="creative-grid"><article><h3>Video editing</h3><p>Filming and editing video content for digital channels and client content.</p><video ref={videoRef} className={videoIndex === 2 ? 'creative-video landscape' : 'creative-video'} autoPlay muted playsInline onEnded={() => setVideoIndex((index) => (index + 1) % videos.length)}><source src={media(videos[videoIndex])} type="video/mp4" /></video><div className="dots">{videos.map((name, index) => <button className={index === videoIndex ? 'active' : ''} key={name} onClick={() => setVideoIndex(index)} aria-label={name} />)}</div></article><article><h3>Still images and editing</h3><p>Still images and edited visual work from personal and creative projects.</p><div className="still-stage">{showingProfiles ? <div className="profile-bubbles">{profiles.map((name) => <img key={name} src={media(name)} alt={name} />)}</div> : <img src={media(stills[stillIndex])} alt={`Photo ${stillIndex + 1}`} />}</div></article></div></section>
        <section className="resume-section contact" id="contact"><SectionTitle icon={Mail}>Get in touch</SectionTitle><p>I&apos;m currently open to new opportunities in digital services, data and development.</p><a className="contact-email" href="mailto:jasper.a.anttila@gmail.com">jasper.a.anttila@gmail.com</a><p>+358 40 567 2193 · LinkedIn · Jyväskylä, Finland</p></section>
        <footer className="footer"><span>Jasper Anttila</span><span>Jyväskylä, Finland · 2026</span></footer>
      </main>
    </BackgroundPaths>
  )
}

export default App
