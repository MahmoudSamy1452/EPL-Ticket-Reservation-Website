import MatchSlot from "./MatchSlot";
import { useEffect, useState } from "react";

const MatchSchedule = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const request = await fetch("http://localhost:20396/getMatches");
      const data = await request.json();
      setMatches(data.match);
    };
    fetchMatches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto  max-h-[80vh] overflow-scroll no-scrollbar"> 
      {matches &&
        matches.map((match) => (
          <MatchSlot
            key={match.id}
            team1_id={match.home_team}
            team2_id={match.away_team}
            team1={match.hometeam.name}
            team2={match.awayteam.name}
            date={match.date}
            stadium={match.stadium.name}
          />
        ))}
    </div>
  );
};

export default MatchSchedule;
