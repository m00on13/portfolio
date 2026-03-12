import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import './GitHubCalendar.css';

interface Props {
  username: string;
}

const GitHubActivity: React.FC<Props> = ({ username }) => {
  const theme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <div className="github-activity-card">
      <div className="card-header">
        <h3 className="card-title">GitHub Activity</h3>
        <a 
          href={`https://github.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="github-profile-link"
        >
          @{username} ↗
        </a>
      </div>
      <div className="calendar-wrapper">
        <GitHubCalendar 
          username={username}
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          theme={theme}
          colorScheme="dark"
        />
      </div>
    </div>
  );
};

export default GitHubActivity;
