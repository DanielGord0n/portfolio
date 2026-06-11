import React from 'react';
import { Link } from 'react-router-dom';
import { useLightbox } from './Lightbox';
import '../styles/ProjectCard3D.css';

// Cards deliberately do not track the pointer with transforms: moving a
// surface that contains links makes them miss clicks. Hover feedback is
// border, glow, and the racing stripe instead.
const ProjectCard3D = ({ index, title, company, category, description, tags, links, image, imageWide, logoTreatment }) => {
    const { openLightbox } = useLightbox();

    const monogram = title
        .split(/\s+/)
        .map(word => word[0])
        .filter(ch => /[A-Za-z0-9]/.test(ch))
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <article className="project-card-3d">
            <div className="project-card-content">
                <div className="card-top-row">
                    {image ? (
                        <button
                            type="button"
                            className={`card-logo ${imageWide ? 'card-logo-wide' : ''} ${logoTreatment ? `card-logo-${logoTreatment}` : ''}`}
                            onClick={() => openLightbox(image, title)}
                            aria-label={`View ${title} logo larger`}
                            title="Click to enlarge"
                        >
                            <img src={image} alt={`${title} logo`} loading="lazy" />
                        </button>
                    ) : (
                        <div className="card-monogram">{monogram}</div>
                    )}
                    <div className="card-top-meta">
                        {index != null && (
                            <span className="card-index">{String(index).padStart(2, '0')}</span>
                        )}
                        {category && <span className="card-category">{category}</span>}
                    </div>
                </div>

                <div className="project-info">
                    <h3 className="project-title-3d">{title}</h3>
                    {company && <span className="card-company">{company}</span>}
                    <p className="project-desc-3d">{description}</p>

                    <ul className="project-tags-3d">
                        {tags.map((tag, i) => (
                            <li key={i}>{tag}</li>
                        ))}
                    </ul>

                    {links && links.length > 0 && (
                        <div className="card-links">
                            {links.map((link, i) =>
                                link.internal ? (
                                    <Link key={i} to={link.url} className="project-link-pill">
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                ) : (
                                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link-pill">
                                        {link.icon}
                                        <span>{link.label || (link.url.includes('github') ? 'GitHub' : 'Visit')}</span>
                                    </a>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProjectCard3D;
