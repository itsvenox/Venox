import React from 'react';
import { Icons } from './Icons.jsx';

export function WebMockup({ color = 'var(--accent)', style = {} }) {
  return (
    <div className="hero-mockup" style={style}>
      <div className="mockup-bar">
        <div className="mockup-dot" style={{ background: '#ff5f57' }} />
        <div className="mockup-dot" style={{ background: '#ffbd2e' }} />
        <div className="mockup-dot" style={{ background: '#28ca41' }} />
      </div>
      <div className="mockup-content">
        <div className="mockup-skeleton">
          <div className="skeleton-line" style={{ width: '60%', height: 16 }} />
          <div className="skeleton-line" style={{ width: '40%', height: 10 }} />
          <div className="skeleton-block" style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }} />
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="skeleton-line" style={{ flex: 1, height: 40, borderRadius: 8 }} />
            <div className="skeleton-line" style={{ flex: 1, height: 40, borderRadius: 8 }} />
          </div>
          <div className="skeleton-line" style={{ width: '80%' }} />
          <div className="skeleton-line" style={{ width: '55%' }} />
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, onClick }) {
  return (
    <div className="card project-card" onClick={onClick}>
      <div className="project-preview" style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)` }}>
        <div className="project-preview-inner">
          <div className="project-mini-bar">
            <div className="project-mini-dot" style={{ background: '#ff5f57' }} />
            <div className="project-mini-dot" style={{ background: '#ffbd2e' }} />
            <div className="project-mini-dot" style={{ background: '#28ca41' }} />
          </div>
          <div className="project-mini-content">
            <div className="project-mini-line" style={{ width: '60%' }} />
            <div className="project-mini-line" style={{ width: '35%' }} />
            <div className="project-mini-block" style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}06)` }} />
          </div>
        </div>
      </div>
      <div className="project-info">
        <div className="project-tag" style={{ background: `${project.color}15`, color: project.color }}>{project.tag}</div>
        <h4>{project.title}</h4>
        <p>{project.desc}</p>
        <div className="project-stats">
          {project.stats.map((s, j) => (
            <div key={j} className="project-stat"><strong>{s.value}</strong>{s.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({ label, title, titleHighlight, subtitle, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? 600 : undefined, margin: center ? '0 auto' : undefined }}>
      <div className="section-label" style={center ? { justifyContent: 'center' } : undefined}>{label}</div>
      <h2>{title} <span className="gradient-text">{titleHighlight}</span></h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export function CTASection({ title, titleHighlight, subtitle, children }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-section">
          <h2>{title} <span className="gradient-text">{titleHighlight}</span></h2>
          <p>{subtitle}</p>
          <div className="cta-buttons">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
