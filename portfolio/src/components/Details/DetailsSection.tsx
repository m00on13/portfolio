import React from 'react';
import './DetailsSection.css';

const DetailsSection: React.FC = () => {
    const experiences = [
        {
            role: "AI Full Stack Engineer",
            company: "Neural Nexus AI",
            period: "2023 - Present",
            description: "Spearheading the development of generative AI workflows, integrating LLMs into web ecosystems, and optimizing RAG pipelines for enterprise-scale applications. Built a custom distributed training dashboard using React and Python."
        },
        {
            role: "Junior Machine Learning Engineer",
            company: "DataDynamics",
            period: "2021 - 2023",
            description: "Developed and deployed computer vision models for automated quality control. Enhanced system accuracy by 15% through hyperparameter tuning and data augmentation strategies."
        }
    ];

    const projects = [
        {
            title: "Self-Evolving Neural Explorer",
            category: "AI / Tech",
            link: "#",
            description: "A visualization tool for monitoring live neural network training with real-time gradient descent animations."
        },
        {
            title: "ChromaFlow: Generative Art Suite",
            category: "Art / Creative",
            link: "#",
            description: "A digital canvas where AI interprets user brushstrokes into abstract, evolving masterpieces."
        }
    ];

    const blogs = [
        {
            title: "Bridging the Gap: AI in Creative Workflows",
            platform: "Medium",
            link: "https://medium.com",
            date: "Oct 2023"
        },
        {
            title: "Optimizing Vite for Heavy 3D Graphics",
            platform: "Medium",
            link: "https://medium.com",
            date: "Aug 2023"
        }
    ];

    return (
        <div className="details-container">
            <div className="details-grid">
                {/* Left Column: Resume & Socials */}
                <div className="details-column">
                    <section className="details-group">
                        <h2 className="section-title">Experience</h2>
                        {experiences.map((exp, i) => (
                            <div key={i} className="experience-item">
                                <div className="exp-header">
                                    <h3>{exp.role}</h3>
                                    <span className="exp-period">{exp.period}</span>
                                </div>
                                <p className="exp-company">{exp.company}</p>
                                <p className="exp-desc">{exp.description}</p>
                            </div>
                        ))}
                    </section>

                    <section className="details-group">
                        <h2 className="section-title">Connect</h2>
                        <div className="social-links">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                                LinkedIn <span className="arrow">↗</span>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link github">
                                GitHub <span className="arrow">↗</span>
                            </a>
                        </div>
                    </section>
                </div>

                {/* Right Column: Projects & Blogs */}
                <div className="details-column">
                    <section className="details-group">
                        <h2 className="section-title">Projects</h2>
                        <div className="project-grid">
                            {projects.map((proj, i) => (
                                <div key={i} className="project-card">
                                    <span className="project-category">{proj.category}</span>
                                    <h3>{proj.title}</h3>
                                    <p>{proj.description}</p>
                                    <a href={proj.link} className="project-link">View Project</a>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="details-group">
                        <h2 className="section-title">Medium Blogs</h2>
                        <div className="blog-list">
                            {blogs.map((blog, i) => (
                                <a key={i} href={blog.link} target="_blank" rel="noopener noreferrer" className="blog-item">
                                    <div className="blog-info">
                                        <h4>{blog.title}</h4>
                                        <span>{blog.date}</span>
                                    </div>
                                    <span className="arrow">↗</span>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DetailsSection;
