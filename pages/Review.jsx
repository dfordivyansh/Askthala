import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Import your dynamic components
import ReviewHero from '../components/ReviewHero';
import ReviewTabs from '../components/ReviewTabs';
import ReviewDetail from '../components/ReviewDetail';
import Review1 from '../components/Review'; // This handles the user comments

const Review = () => {
  const { id } = useParams(); // 1. Get the ID from the URL (e.g., /review/123)
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the Site Data from Firebase
  useEffect(() => {
    const fetchSite = async () => {
      if (!id) return; // Stop if no ID is present
      
      try {
        const docRef = doc(db, 'betting-sites', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // Combine the ID with the data
          setSiteData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document found!");
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSite();
  }, [id]);

  // 3. Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 4. Error State (if ID is wrong)
  if (!siteData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-bold mb-2">Review Not Found</h2>
        <p>We couldn't find the betting site you're looking for.</p>
      </div>
    );
  }

  // 5. Render Components with Data
  return (
    <div>
      {/* Pass the fetched 'siteData' prop to your components */}
      <ReviewHero site={siteData} />
      
      <ReviewTabs site={siteData} />
      
      <ReviewDetail site={siteData} />
      
      {/* Pass 'siteId' to the comments section so it loads the right comments */}
      <Review1 siteId={id} /> 
    </div>
  );
};

export default Review;