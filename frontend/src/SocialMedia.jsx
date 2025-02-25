// frontend/src/components/SocialMedia.jsx
import React, { useState, useEffect } from 'react';

const SocialMedia = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [posts, setPosts] = useState([]); // Mock data or fetch from an API

  // Mock data for demonstration (replace with real data from your backend or API)
  const mockPosts = {
    Instagram: [
      { id: 1, title: 'Instagram Post 1', description: 'Great event photo!', previewImage: '/path/to/instagram1.jpg', socialCreatedAt: '2025-02-25', platformUrl: 'https://www.instagram.com/post1' },
      { id: 2, title: 'Instagram Post 2', description: 'Community gathering!', previewImage: '/path/to/instagram2.jpg', socialCreatedAt: '2025-02-24', platformUrl: 'https://www.instagram.com/post2' },
    ],
    Facebook: [
      { id: 3, title: 'Facebook Post 1', description: 'Church announcement!', previewImage: '/path/to/facebook1.jpg', socialCreatedAt: '2025-02-23', platformUrl: 'https://www.facebook.com/post1' },
    ],
    YouTube: [
      { id: 4, title: 'YouTube Video 1', description: 'Sermon highlight!', previewImage: '/path/to/youtube1.jpg', socialCreatedAt: '2025-02-22', platformUrl: 'https://www.youtube.com/watch?v=video1' },
    ],
  };

  useEffect(() => {
    // Trigger fade-in animation when the component mounts
    setIsVisible(true);

    // In a real app, fetch posts from your Django backend or API here
    // For now, use mock data
    setPosts(mockPosts);
  }, []);

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const filteredPosts = selectedPlatform === 'All'
    ? Object.values(posts).flat()
    : posts[selectedPlatform] || [];

  return (
    <div className={`container mt-5 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
      <h2>Latest Social Media Posts</h2>
      <div className="btn-group mb-3" role="group" aria-label="Platform filter">
        {['All', 'Instagram', 'Facebook', 'YouTube'].map((platform) => (
          <a
            key={platform}
            href={`?platform=${platform}`}
            className={`btn btn-primary filter-btn ${selectedPlatform === platform ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handlePlatformChange(platform);
            }}
          >
            {platform}
          </a>
        ))}
      </div>
      {Object.entries(posts).map(([platform, platformPosts]) => (
        platformPosts.length > 0 && (
          <div key={platform}>
            <h3>{platform}</h3>
            <div className="row">
              {filteredPosts
                .filter(post => post.platform === platform || selectedPlatform === 'All')
                .map((post) => (
                  <div key={post.id} className={`col-md-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
                    <div className="card mb-4">
                      {post.previewImage && (
                        <img src={post.previewImage} className="card-img-top" alt={`Preview for ${post.title}`} />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                        <p className="card-text"><small className="text-muted">{post.socialCreatedAt}</small></p>
                        <a
                          href={post.platformUrl}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to {post.platform}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={`text-center mb-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <a
                href={`https://www.${platform.toLowerCase()}.com`}
                className="btn btn-secondary platform-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {platform}
              </a>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default SocialMedia;