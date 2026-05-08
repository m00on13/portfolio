import { MessageSquare, Download } from 'lucide-react';

interface SocialActionsProps {
  onOpenContact: () => void;
}

export const SocialActions = ({ onOpenContact }: SocialActionsProps) => {
  return (
    <div className="social-actions desktop-actions">
      <button onClick={onOpenContact} className="social-btn social-action-btn primary">
        <MessageSquare size={18} />
        Contact
      </button>
      <a href="/Mansi_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer" className="social-btn social-action-btn secondary">
        <Download size={18} />
        Resume
      </a>
    </div>
  );
};
