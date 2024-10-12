import React, { useState,useEffect } from 'react';
import { fetchCampaigns } from '../lib/api';
import CampaignCard from './CampaignCard';
import './SearchDiscovery.css'
const SearchDiscovery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [filters, setFilters] = useState({ category: '', dateRange: '', amountRange: '' });
  const [sortOption, setSortOption] = useState('relevance');

  const handleSearch = async () => {
    try {
      const campaigns = await fetchCampaigns(query, filters, sortOption);
      setResults(campaigns);
      if (campaigns.length === 0) {
        alert('No results found.');
      }
    } catch (error) {
      alert('Error fetching campaigns. Please try again later.');
    }
  };

  return (
    <div className='search-container'>
      <input 
        type="text" 
        placeholder="Search campaigns..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>

      <div className="campaign-results">
        {results.map(campaign => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default SearchDiscovery;


