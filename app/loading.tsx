import LoadingIndicator from '@/components/LoadingIndicator';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#151521] flex items-center justify-center p-4">
      <LoadingIndicator
        size="lg"
        variant="dark"
        message="Loading Lobo's Travel Wizard"
        subtext="Initializing tour operations & itinerary workspace..."
      />
    </div>
  );
}
