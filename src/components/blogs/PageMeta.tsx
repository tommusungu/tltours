// PageMeta.js
import { useEffect } from 'react';
const PageMeta = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null; // This component doesn't render anything
};

export default PageMeta;
