import { TECH_STACK } from '../../../constants/data';

export const SocialTechStack = () => {
  return (
    <>
      <span className="social-section-label">tech stack</span>
      <div className="social-techstack">
        {TECH_STACK.map((tag) => (
          <span key={tag} className="tech-hashtag">{tag}</span>
        ))}
      </div>
    </>
  );
};
