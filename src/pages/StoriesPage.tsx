import { Stories } from '../components/Stories';
import { useAsk } from '../lib/ask';

export function StoriesPage() {
  const ask = useAsk();

  return (
    <div className="pt-20">
      <Stories onAsk={ask} />
    </div>
  );
}
