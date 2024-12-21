import { useState } from 'react';

const Tasks = ({ onTaskComplete }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Watch Blockchain Video',
      description: 'Learn about blockchain technology',
      reward: '1 PooCoin',
      status: 'incomplete',
      type: 'one-time',
      videoUrl: 'https://www.youtube.com/embed/SSo_EIwHSd4'
    },
    {
      id: 2,
      title: 'Rate Your Experience',
      description: 'Rate your first toilet experience',
      reward: '1 PooCoin',
      status: 'incomplete',
      type: 'one-time'
    },
    {
      id: 3,
      title: 'Report Issue',
      description: 'Report an issue with a toilet',
      reward: '1 PooCoin',
      status: 'incomplete',
      type: 'repeatable'
    },
    {
      id: 4,
      title: 'Write a Review',
      description: 'Write your first detailed review',
      reward: '1 PooCoin',
      status: 'incomplete',
      type: 'repeatable'
    }
  ]);

  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const handleTaskClick = (task) => {
    if (task.videoUrl) {
      setSelectedVideo(task.videoUrl);
      setShowVideo(true);
    } else {
      handleTaskComplete(task.id);
    }
  };

  const handleTaskComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'complete' }
          : task
      )
    );
    
    if (onTaskComplete) {
      onTaskComplete(1);
    }
  };

  const handleCloseVideo = () => {
    handleTaskComplete(1);
    setShowVideo(false);
  };

  const handleVideoEnd = () => {
    handleTaskComplete(1);
    setShowVideo(false);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Tasks</h2>
        
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${task.type === 'daily' ? 'bg-blue-100 text-blue-700' : 
                        task.type === 'one-time' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'}
                    `}>
                      {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{task.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="font-medium text-amber-600">{task.reward}</span>
                  </div>
                  <button 
                    onClick={() => handleTaskClick(task)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium
                      ${task.status === 'complete' 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-amber-500 text-white hover:bg-amber-600'}
                    `}
                    disabled={task.status === 'complete'}
                  >
                    {task.status === 'complete' ? 'Completed' : 'Complete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Learn About Blockchain</h3>
              <button 
                onClick={handleCloseVideo}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src={selectedVideo}
                title="Blockchain Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleVideoEnd}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
