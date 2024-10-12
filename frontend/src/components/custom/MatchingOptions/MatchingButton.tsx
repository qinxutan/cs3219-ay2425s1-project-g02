import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client"; // WebSocket client for Socket.IO
import { Button } from "@/components/ui/button";
import { useStopwatch } from 'react-timer-hook'; 

interface MatchingButtonProps {
  selectedTopic: string[];
  selectedDifficulty: string[];
}

const MatchingButton: React.FC<MatchingButtonProps> = ({ selectedTopic, selectedDifficulty }) => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const socketRef = useRef<any>(null);

  const {
    seconds,
    minutes,
    start,
    reset,
  } = useStopwatch({ autoStart: false }); 

  useEffect(() => {
    if (isMatching) {
      const matchingServiceBackendUrl = import.meta.env.VITE_MATCHING_SERVICE_BACKEND_URL || "ws://localhost:5003";

      // Initialize WebSocket connection
      socketRef.current = io(matchingServiceBackendUrl); // Replace with actual backend URL

      // Listen for events from backend
      socketRef.current.on('match_found', (matchInfo: any) => {
        reset(); // Reset stopwatch
        setMatchFound(true);
        console.log('Match found:', matchInfo);
      });

      socketRef.current.on('matchmaking_timed_out', () => {
        reset(); // Reset stopwatch
        setIsMatching(false);
        console.log('Matchmaking timed out');
      });

      // Start matchmaking
      socketRef.current.emit('start_matching', {
        topic: selectedTopic,
        difficulty: selectedDifficulty,
      });

      // Start the stopwatch
      start();
    }

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      reset(); // Reset stopwatch
    };
  }, [isMatching]);

  const handleStartMatchmaking = () => {
    if (!selectedTopic.length || !selectedDifficulty.length) {
      alert("Please select both a topic and difficulty");
      return;
    }
    reset(); // Reset stopwatch
    setIsMatching(true);
  };

  const handleCancelMatchmaking = () => {
    reset();
    setIsMatching(false);
    socketRef.current.emit('cancel_matching');
  };

  return (
    <div>
      {isMatching && !matchFound ? (
        <div>
          <Button className="w-full" onClick={handleCancelMatchmaking} size="default">Cancel Matching</Button>
          <div className="flex justify-center items-center h-16">
            <p>Time elapsed: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
          </div>
        </div>
      ) : matchFound ? (
        <p>Match Found! Collaboration Starting...</p>
      ) : (
        <Button className="w-full" onClick={handleStartMatchmaking} size="default">Start Matching</Button>
      )}
    </div>
  );
};

export default MatchingButton;
