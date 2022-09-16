import React from "react";
import { Stats } from "../../models/pokemon";
import "./ProgressBar.css"

interface StatsProps {
  stats: Stats;
}

const statPercentage = (statNumber: number) => {
  const percentage: number = (statNumber * 100) / 255;
  return percentage;
};

export const ProgressBar = (props: StatsProps) => {
  return (
    <div className="progress_bar_stat">
      <p>{props.stats.stat.name}</p>
      <div className="progress_bar">
      <div style={{width: `${statPercentage(props.stats.base_stat)}%`}}></div>
      </div>
      <p>{props.stats.base_stat}</p>
    </div>
  );
};
