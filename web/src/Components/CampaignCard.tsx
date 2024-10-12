import React from 'react';
import './CampaignCard.css'
interface CampaignCardProps {
  campaign: {
    _id: string;
    name: string;
    goal: number;
    amount_raised: number;
    category: string;
  };
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  return (
    <div className="campaign-card">
      <h3>{campaign.name}</h3>
      <p>Goal: ${campaign.goal}</p>
      <p>Raised: ${campaign.amount_raised}</p>
      <p>Category: {campaign.category}</p>
    </div>
  );
};

export default CampaignCard;

