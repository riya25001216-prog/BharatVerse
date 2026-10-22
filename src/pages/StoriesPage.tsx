import { useEffect } from 'react';
import { Stories } from '../components/Stories';

export function StoriesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="pt-20">
      <Stories onAsk={() => undefined} />
    </div>
  );
}
