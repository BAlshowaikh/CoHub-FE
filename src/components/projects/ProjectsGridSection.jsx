// Wrapper component around tehe project cards 
const ProjectsGridSection = ({ children }) => {
  return (
    <div className="projects-panel">
      <div className="projects-panel__inner">{children}</div>
    </div>
  )
}

export default ProjectsGridSection
